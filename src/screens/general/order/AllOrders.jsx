import { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";

import { Table } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";

import GlobalSearch from "../../../components/others/GlobalSearch";

import { CalendarIcon, DownloadIcon, PlusIcon } from "../../../utils/icons";
import {
  deliveryModeOption,
  orderStatusOption,
  paymentModeOption,
} from "../../../utils/defaultData";

import "react-datepicker/dist/react-datepicker.css";

import { role } from "../../../utils/testData";
import { Link } from "react-router-dom";

const AllOrders = () => {
  const [selectedOption, setselectedOption] = useState("order");

  const [orderStatus, setOrderStatus] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [deliveryMode, setDeliveryMode] = useState("");
  const [selectedMerchant, setSelectedMerchant] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const filteredOptions =
    role === "Merchant"
      ? deliveryModeOption.filter(
          (option) =>
            option.value !== "Pick and Drop" && option.value !== "Custom Order"
        )
      : deliveryModeOption;

  return (
    <div className="bg-gray-100 h-full">
      <GlobalSearch />

      <div className="mx-[20px] mt-[20px] flex justify-between items-center">
        <div className="w-fit border-2 border-black rounded-full">
          <div className="flex items-center gap-[1px] p-1 ">
            <p
              onClick={() => setselectedOption("order")}
              className={`${
                selectedOption === "order"
                  ? `bg-teal-700 text-white`
                  : `text-black`
              }  py-2 rounded-full px-3 text-[16px] cursor-pointer`}
            >
              Order
            </p>
            <p
              onClick={() => setselectedOption("scheduledOrder")}
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
            <DownloadIcon />
            <span className="text-[16px]">CSV</span>
          </Button>
          <Link
            to="/order/create"
            className="bg-teal-700 text-white px-3 flex items-center gap-2 rounded-md"
          >
            <PlusIcon /> <span className="text-[16px]">Create Order</span>
          </Link>
        </div>
      </div>

      <div className="flex items-center bg-white p-3 mx-5 rounded-lg justify-between mt-[20px] px-[30px]">
        <div className="flex items-center gap-[20px]">
          <Select
            options={orderStatusOption}
            value={orderStatusOption.find(
              (option) => option.value === orderStatus
            )}
            onChange={(option) => setOrderStatus(option.value)}
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
              options={""}
              // value={merchantOptions.find(
              //   (option) => option.value === selectedMerchant
              // )}
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
              <span>
                <CalendarIcon className="text-gray-400 text-xl" />
              </span>
            }
            placeholderText="Select Date range"
            maxDate={new Date()}
          />

          <div>
            <input
              type="search"
              className="bg-gray-100 p-3 rounded-3xl focus:outline-none outline-none text-[14px] ps-[20px]"
              placeholder="Search order ID"
              onChange={() => {}}
            />
          </div>
        </div>
      </div>

      <Table.ScrollArea className="mt-[30px]" height="20rem">
        <Table.Root size="lg" stickyHeader interactive striped>
          <Table.Header>
            <Table.Row className="bg-teal-700 h-[70px]">
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
              ].map((header) => (
                <Table.ColumnHeader color="white" textAlign="center">
                  {header}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row key={""} className="h-[70px]">
              <Table.Cell textAlign="center">
                <Link
                  to={`/order/45`}
                  className="underline underline-offset-2 cursor-pointer"
                >
                  O24013
                </Link>
              </Table.Cell>
              <Table.Cell textAlign="center">Pending</Table.Cell>
              <Table.Cell textAlign="center">Merchant Name</Table.Cell>
              <Table.Cell textAlign="center">Customer Name</Table.Cell>
              <Table.Cell textAlign="center">Delivery Mode</Table.Cell>
              <Table.Cell textAlign="center">Order Time</Table.Cell>
              <Table.Cell textAlign="center">Delivery Time</Table.Cell>
              <Table.Cell textAlign="center">Payment Method</Table.Cell>
              <Table.Cell textAlign="center">Delivery Option</Table.Cell>
              <Table.Cell textAlign="center">Amount</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </div>
  );
};

export default AllOrders;
