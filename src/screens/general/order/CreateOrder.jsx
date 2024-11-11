import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

import { Spinner } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@/components/ui/radio";

import GlobalSearch from "../../../components/others/GlobalSearch";
import NewCustomerForm from "../../../components/order/createOrder/NewCustomerForm";
import TakeAway from "../../../components/order/createOrder/TakeAway";
import HomeDelivery from "../../../components/order/createOrder/HomeDelivery";
import PickAndDrop from "../../../components/order/createOrder/PickAndDrop";
import CustomOrder from "../../../components/order/createOrder/CustomOrder";

import { LeftArrowIcon, PlusIcon, SearchIcon } from "../../../utils/icons";

import "react-datepicker/dist/react-datepicker.css";

import { role } from "../../../utils/testData";
import { useEffect, useState } from "react";

const CreateOrder = () => {
  const [topData, setTopData] = useState({
    customerId: null,
    customerAddress: [],
    deliveryOption: "On-demand",
    deliveryMode: "Take Away",
    ifScheduled: {},
  });
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const [time, setTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const navigate = useNavigate();

  const customerResults = [];

  const deliveryModes = [
    "Take Away",
    "Home Delivery",
    role !== "Merchant" && "Pick and Drop",
    role !== "Merchant" && "Custom Order",
  ].filter(Boolean);

  const isToday =
    startDate && startDate.toDateString() === new Date().toDateString();

  // Calculate the minimum selectable time as 1.5 hours from now
  const minimumSelectableTime = new Date();
  minimumSelectableTime.setMinutes(minimumSelectableTime.getMinutes() + 90);

  const handleDateChange = (update) => {
    setDateRange(update);
    const [newStartDate] = update;

    if (
      newStartDate &&
      newStartDate.toDateString() === new Date().toDateString()
    ) {
      setTime(minimumSelectableTime);
    }
  };

  useEffect(() => {
    // Format the start and end dates
    const formattedStartDate = startDate
      ? startDate.toLocaleDateString("en-CA")
      : null;
    const formattedEndDate = endDate
      ? endDate.toLocaleDateString("en-CA")
      : null;
    // Format the time
    const formattedTime = time
      ? time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : null;

    setTopData((prevState) => ({
      ...prevState,
      ifScheduled: {
        ...prevState.ifScheduled,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        time: formattedTime,
      },
    }));
  }, [startDate, endDate, time]);

  const toggleNewCustomerForm = () => {
    setIsFormVisible(!isFormVisible);
    // setCustomerName("");
    setTopData({ ...topData, customerId: null, customerAddress: [] });
  };

  const handleAddCustomer = (newCustomer) => {
    setIsFormVisible(true);
    setTopData({ ...topData, newCustomer });
  };

  return (
    <div className="bg-gray-100 h-full">
      <GlobalSearch />

      <div className="flex items-center justify-start mt-[10px] ms-[20px]">
        <LeftArrowIcon
          className="cursor-pointer"
          onClick={() => navigate("/orders")}
        />
        <span className="text-lg font-semibold ml-3">Create Order</span>
      </div>

      <div className="bg-white mx-[20px] mt-5 mb-[35px] p-5 rounded-md">
        <div className="flex flex-col gap-6">
          <div className="flex items-center relative">
            <label className="w-1/3 px-6" htmlFor="customer">
              Select Customer
            </label>
            <div className="relative w-1/2">
              <input
                type="text"
                id="customer"
                name="customer"
                placeholder="Search Customer"
                className="h-10 ps-3 text-sm border-2 w-full outline-none focus:outline-none"
                value={""}
                onChange={() => {}}
              />
              {isLoading ? (
                <Spinner
                  size="sm"
                  className="absolute top-[30%] right-[10px]"
                />
              ) : (
                <SearchIcon className="text-xl text-gray-500 absolute top-[30%] right-[10px]" />
              )}
              {customerResults?.length > 0 && (
                <ul className="absolute bg-white border w-full mt-1">
                  {customerResults?.map((result) => (
                    <li
                      key={result._id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => selectCustomer(result)}
                    >
                      {result?.fullName} - {result?.phoneNumber}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div>
            <div className="flex">
              <label className="w-1/3"></label>
              <button
                type="button"
                className="w-1/2 bg-gray-200 font-semibold py-2 rounded flex justify-between items-center px-4 border border-gray-300"
                onClick={toggleNewCustomerForm}
              >
                <span>Add Customer</span>
                <PlusIcon />
              </button>
            </div>
            {isFormVisible && (
              <NewCustomerForm
                toggleNewCustomerForm={toggleNewCustomerForm}
                onAddCustomer={handleAddCustomer}
              />
            )}
          </div>

          <div className="flex items-center mt-1">
            <label className="w-1/3 px-6 text-gray-700">
              Select Delivery Option
            </label>

            <RadioGroup
              value={topData?.deliveryOption}
              colorPalette="teal"
              variant="solid"
              size="sm"
              onValueChange={(e) =>
                setTopData({ ...topData, deliveryOption: e.value })
              }
              className="flex gap-[15px]"
            >
              <Radio
                value="On-demand"
                className="text-black text-[16px] cursor-pointer"
              >
                On-demand
              </Radio>
              <Radio
                value="Scheduled"
                className="text-black text-[16px] cursor-pointer"
              >
                Scheduled
              </Radio>
            </RadioGroup>
          </div>

          {topData?.deliveryOption === "Scheduled" && (
            <div className="flex items-center">
              <label className="w-1/3 px-6 text-gray-700 invisible">
                Select Delivery Date and time
              </label>

              <div className="flex gap-5 justify-start z-50">
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleDateChange}
                  dateFormat="yyyy/MM/dd"
                  withPortal
                  className="border-2 p-2 rounded-lg cursor-pointer mt-2 outline-none focus:outline-none"
                  placeholderText="Select Date range"
                  minDate={new Date()}
                />

                <DatePicker
                  selected={time}
                  onChange={(time) => setTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="h:mm aa"
                  showTimeCaption={false}
                  className="border-2 p-2 rounded-lg cursor-pointer mt-2 outline-none focus:outline-none"
                  placeholderText="Select Time"
                  minTime={
                    isToday
                      ? minimumSelectableTime
                      : new Date(new Date().setHours(0, 0, 0, 0))
                  }
                  maxTime={new Date(new Date().setHours(23, 59, 59, 999))}
                />
              </div>
            </div>
          )}

          <div className="flex items-center mt-2">
            <label className="w-1/3 px-6 text-gray-700">
              Select Delivery Mode
            </label>
            <div className="flex items-center space-x-2 w-2/3 gap-3">
              <RadioGroup
                value={topData?.deliveryMode}
                size="sm"
                onChange={(e) => {
                  console.log(e.target.value);
                  setTopData({ ...topData, deliveryMode: e.target.value });
                }}
                className="flex flex-row gap-[15px]"
              >
                {deliveryModes.map((mode, index) => (
                  <Radio
                    key={index}
                    value={mode}
                    colorPalette="teal"
                    className=" text-[16px] cursor-pointer"
                  >
                    {mode}
                  </Radio>
                ))}
              </RadioGroup>
            </div>
          </div>

          {topData?.deliveryMode === "Take Away" && <TakeAway data={topData} />}

          {topData?.deliveryMode === "Home Delivery" && (
            <HomeDelivery data={topData} />
          )}

          {role === "Admin" && (
            <>
              {topData?.deliveryMode === "Pick and Drop" && (
                <PickAndDrop data={topData} />
              )}

              {topData?.deliveryMode === "Custom Order" && (
                <CustomOrder data={topData} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
