import { useState } from "react";
import Select from "react-select";

import { Spinner } from "@chakra-ui/react";

import { useDraggable } from "../../../hooks/useDraggable";

import { DownloadIcon, SearchIcon } from "../../../utils/icons";
import { paymentOptions } from "../../../utils/defaultData";
import { role } from "../../../utils/testData";

const TakeAway = () => {
  const [takeAwayData, setTakeAwayData] = useState({
    // ...data,
    merchantId: null,
    items: [],
    instructionToMerchant: "",
  });
  const [isMerchantLoading, setIsMerchantLoading] = useState(false);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [isInvoiceLoading, setIsInvoiceLoading] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);

  const {
    isDragging,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  } = useDraggable();

  const merchantResults = [];
  const businessCategories = [];
  const productResults = [];
  const cartData = {};

  return (
    <div className="bg-white mt-5 rounded">
      <form onSubmit={() => {}}>
        <div className="flex flex-col gap-6">
          {role === "Admin" && (
            <div className="flex items-center relative">
              <label className="w-1/3 px-6" htmlFor="merchant">
                Select Merchant
              </label>
              <div className="relative w-1/2">
                <input
                  type="text"
                  name="merchantName"
                  placeholder="Search merchant"
                  className="h-10 ps-3 text-sm border-2 w-full outline-none focus:outline-none"
                  value={""}
                  onChange={() => {}}
                />

                {isMerchantLoading && (
                  <Spinner
                    size={15}
                    className="absolute top-[30%] right-[10px]"
                  />
                )}

                {!isMerchantLoading && (
                  <SearchIcon className="text-xl text-gray-500 absolute top-[30%] right-[10px]" />
                )}

                {merchantResults?.length > 0 && (
                  <ul className="absolute bg-white border w-full mt-1 z-50">
                    {merchantResults?.map((result) => (
                      <li
                        key={result._id}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => selectMerchant(result)}
                      >
                        {result?.merchantName} - {result?.geofence} (
                        {result?.isServiceableToday})
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
                      ? `bg-gray-300`
                      : `bg-gray-100`
                  }  border border-gray-300  p-2 rounded-sm`}
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
                id="product"
                placeholder="Product"
                className="h-10 ps-3 text-sm border-2 w-full outline-none focus:outline-none"
                value={""}
                onChange={() => {}}
              />

              {isProductLoading && (
                <Spinner
                  size="sm"
                  className="absolute top-[20%] right-[10px]"
                />
              )}

              {!isProductLoading && (
                <SearchIcon className="text-xl text-gray-500 absolute top-[30%] right-[10px]" />
              )}

              {productResults?.length > 0 && (
                <ul className="absolute bg-white border w-full mt-1 z-50 max-h-[20rem] overflow-auto">
                  {productResults?.map((result) => (
                    <li
                      key={result.id}
                      className="p-2 py-3 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {}}
                    >
                      {result?.productName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6">Selected Products</label>
            <div
              className={`relative w-[50%] flex gap-4 overflow-x-auto ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {takeAwayData.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-3 py-2 bg-gray-100 p-3 border-2 border-gray-300 rounded-md"
                >
                  <div>
                    <p className="text-gray-600 mb-2 w-[100px] truncate">
                      {item.productName}
                    </p>
                    <p className="text-gray-600">
                      {item.variants.length === 0 ? `₹${item.price}` : ""}
                    </p>

                    {item?.variants?.length > 0 && (
                      <div>
                        <select
                          className="outline-none focus:outline-none bg-white p-2"
                          value={item.selectedVariantId || ""}
                          onChange={(e) => {}}
                        >
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
                      onClick={(e) => {}}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="text-green-400 text-xl"
                      onClick={(e) => {}}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
                value={takeAwayData.instructionToMerchant}
                onChange={(e) =>
                  setTakeAwayData({
                    ...takeAwayData,
                    instructionToMerchant: e.target.value,
                  })
                }
              />
            </div>
          )}

          <button
            type="submit"
            className="ms-auto me-[6rem] xl:me-[12rem] my-[30px] bg-teal-700 text-white py-2 px-4 rounded-md capitalize"
          >
            {isInvoiceLoading ? `Creating invoice...` : `Create invoice`}
          </button>
        </div>
      </form>

      {cartData?.items && (
        <>
          <div className="flex my-5">
            <h1 className="px-6 w-1/3 font-semibold">Payment mode</h1>

            <div className=" w-1/2">
              <Select
                options={paymentOptions}
                value={paymentOptions.find(
                  (option) => option.value === paymentMode
                )}
                onChange={(option) => {}}
                className="w-ful outline-none focus:outline-none"
                placeholder="Select payment mode"
                isSearchable={true}
                isMulti={false}
                menuPlacement="auto"
              />
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
                  {cartData?.items?.map((data) => (
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
              className="bg-cyan-50 py-2 px-4 rounded-md text-lg"
              type="button"
              onClick={() => {}}
            >
              <DownloadIcon /> Bill
            </button>

            <button
              className="bg-teal-700 text-white py-2 px-4 rounded-md"
              type="submit"
              onClick={() => {}}
            >
              {isOrderLoading
                ? "Creating order..."
                : `Create Order ₹${cartData?.billDetail?.itemTotal || ""}`}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TakeAway;
