import { useState } from "react";

import { Spinner } from "@chakra-ui/react";

import { useDraggable } from "../../../hooks/useDraggable";

import { role } from "../../../utils/testData";

import NewAddress from "./NewAddress";
import ShowBill from "./ShowBill";

import RenderIcon from "../../../icons/RenderIcon";

const HomeDelivery = () => {
  const [homeDeliveryData, setHomeDeliveryData] = useState({
    // ...data,
    merchantId: null,
    items: [],
    instructionToMerchant: "",
  });

  const merchantResults = [];
  const businessCategories = [];
  const productResults = [];
  const allCustomerAddress = [];
  const cartData = {};

  const [isMerchantLoading, setIsMerchantLoading] = useState(false);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [isInvoiceLoading, setIsInvoiceLoading] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(null);

  const {
    isDragging,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  } = useDraggable();

  return (
    <div className="bg-white  mt-5 rounded">
      <form onSubmit={() => {}}>
        <div className="flex flex-col gap-6">
          {role === "Admin" && (
            <div className="flex items-center relative">
              <label className="w-1/3 px-6" htmlFor="merchantId">
                Select Merchant
              </label>
              <div className="relative w-1/2">
                <input
                  type="text"
                  name="merchantName"
                  placeholder="Search merchant..."
                  className="h-10 ps-3 text-sm border-2 w-full outline-none focus:outline-none"
                  value=""
                  onChange={() => {}}
                />

                {isMerchantLoading && (
                  <Spinner
                    size="sm"
                    className="absolute top-[30%] right-[10px]"
                  />
                )}

                {!isMerchantLoading && (
                  <span className="text-gray-500 absolute top-[30%] right-[10px]">
                    <RenderIcon iconName="SearchIcon" size={20} loading={6} />
                  </span>
                )}

                {merchantResults.length > 0 && (
                  <ul className="absolute bg-white border w-full mt-1 z-50">
                    {merchantResults.map((result) => (
                      <li
                        key={result._id}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => selectMerchant(result)}
                      >
                        {result.merchantName} - {result.geofence} (
                        {result.status ? "Open" : "Closed"})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center relative">
            <label className="w-1/3 px-6 invisible"></label>
            <div className="w-1/2 flex items-center gap-5 overflow-x-auto">
              {businessCategories?.map((category) => (
                <button
                  key={category._id}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory(category._id);
                  }}
                  className={`${
                    selectedCategory === category._id
                      ? `bg-gray-200`
                      : `bg-gray-100`
                  }  border  p-2 rounded-sm`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center relative">
            <label className="w-1/3 px-6" htmlFor="product">
              Select Product
            </label>
            <div className="relative w-1/2 z-30">
              <input
                type="text"
                name="product"
                placeholder="Search product..."
                className="h-10 ps-3 text-sm border-2 w-full outline-none focus:outline-none"
                value=""
                onChange={() => {}}
              />

              {isProductLoading && (
                <Spinner
                  size="sm"
                  className="absolute top-[20%] right-[10px]"
                />
              )}

              {!isProductLoading && (
                <span className="text-gray-500 absolute top-[30%] right-[10px]">
                  <RenderIcon iconName="SearchIcon" size={20} loading={6} />
                </span>
              )}

              {productResults.length > 0 && (
                <ul className="absolute bg-white border w-full mt-1 z-50 max-h-[25rem] overflow-auto">
                  {productResults.map((result, index) => (
                    <li
                      key={index}
                      className="p-2 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {}}
                    >
                      {result.productName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {homeDeliveryData.items.length > 0 && (
            <div className="flex items-center">
              <label className="w-1/3 px-6">Selected Products</label>
              <div
                className={`relative w-[50%] flex gap-4 overflow-x-scroll ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
              >
                {homeDeliveryData.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-3 py-2 bg-gray-100 p-3 border-2 border-gray-300 rounded-md"
                  >
                    <div>
                      <p className="text-gray-600 mb-2 w-[100px] truncate">
                        {item.productName}
                      </p>
                      <p className="text-gray-600">
                        {item?.variants?.length === 0 ? `₹${item.price}` : ""}
                      </p>

                      {item?.variants?.length > 0 && (
                        <div>
                          <select
                            className="outline-none focus:outline-none bg-white p-2"
                            value={item.selectedVariantId || ""}
                            onChange={(e) =>
                              handleVariantChange(
                                item.productId,
                                e.target.value
                              )
                            }
                          >
                            <option defaultValue={"Select variant"} hidden>
                              Select variant
                            </option>
                            {item.variants.flatMap((variant) =>
                              variant.variantTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                  {variant.variantName} - {type.typeName} - ₹
                                  {type.price}
                                </option>
                              ))
                            )}
                          </select>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center border-2 border-gray-300 px-2">
                      <button
                        className="text-red-400 text-xl"
                        onClick={(e) => decreaseQuantity(item.productId, e)}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="text-green-400 text-xl"
                        onClick={(e) => increaseQuantity(item.productId, e)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {role === "Admin" && (
            <div className="flex items-center">
              <label className="w-1/3 px-6" htmlFor="instructionToMerchant">
                Instruction to Merchant
              </label>
              <textarea
                name="instructionToMerchant"
                id="instructionToMerchant"
                placeholder="Instruction to Merchant"
                className="h-20 text-sm ps-3 pt-2 border-2 w-1/2 outline-none focus:outline-none resize-y overflow-y-auto"
                value={homeDeliveryData.instructionToMerchant}
                onChange={(e) =>
                  setHomeDeliveryData({
                    ...homeDeliveryData,
                    instructionToMerchant: e.target.value,
                  })
                }
              />
            </div>
          )}

          {allCustomerAddress?.length > 0 && (
            <div className="flex items-start ">
              <label className="w-1/3 px-6" htmlFor="address">
                Select Delivery Address
              </label>

              {/* {allCustomerAddress?.length > 0 && ( */}
              <div className="">
                {allCustomerAddress?.map((address, index) => (
                  <input
                    key={index}
                    type="button"
                    className={`py-2 px-4 me-2 rounded border capitalize ${
                      selectedAddress === address.type
                        ? "bg-gray-300"
                        : "bg-white"
                    }`}
                    value={address.type}
                    onClick={() => handleSelectAddressType(address.type)}
                  />
                ))}

                {selectedAddress === "other" && (
                  <div
                    className={`flex items-center gap-[20px] mt-[14px] py-2 max-w-[550px] overflow-x-auto ${
                      isDragging ? "cursor-grabbing" : "cursor-grab"
                    }`}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                  >
                    {data?.customerAddress
                      .find((addr) => addr.type === "other")
                      ?.otherAddress?.map((otherAddr) => (
                        <div
                          key={otherAddr.id}
                          className="flex items-center gap-2 bg-gray-100 p-3 border-2 border-gray-300 rounded-md"
                        >
                          <input
                            type="radio"
                            name="otherAddress"
                            value={otherAddr.id}
                            checked={selectedOtherAddressId === otherAddr.id}
                            onChange={() =>
                              handleSelectOtherAddress(otherAddr.id)
                            }
                          />
                          <span className="flex flex-col w-[150px] gap-1 ms-2">
                            <span>{otherAddr.flat}</span>
                            <span>{otherAddr.area}</span>
                            <span>{otherAddr.landmark}</span>
                          </span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
              {/* )} */}
            </div>
          )}

          {selectedAddress === "home" && (
            <div className="px-6 py-2 border-2 rounded-md ms-[33%] bg-gray-100 w-fit">
              {data?.customerAddress.find((addr) => addr.type === "home")
                ?.homeAddress && (
                <div className="flex flex-col gap-1">
                  <span>
                    {
                      data.customerAddress.find((addr) => addr.type === "home")
                        .homeAddress.flat
                    }
                  </span>
                  <span>
                    {
                      data.customerAddress.find((addr) => addr.type === "home")
                        .homeAddress.area
                    }
                  </span>
                  <span>
                    {
                      data.customerAddress.find((addr) => addr.type === "home")
                        .homeAddress.landmark
                    }
                  </span>
                </div>
              )}
            </div>
          )}

          {selectedAddress === "work" && (
            <div className="px-6 py-2 border-2 rounded-md ms-[33%] bg-gray-100 w-fit">
              {data?.customerAddress.find((addr) => addr.type === "work")
                ?.workAddress && (
                <div className="flex flex-col gap-1">
                  <span>
                    {
                      data.customerAddress.find((addr) => addr.type === "work")
                        .workAddress.flat
                    }
                  </span>
                  <span>
                    {
                      data.customerAddress.find((addr) => addr.type === "work")
                        .workAddress.area
                    }
                  </span>
                  <span>
                    {
                      data.customerAddress.find((addr) => addr.type === "work")
                        .workAddress.landmark
                    }
                  </span>
                </div>
              )}
            </div>
          )}

          <div>
            <div className=" flex">
              <label className="w-1/3"></label>
              <button
                type="button"
                className="w-1/2 bg-gray-200 font-semibold py-2 rounded flex justify-between items-center px-4 border border-gray-300"
                onClick={() => {}}
              >
                <span>Add Address</span>
                <RenderIcon iconName="PlusIcon" size={20} loading={6} />
              </button>
            </div>
            {isFormVisible && (
              <NewAddress
                onAddCustomerAddress={() => {}}
                token={""}
                BASE_URL={""}
              />
            )}
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="instructionToDeliveryAgent">
              Instructions to Delivery Agent
            </label>
            <input
              className="h-10 px-5 text-sm border-2 w-1/2  outline-none focus:outline-none"
              type="text"
              placeholder="Instruction to agent"
              name="instructionToDeliveryAgent"
              value={homeDeliveryData.instructionToDeliveryAgent}
              onChange={() => {}}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="addedTip">
              Tips
            </label>
            <input
              className="h-10 px-5  text-sm border-2 w-1/2  outline-none focus:outline-none"
              type="text"
              placeholder="Add Tip"
              name="addedTip"
              pattern="^\d*\.?\d*$"
              title="Please enter a valid number"
              value={homeDeliveryData.addedTip}
              onChange={() => {}}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="discount">
              Flat Discount
            </label>

            <input
              type="text"
              name="flatDiscount"
              placeholder="Flat discount"
              className="h-10 ps-3 text-sm border-2 w-1/2  outline-none focus:outline-none"
              value=""
              onChange={() => {}}
            />
          </div>

          <button
            type="submit"
            className="ms-auto me-[6rem] xl:me-[12rem] my-[30px] bg-teal-700 text-white py-2 px-4 rounded-md capitalize"
          >
            Create invoice
          </button>
        </div>
      </form>

      {cartData?.items && <ShowBill data={""} />}
    </div>
  );
};

export default HomeDelivery;
