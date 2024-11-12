import Select from "react-select";
import { useDraggable } from "../../../hooks/useDraggable";
import ShowBill from "./ShowBill";
import { unitOptions } from "../../../utils/defaultData";
import { useState } from "react";
import MapModal from "./MapModal";
import { DeleteIcon, LocationIcon, PlusIcon } from "../../../utils/icons";

const CustomOrder = () => {
  const [customOrderData, setCustomOrderData] = useState({
    latitude: null,
    longitude: null,
    items: [],
    instructionInDelivery: "",
    deliveryAddressType: "",
    deliveryAddressOtherAddressId: "",
    addedTip: "",
    newDeliveryAddress: {},
  });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(null);

  const coordinates = {};

  const {
    isDragging,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  } = useDraggable();

  const allCustomerAddress = [];

  const cartData = {};

  return (
    <div className="bg-white mt-5 rounded">
      <form onSubmit={() => {}}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="location">
              Search for a location
            </label>

            <div className="w-1/3">
              <button
                type="button"
                onClick={() => {}}
                className={` ${
                  coordinates?.latitude && coordinates?.longitude
                    ? `bg-teal-700 text-white`
                    : `bg-transparent text-teal-700`
                } flex items-center justify-center font-medium border border-teal-700 w-4/5 rounded-md me-auto py-2 gap-2`}
              >
                {coordinates?.latitude && coordinates?.longitude ? (
                  `Location selected`
                ) : (
                  <>
                    Mark location
                    <LocationIcon size={20} />
                  </>
                )}
              </button>

              {isFormVisible && (
                <MapModal
                  isVisible={""}
                  onClose={""}
                  setCoordinates={""}
                  BASE_URL={""}
                  token={""}
                  modelId={1}
                />
              )}
            </div>
          </div>

          <div className="flex items-start mt-[30px]">
            <h1 className="w-1/3 px-6 invisible">Add Items</h1>
            <div className="w-2/3">
              <button
                className="bg-gray-300 rounded-md flex items-center justify-center font-semibold p-3 w-[40%] "
                type="button"
                onClick={() => {}}
              >
                <PlusIcon className="mr-3" /> Add Item
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center w-full max-h-[500px] overflow-auto ">
            {/* <span className="w-1/3"></span> */}
            {customOrderData.items.map((item, index) => (
              <div
                key={index}
                className="w-2/3 ms-auto bg-gray-200 p-5 rounded-lg mb-4 flex flex-col gap-4"
              >
                <div className="flex items-center">
                  <label className="w-1/3">Item Name</label>
                  <input
                    type="text"
                    name="itemName"
                    value={item.itemName}
                    onChange={(e) => {}}
                    className="flex-grow p-3 outline-none rounded-md focus:outline-none border border-gray-300"
                  />
                </div>

                <div className="flex items-center ">
                  <label className="w-1/3">Quantity</label>
                  <input
                    name="quantity"
                    type="text"
                    value={item.quantity}
                    onChange={(e) => {}}
                    className="flex-grow p-2.5 me-3 rounded-md outline-none focus:outline-none border border-gray-300"
                  />

                  <Select
                    className="w-[100px] outline-none focus:outline-none z-10"
                    value={unitOptions.find(
                      (option) => option.value === item.unit
                    )}
                    onChange={(option) => {}}
                    options={unitOptions}
                    placeholder="Unit"
                    isClearable={false}
                    isSearchable={false}
                    menuPortalTarget={document.body}
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-1/3">Number of units</label>
                  <input
                    name="numOfUnits"
                    type="text"
                    value={item.numOfUnits}
                    onChange={(e) => {}}
                    className="flex-grow p-2.5 rounded-md outline-none focus:outline-none border border-gray-300"
                  />
                </div>

                {item.itemImageURL && (
                  <div className="flex items-center gap-4">
                    <figure className="h-20 w-20 bg-gray-400 rounded overflow-hidden">
                      <img
                        src={item.itemImageURL}
                        alt="Item image"
                        className="w-full h-full object-cover"
                      />
                    </figure>
                  </div>
                )}

                <div className="flex justify-between mt-3 gap-3">
                  <input
                    type="file"
                    name="adImage"
                    id={`adImage-${index}`}
                    className="hidden"
                    onChange={(e) => {}}
                  />
                  <label
                    htmlFor={`adImage-${index}`}
                    className="bg-gray-300 w-1/2 rounded-md p-2 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PlusIcon />
                    Upload Photo
                  </label>

                  <button
                    type="button"
                    className="bg-red-100 w-1/2 rounded-md p-2 flex items-center justify-center gap-2"
                    onClick={() => {}}
                  >
                    <DeleteIcon className="text-red-500" size={20} />
                    Delete Item
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="agentinstructions">
              Instructions to Delivery Agent
            </label>
            <input
              className="h-10 ps-3 text-sm border-2 w-1/2 outline-none focus:outline-none"
              type="text"
              placeholder="Instruction to agent"
              id="instructionInDelivery"
              name="instructionInDelivery"
              value={customOrderData.instructionInDelivery}
              onChange={() => {}}
            />
          </div>

          <div className="flex items-center ">
            <label className="w-1/3 px-6" htmlFor="address">
              Select Delivery Address
            </label>

            {allCustomerAddress?.length === 0 && <p>No address found</p>}

            {allCustomerAddress?.length > 0 && (
              <div className="">
                {allCustomerAddress?.map((address, index) => (
                  <input
                    key={index}
                    type="button"
                    className={`py-2 px-4 me-2 rounded border capitalize cursor-pointer ${
                      selectedAddress === address.type
                        ? "bg-gray-300"
                        : "bg-white"
                    }`}
                    value={address.type}
                    onClick={() => {}}
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
                            onChange={() => {}}
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
            )}
          </div>

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
                <PlusIcon />
              </button>
            </div>

            {isFormVisible && (
              <MapModal onAddCustomerAddress={""} BASE_URL={""} token={""} />
            )}
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="tips">
              Tips
            </label>
            <input
              className="h-10 ps-3 text-sm border-2 w-1/2 outline-none focus:outline-none"
              type="text"
              placeholder="Add Tip"
              name="addedTip"
              value={customOrderData.addedTip}
              onChange={() => {}}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            onClick={() => {}}
            className="ms-auto me-[6rem] xl:me-[12rem] my-[30px] bg-teal-700 text-white py-2 px-4 rounded-md capitalize"
          >
            Create invoice
          </button>
        </div>
      </form>

      {cartData?.items && <ShowBill data={cartData} />}
    </div>
  );
};

export default CustomOrder;
