import { useState } from "react";
import DatePicker from "react-datepicker";

import GlobalSearch from "../../../components/others/GlobalSearch";
import RealTimeDataCount from "../../../components/home/RealTimeDataCount";

import { Switch } from "@/components/ui/switch";
import { Radio, RadioGroup } from "@/components/ui/radio";

import { role } from "../../../utils/testData";

import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedOption, setSelectedOption] = useState("sales");
  const [dateRange, setDateRange] = useState([
    new Date(new Date().setDate(new Date().getDate() - 7)),
    new Date(),
  ]);
  const [startDate, endDate] = dateRange;

  const handleChangeMerchantStatus = () => setIsAvailable(!isAvailable);

  return (
    <div className="bg-gray-100 h-full">
      <GlobalSearch />

      <div className="flex justify-between mx-5 mt-5">
        <div>
          <p className="text-[25px] text-teal-800 capitalize font-semibold">
            Hi! <span>{role}</span>
          </p>
        </div>

        <div className="flex items-center gap-[30px]">
          {role === "Merchant" && (
            <p className="flex flex-col items-center justify-center">
              <Switch
                isChecked={isAvailable}
                onChange={handleChangeMerchantStatus}
                colorPalette="teal"
              />
              <span className="text-gray-500 text-[16px]">
                Accepting orders
              </span>
            </p>
          )}
        </div>
      </div>

      <div className="bg-white mt-2 mx-5 py-4">
        <div className="flex items-center mx-[20px] justify-between ">
          <div className="flex items-center justify-between">
            <RadioGroup
              value={selectedOption}
              colorPalette="teal"
              variant="solid"
              size="sm"
              onValueChange={(e) => setSelectedOption(e.value)}
              className="flex gap-[15px]"
            >
              <Radio
                value="sales"
                className="text-black text-[16px] cursor-pointer"
              >
                Sales (in ₹)
              </Radio>
              {role === "Admin" && (
                <Radio
                  value="merchants"
                  className="text-black text-[16px] cursor-pointer"
                >
                  Merchants
                </Radio>
              )}
              <Radio
                value="order"
                className="text-black text-[16px] cursor-pointer"
              >
                Orders
              </Radio>
              <Radio
                value="commission"
                className="text-black text-[16px] cursor-pointer"
              >
                Commission (in ₹)
              </Radio>
              {role === "Admin" && (
                <Radio
                  value="subscription"
                  className="text-black text-[16px] cursor-pointer"
                >
                  Subscription (in ₹)
                </Radio>
              )}
            </RadioGroup>
          </div>

          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            dateFormat="yyyy/MM/dd"
            withPortal
            className="border-2 p-2 rounded-lg cursor-pointer outline-none focus:outline-none"
            placeholderText="Select Date range"
            maxDate={new Date()}
          />
        </div>

        {/* Line chart Here */}
      </div>

      <div>
        <RealTimeDataCount />
      </div>
    </div>
  );
};

export default Home;
