import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@chakra-ui/react";

import AuthContext from "@/context/AuthContext";

import GlobalSearch from "@/components/others/GlobalSearch";
import Loader from "@/components/others/Loader";
import Details from "@/components/order/detail/Details";
import OrderItems from "@/components/order/detail/OrderItem";
import OrderBill from "@/components/order/detail/OrderBill";
import OrderMapAndStepper from "@/components/order/detail/OrderMapAndStepper";

import RenderIcon from "@/icons/RenderIcon";

import { getOrderDetail } from "@/hooks/order/useOrder";

// TODO: Need to connect bill download API
const OrderDetail = () => {
  const { orderId } = useParams();
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    data: orderDetail,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order-detail", orderId],
    queryFn: () => getOrderDetail(orderId, role, navigate),
    enabled: !!orderId,
  });

  if (isLoading) return <Loader />;
  if (isError) return <div>Error in fetching data</div>;

  return (
    <div className="bg-gray-100 h-full">
      <GlobalSearch />

      <div className="flex justify-between mx-5 mt-[20px]">
        <p className="flex items-center gap-[10px] mb-0">
          <span onClick={() => navigate("/order")} className="cursor-pointer">
            <RenderIcon iconName="LeftArrowIcon" size={24} loading={6} />
          </span>

          <p className="font-[600] mb-0 text-[18px]">
            Order information #{orderDetail?._id}{" "}
            {orderDetail?.scheduledOrderId && (
              <>
                <span className="text-black me-2">of</span>
                <span className="text-gray-500">
                  [ #{orderDetail?.scheduledOrderId} ]
                </span>
              </>
            )}
          </p>
        </p>

        {orderId.charAt(0) === "O" && (
          <Button
            onClick={() => {}}
            className="bg-blue-100 px-4 p-2 rounded-md cursor-pointer"
          >
            <span>
              <RenderIcon iconName="DownloadIcon" size={24} loading={6} />
            </span>
            Bill
          </Button>
        )}
      </div>

      <div className="flex bg-white mx-5 rounded-lg mt-5 gap-16 p-5">
        <div className="w-1/3">
          <div className="flex justify-between mb-[10px]">
            <label className="text-[14px] text-gray-500 w-3/5">
              Order Status
            </label>
            <p className="text-[14px] text-gray-900 font-[500] text-left w-2/5">
              {orderDetail?.orderStatus}
            </p>
          </div>
          <div className="flex justify-between mb-[10px]">
            <label className="text-[14px] text-gray-500 w-3/5">
              Payment Status
            </label>
            <p className="text-[14px] text-gray-900 font-[500] text-left w-2/5">
              {orderDetail?.paymentStatus}
            </p>
          </div>
          <div className="flex justify-between mb-[10px]">
            <label className="text-[14px] text-gray-500 w-3/5">
              Payment Mode
            </label>
            <p className="text-[14px] text-gray-900 font-[500] text-left w-2/5">
              {orderDetail?.paymentMode}
            </p>
          </div>
          <div className="flex justify-between mb-[10px]">
            <label className="text-[14px] text-gray-500 w-3/5">
              Delivery Mode
            </label>
            <p className="text-[14px] text-gray-900 font-[500] text-left w-2/5">
              {orderDetail?.deliveryMode}
            </p>
          </div>
        </div>

        <div className="h-[7rem] w-[2px] bg-gray-300 rounded-full"></div>

        <div className="w-1/3">
          <div className="flex justify-between mb-[10px]">
            <label className="text-[14px] text-gray-500 w-3/5">
              Delivery option
            </label>
            <p className="text-[14px] text-gray-900 font-[500] text-left w-2/5">
              {orderDetail?.deliveryOption}
            </p>
          </div>
          {orderId?.charAt(0) === "O" ? (
            <>
              <div className="flex justify-between mb-[10px]">
                <label className="text-[14px] text-gray-500 w-3/5">
                  Vehicle Type
                </label>
                <p className="text-[14px] text-gray-900 font-[500] text-left w-2/5">
                  {orderDetail?.vehicleType}
                </p>
              </div>
              <div className="flex justify-between mb-[10px]">
                <label className="text-[14px] text-gray-500 w-3/5">
                  Order Time
                </label>
                <p className="text-[14px] text-gray-900 font-[500] text-left w-2/5">
                  {orderDetail?.orderTime}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between mb-[10px]">
                <label className="text-[14px] text-gray-500 w-3/5">
                  Order From
                </label>
                <p className="text-[14px] text-gray-900 font-[500] text-left w-2/5">
                  {orderDetail?.orderTime?.split("||")[0]}
                </p>
              </div>
              <div className="flex justify-between mb-[10px]">
                <label className="text-[14px] text-gray-500 w-3/5">
                  Order To
                </label>
                <p className="text-[14px] text-gray-900 font-[500] text-left w-2/5">
                  {orderDetail?.orderTime?.split("||")[1]}
                </p>
              </div>
            </>
          )}
          <div className="flex justify-between mb-[10px]">
            <label className="text-[14px] text-gray-500 w-3/5">
              {orderId?.charAt(0) === "O"
                ? "Delivery Time"
                : "Next Delivery Time"}
            </label>
            <p className="text-[14px] text-gray-900 font-[500] text-left w-2/5">
              {orderDetail?.deliveryTime}
            </p>
          </div>
        </div>
      </div>

      <Details data={orderDetail} />

      <OrderItems data={orderDetail} />

      <OrderBill data={orderDetail} />

      <OrderMapAndStepper orderDetail={orderDetail} />
    </div>
  );
};

export default OrderDetail;
