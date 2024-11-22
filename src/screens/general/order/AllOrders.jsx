import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useMutation, useQuery } from "@tanstack/react-query";

import AuthContext from "../../../context/AuthContext";

import RenderIcon from "../../../icons/RenderIcon";

import { Spinner, Table } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { toaster } from "@/components/ui/toaster";

import GlobalSearch from "../../../components/others/GlobalSearch";
import ShowSpinner from "../../../components/others/ShowSpinner";

import RejectOrder from "../../../models/general/order/RejectOrder";

import {
  deliveryModeOption,
  orderStatusOption,
  paymentModeOption,
} from "../../../utils/defaultData";

import {
  acceptOrder,
  fetchAllOrders,
  searchOrder,
} from "../../../hooks/order/useOrder";
import { fetchMerchantsForDropDown } from "../../../hooks/merchant/useMerchant";

import "react-datepicker/dist/react-datepicker.css";

// TODO: Need to connect Order CSV download
const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [selectedOption, setSelectedOption] = useState("order");
  const [status, setStatus] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [deliveryMode, setDeliveryMode] = useState("");
  const [selectedMerchant, setSelectedMerchant] = useState("");
  const [dateRange, setDateRange] = useState(["", ""]);
  const [startDate, endDate] = dateRange;
  const [search, setSearch] = useState("");

  const [loadingOrderId, setLoadingOrderId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false); // Dialog state

  const navigate = useNavigate();
  const { role } = useContext(AuthContext);

  const filteredOptions =
    role === "Merchant"
      ? deliveryModeOption.filter(
          (option) =>
            option.value !== "Pick and Drop" && option.value !== "Custom Order"
        )
      : deliveryModeOption;

  const { data: allMerchants } = useQuery({
    queryKey: ["merchant-dropdown"],
    queryFn: () => fetchMerchantsForDropDown(navigate),
  });

  const {
    data: filteredOrders,
    isLoading: isFetchingOrders,
    isError,
  } = useQuery({
    queryKey: [
      "orders",
      selectedOption,
      status,
      paymentMode,
      deliveryMode,
      selectedMerchant,
      startDate,
      endDate,
    ],
    queryFn: () =>
      fetchAllOrders(
        selectedOption,
        status,
        paymentMode,
        deliveryMode,
        selectedMerchant,
        startDate,
        endDate,
        navigate
      ),
  });

  const { data: searchedOrders, isLoading: isSearchingOrders } = useQuery({
    queryKey: ["search-order", search, selectedOption],
    queryFn: () =>
      search ? searchOrder(search, selectedOption, navigate) : [],
    enabled: !!search,
  });

  const acceptOrderMutation = useMutation({
    mutationKey: ["acceptOrder"],
    mutationFn: (orderId) => acceptOrder(orderId, role, navigate),
    onMutate: (orderId) => {
      setLoadingOrderId(orderId);
    },
    onSuccess: (_, orderId) => {
      setLoadingOrderId(null);
      setAllOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, orderStatus: "On-going" } : order
        )
      );
      toaster.create({
        title: "Success",
        description: "Order accepted",
        type: "success",
      });
    },
    onError: () => {
      setLoadingOrderId(null);
      toaster.create({
        title: "Error",
        description: "Failed to accept order",
        type: "error",
      });
    },
  });

  // Combine the loading states
  const isTableLoading = isFetchingOrders || isSearchingOrders;

  useEffect(() => {
    if (searchedOrders || filteredOrders) {
      setAllOrders(searchedOrders || filteredOrders);
    }
  }, [searchedOrders, filteredOrders]);

  const merchantOptions = [
    { label: "All", value: "all" },
    ...(Array.isArray(allMerchants)
      ? allMerchants.map((merchant) => ({
          label: merchant.merchantName,
          value: merchant._id,
        }))
      : []),
  ];

  const openRejectDialog = (orderId) => {
    setSelectedOrderId(orderId);
    setIsRejectDialogOpen(true);
  };

  const closeRejectDialog = () => {
    setSelectedOrderId(null);
    setIsRejectDialogOpen(false);
  };

  if (isError) return <div>Error loading orders</div>;

  return (
    <div className="bg-gray-100 h-full">
      <GlobalSearch />

      <div className="mx-[20px] mt-[20px] flex justify-between items-center">
        <div className="w-fit border-2 border-black rounded-full">
          <div className="flex items-center gap-[1px] p-1 ">
            <p
              onClick={() => setSelectedOption("order")}
              className={`${
                selectedOption === "order"
                  ? `bg-teal-700 text-white`
                  : `text-black`
              }  py-2 rounded-full px-3 text-[16px] cursor-pointer`}
            >
              Order
            </p>
            <p
              onClick={() => setSelectedOption("scheduledOrder")}
              className={`${
                selectedOption === "scheduledOrder"
                  ? `bg-teal-700 text-white`
                  : `text-black`
              }  py-2 rounded-full px-3 text-[16px] cursor-pointer`}
            >
              Scheduled Order
            </p>
          </div>
        </div>

        <div className="flex gap-x-4">
          <Button variant="solid" className="bg-teal-200 text-black px-3">
            <RenderIcon iconName="DownloadIcon" />
            <span className="text-[16px]">CSV</span>
          </Button>
          <Link
            to={`/order/create`}
            className="bg-teal-700 text-white px-3 flex items-center gap-2 rounded-md"
          >
            <RenderIcon iconName="PlusIcon" />
            <span className="text-[16px]">Create Order</span>
          </Link>
        </div>
      </div>

      <div className="flex items-center bg-white p-3 py-[20px] mx-5 rounded-lg justify-between mt-[20px] px-[30px]">
        <div className="flex items-center gap-[20px]">
          <Select
            options={orderStatusOption}
            value={orderStatusOption.find((option) => option.value === status)}
            onChange={(option) => setStatus(option.value)}
            className=" bg-cyan-50 min-w-[10rem]"
            placeholder="Order status"
            isSearchable={false}
            isMulti={false}
            styles={{
              control: (provided) => ({
                ...provided,
                paddingRight: "",
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                padding: "10px",
              }),
            }}
          />

          <Select
            options={paymentModeOption}
            value={paymentModeOption.find(
              (option) => option.value === paymentMode
            )}
            onChange={(option) => setPaymentMode(option.value)}
            className=" bg-cyan-50 min-w-[10rem]"
            placeholder="Payment mode"
            isSearchable={false}
            isMulti={false}
            styles={{
              control: (provided) => ({
                ...provided,
                paddingRight: "",
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                padding: "10px",
              }),
            }}
          />

          <Select
            options={filteredOptions}
            value={filteredOptions.find(
              (option) => option.value === deliveryMode
            )}
            onChange={(option) => setDeliveryMode(option.value)}
            className=" bg-cyan-50 min-w-[10rem]"
            placeholder="Delivery mode"
            isSearchable={false}
            isMulti={false}
            styles={{
              control: (provided) => ({
                ...provided,
                paddingRight: "",
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                padding: "10px",
              }),
            }}
          />

          {role === "Admin" && (
            <Select
              options={merchantOptions}
              value={merchantOptions.find(
                (option) => option.value === selectedMerchant
              )}
              onChange={(option) => setSelectedMerchant(option.value)}
              className=" bg-cyan-50 w-[10rem]"
              placeholder="Merchant"
              isSearchable={true}
              isMulti={false}
              styles={{
                control: (provided) => ({
                  ...provided,
                  paddingRight: "",
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  padding: "10px",
                }),
              }}
            />
          )}
        </div>

        <div className="flex items-center gap-[20px]">
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            dateFormat="yyyy/MM/dd"
            withPortal
            className="cursor-pointer "
            customInput={
              <span className="text-gray-400 text-xl">
                <RenderIcon iconName="CalendarIcon" size={24} loading={2} />
              </span>
            }
            placeholderText="Select Date range"
            maxDate={new Date()}
          />

          <div>
            <input
              value={search}
              type="search"
              className="bg-gray-100 p-3 rounded-3xl focus:outline-none outline-none text-[14px] ps-[20px]"
              placeholder="Search order ID"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* <Table className="mt-[30px]" height="20rem"> */}
      <Table.Root className="mt-5 z-10">
        <Table.Header>
          <Table.Row className="bg-teal-700 h-14">
            {[
              "Order ID",
              "Order Status",
              "Merchant Name",
              "Customer Name",
              "Delivery Mode",
              "Order Time",
              "Delivery Time",
              "Payment Method",
              "Delivery Option",
              "Amount",
            ].map((header, idx) => (
              <Table.ColumnHeader key={idx} color="white" textAlign="center">
                {header}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isTableLoading ? (
            <Table.Row className="h-[70px]">
              <Table.Cell colSpan={10} textAlign="center">
                <Spinner color="teal.500" size="sm" /> Loading
              </Table.Cell>
            </Table.Row>
          ) : allOrders?.length === 0 ? (
            <Table.Row className="h-[70px]">
              <Table.Cell colSpan={10} textAlign="center">
                No Orders Available
              </Table.Cell>
            </Table.Row>
          ) : (
            allOrders?.map((order) => (
              <Table.Row
                key={order._id}
                className={`h-[70px] ${
                  order.orderStatus.trim().toLowerCase() === "pending" &&
                  selectedOption === "order"
                    ? "bg-red-500 text-white"
                    : "even:bg-gray-100"
                }`}
              >
                <Table.Cell textAlign="center">
                  <Link
                    to={`/order/${order._id}`}
                    className="underline underline-offset-2 cursor-pointer"
                  >
                    {order._id}
                  </Link>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {loadingOrderId === order._id ? (
                    <ShowSpinner />
                  ) : order.orderStatus === "Pending" &&
                    selectedOption === "order" ? (
                    <span className="flex items-center justify-center gap-3">
                      <span
                        onClick={() => acceptOrderMutation.mutate(order._id)}
                        className="cursor-pointer"
                      >
                        <RenderIcon
                          iconName="CheckIcon"
                          size={28}
                          loading={6}
                        />
                      </span>
                      <span
                        onClick={() => openRejectDialog(order._id)}
                        className="cursor-pointer"
                      >
                        <RenderIcon
                          iconName="CancelIcon"
                          size={28}
                          loading={6}
                        />
                      </span>
                    </span>
                  ) : (
                    <p
                      className={`text-[16px] font-[600] ${
                        order.orderStatus === "Completed"
                          ? "text-green-600"
                          : order.orderStatus === "Cancelled"
                            ? "text-red-600"
                            : order.orderStatus === "On-going"
                              ? "text-orange-600"
                              : ""
                      }`}
                    >
                      {order.orderStatus}
                    </p>
                  )}
                </Table.Cell>

                <Table.Cell textAlign="center">{order.merchantName}</Table.Cell>
                <Table.Cell textAlign="center">{order.customerName}</Table.Cell>
                <Table.Cell textAlign="center">{order.deliveryMode}</Table.Cell>
                <Table.Cell textAlign="center">
                  <p>{order.orderDate}</p>
                  <p>{order.orderTime}</p>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <p>{order.deliveryDate}</p>
                  <p>{order.deliveryTime}</p>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {order.paymentMethod}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {order.deliveryOption}
                </Table.Cell>
                <Table.Cell textAlign="center">{order.amount}</Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
      {/* </Table> */}

      <RejectOrder
        isOpen={isRejectDialogOpen}
        onClose={closeRejectDialog}
        orderId={selectedOrderId}
      />
    </div>
  );
};

export default AllOrders;
