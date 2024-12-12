import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useMutation, useQuery } from "@tanstack/react-query";

import AuthContext from "@/context/AuthContext";

import RenderIcon from "@/icons/RenderIcon";

import GlobalSearch from "@/components/others/GlobalSearch";

import { Button } from "@/components/ui/button";
import { toaster } from "@/components/ui/toaster";

import {
  deliveryModeOption,
  orderStatusOption,
  paymentModeOption,
} from "@/utils/defaultData";

import { fetchMerchantsForDropDown } from "@/hooks/merchant/useMerchant";

import "react-datepicker/dist/react-datepicker.css";

import AllOrdersTable from "@/components/order/detail/AllOrdersTable";

// TODO: Need to connect Order CSV download
const AllOrders = () => {
  const [filter, setFilter] = useState({
    selectedOption: "order",
    status: null,
    paymentMode: null,
    deliveryMode: null,
    selectedMerchant: null,
    date: [null, null],
    orderId: "",
  });
  const [debounceId, setDebounceId] = useState("");

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

  const merchantOptions = [
    { label: "All", value: "all" },
    ...(Array.isArray(allMerchants)
      ? allMerchants.map((merchant) => ({
          label: merchant.merchantName,
          value: merchant._id,
        }))
      : []),
  ];

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilter((prevFilter) => ({
        ...prevFilter,
        orderId: debounceId,
      }));
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [debounceId]);

  return (
    <div className="bg-gray-100 h-full">
      <GlobalSearch />

      <div className="mx-[20px] mt-[20px] flex justify-between items-center">
        <div className="w-fit border border-gray-700 rounded-full">
          <div className="flex items-center gap-[1px] p-1 ">
            <p
              onClick={() => setFilter({ ...filter, selectedOption: "order" })}
              className={`${
                filter.selectedOption === "order"
                  ? `bg-teal-700 text-white`
                  : `text-black`
              }  py-2 rounded-full px-3 text-[16px] cursor-pointer`}
            >
              Order
            </p>
            <p
              onClick={() =>
                setFilter({ ...filter, selectedOption: "scheduledOrder" })
              }
              className={`${
                filter.selectedOption === "scheduledOrder"
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
            value={orderStatusOption.find(
              (option) => option.value === filter.status
            )}
            onChange={(option) =>
              setFilter({ ...filter, status: option.value })
            }
            className=" bg-cyan-50 min-w-[10rem]"
            placeholder="Order status"
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
              (option) => option.value === filter.paymentMode
            )}
            onChange={(option) =>
              setFilter({ ...filter, paymentMode: option.value })
            }
            className=" bg-cyan-50 min-w-[10rem]"
            placeholder="Payment mode"
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
              (option) => option.value === filter.deliveryMode
            )}
            onChange={(option) =>
              setFilter({ ...filter, deliveryMode: option.value })
            }
            className=" bg-cyan-50 min-w-[10rem]"
            placeholder="Delivery mode"
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
                (option) => option.value === filter.selectedMerchant
              )}
              onChange={(option) =>
                setFilter({ ...filter, selectedMerchant: option.value })
              }
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
            startDate={filter.date[0]}
            endDate={filter.date[1]}
            onChange={(date) => setFilter({ ...filter, date })}
            dateFormat="yyyy/MM/dd"
            withPortal
            className="cursor-pointer "
            customInput={
              <span className="text-gray-400 text-xl">
                <RenderIcon iconName="CalendarIcon" size={24} loading={2} />
              </span>
            }
            maxDate={new Date()}
          />

          <div>
            <input
              value={debounceId}
              type="search"
              className="bg-gray-100 p-3 rounded-3xl focus:outline-none outline-none text-[14px] ps-[20px]"
              placeholder="Search order ID"
              onChange={(e) => setDebounceId(e.target.value)}
            />
          </div>
        </div>
      </div>

      <AllOrdersTable filter={filter} />
    </div>
  );
};

export default AllOrders;
