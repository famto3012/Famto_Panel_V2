import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import AuthContext from "@/context/AuthContext";

import { toaster } from "@/components/ui/toaster";

import RenderIcon from "@/icons/RenderIcon";

import { createOrder } from "@/hooks/order/useOrder";

const ShowTakeAwayBill = ({ data }) => {
  const [formData, setFormData] = useState({
    paymentMode: "",
    cartId: "",
    deliveryMode: "",
  });

  const { role } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    setFormData({
      ...formData,
      paymentMode: "Online-payment",
      cartId: data.cartId,
      deliveryMode: data.deliveryMode,
    });
  }, [data]);

  const handleCreateOrder = useMutation({
    mutationKey: ["create-takeaway-order"],
    mutationFn: () => createOrder(role, formData, navigate),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-orders"]);
      navigate("/order");
      toaster.create({
        title: "Success",
        description: "Order created successfully",
        type: "success",
      });
    },
    onError: (data) => {
      toaster.create({
        title: "Error",
        description: data?.message || "Error while creating order",
        type: "error",
      });
    },
  });

  return (
    <>
      <div className="flex my-5">
        <h1 className="px-6 w-1/3 font-semibold">Payment mode</h1>

        <div className=" w-1/2">
          <p className="border-2 p-3 rounded-md text-[16px] font-[500]">
            Online Payment
          </p>
        </div>
      </div>

      <div className="flex mt-5">
        <h1 className="px-6 w-1/3 font-semibold">Bill Summary</h1>
        <div className="overflow-auto w-1/2">
          <table className="border-2 border-teal-700 w-full text-left ">
            <thead>
              <tr>
                {["Item", " Quantity", "Amount"].map((header, index) => (
                  <th
                    key={index}
                    className="bg-teal-700 text-white p-4 border-[#eee]/50"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.items?.map((data) => (
                <tr key={data.index} className="text-left align-middle">
                  <td className="p-4">{data.itemName}</td>
                  <td className="p-4">{data.quantity}</td>
                  <td className="p-4">{data.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-16 mx-10">
        <button
          className="bg-cyan-50 py-2 px-4 rounded-md flex items-center gap-2"
          onClick={() => {}}
        >
          <RenderIcon iconName="DownloadIcon" size={16} loading={6} />
          <span>Bill</span>
        </button>

        <button
          className="bg-teal-700 text-white py-2 px-4 rounded-md"
          onClick={() => handleCreateOrder.mutate()}
        >
          {handleCreateOrder.isPending ? `Creating...` : `Create Order`}
        </button>
      </div>
    </>
  );
};

export default ShowTakeAwayBill;
