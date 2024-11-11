import { useState } from "react";
import { useDraggable } from "../../../hooks/useDraggable";
import { itemTypes } from "../../../utils/defaultData";
import { PlusIcon } from "../../../utils/icons";
import NewAddress from "./NewAddress";
import ShowBill from "./ShowBill";

const PickAndDrop = ({ data }) => {
  const [pickAndDropData, setPickAndDropData] = useState({
    items: [],
    pickUpAddressType: "",
    pickUpAddressOtherAddressId: "",
    deliveryAddressType: "",
    deliveryAddressOtherAddressId: "",
    newPickupAddress: {},
    newDeliveryAddress: {},
    vehicleType: "",
    instructionInPickup: "",
    instructionInDelivery: "",
    addedTip: null,
  });

  const {
    isDragging,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  } = useDraggable();

  const allCustomerAddress = [];

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedPickUpAddress, setSelectedPickUpAddress] = useState(null);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null);
  const [isNewPickupAddressVisible, setIsNewPickupAddressVisible] =
    useState(null);
  const [isNewDeliveryAddressVisible, setIsNewDeliveryAddressVisible] =
    useState(null);
  const cartData = {};

  return (
    <div>
      <h1 className="bg-teal-800 text-white px-6 py-4 text-xl font-semibold">
        Pick Up
      </h1>

      <form>
        <div className="flex flex-col gap-6">
          <div className="flex items-center mt-[30px]">
            <label className="w-1/3 px-6" htmlFor="address">
              Select Pickup Address
            </label>

            {allCustomerAddress?.length === 0 && <p>No address found</p>}

            {allCustomerAddress?.length > 0 && (
              <div className="">
                {allCustomerAddress?.map((address, index) => (
                  <input
                    key={index}
                    type="button"
                    className={`py-2 px-4 me-2 rounded border capitalize cursor-pointer ${
                      selectedPickUpAddress === address.type
                        ? "bg-gray-300"
                        : "bg-white"
                    }`}
                    value={address.type}
                    onClick={() => handleSelectPickUpAddress(address.type)}
                  />
                ))}

                {selectedPickUpAddress === "other" && (
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
                            checked={
                              pickAndDropData.pickUpAddressOtherAddressId ===
                              otherAddr.id
                            }
                            onChange={() => {
                              // setSelectedPickOtherAddressId(otherAddr.id);
                              setPickAndDropData({
                                ...pickAndDropData,
                                pickUpAddressOtherAddressId: otherAddr.id,
                              });
                            }}
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
          {selectedPickUpAddress === "home" && (
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

          {selectedPickUpAddress === "work" && (
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
            <div className="flex">
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
            {isNewPickupAddressVisible && (
              <NewAddress
                onAddCustomerAddress={() => {}}
                BASE_URL={""}
                token={""}
              />
            )}
          </div>

          {data?.ifScheduled?.time && (
            <div className="flex items-center">
              <label className="w-1/3 px-6" htmlFor="orderTime">
                Order Time
              </label>
              <input
                type="text"
                name="orderTime"
                placeholder="In scheduled order, it will be filled automatically as scheduled"
                readOnly
                className="h-10 ps-3 text-sm w-1/2  outline-none focus:outline-none"
                value={data?.ifScheduled?.time}
                onChange={() => {}}
              />
            </div>
          )}

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="pickData.instructions">
              Pick Instructions (if any)
            </label>
            <input
              type="text"
              name="instructionInPickup"
              placeholder="Instructions"
              className="h-10 ps-3 text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none"
              value={pickAndDropData.instructionInPickup}
              onChange={() => {}}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6">Task Specifications</label>
            <button
              type="button"
              className="bg-zinc-200 w-1/2 rounded-md p-2 flex items-center justify-center gap-3"
              onClick={() => {}}
            >
              <PlusIcon />
              <span>Add Item</span>
            </button>
          </div>

          <div className="max-h-[1000px] overflow-y-auto">
            {pickAndDropData?.items?.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 mx-6 p-10 rounded-lg mb-4"
              >
                <div className="flex">
                  <label className="w-1/3">Item type</label>

                  <Select
                    className="w-1/2 outline-none focus:outline-none z-10"
                    value={itemTypes.find(
                      (option) => option.value === item.itemName
                    )}
                    isSearchable={true}
                    onChange={(option) => {}}
                    options={itemTypes}
                    placeholder="Select item"
                    isClearable={false}
                  />
                </div>
                <div className="flex mt-5">
                  <label className="w-1/3">Dimensions (in cm)</label>
                  <div className="w-1/2 gap-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="length"
                        value={item.length}
                        onChange={(e) => {}}
                        className="outline-none focus:outline-none border border-gray-200 p-3 rounded w-1/3"
                        placeholder="Length"
                      />
                      <input
                        type="text"
                        name="width"
                        value={item.width}
                        onChange={(e) => {}}
                        className="outline-none focus:outline-none border border-gray-200 p-3 rounded w-1/3"
                        placeholder="Width"
                      />
                      <input
                        type="text"
                        name="height"
                        value={item.height}
                        onChange={(e) => {}}
                        className="outline-none focus:outline-none border border-gray-200 p-3 rounded w-1/3"
                        placeholder="Height"
                      />
                    </div>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="weight"
                        value={item.weight}
                        onChange={(e) => {}}
                        className="outline-none focus:outline-none border border-gray-200 p-3 rounded w-full"
                        placeholder="Weight (in kg)"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center mt-3">
                  <label htmlFor="" className="w-1/3"></label>
                  <button
                    type="button"
                    className="bg-red-200 w-1/2 rounded-md p-2 flex items-center justify-center gap-2"
                    onClick={() => {}}
                  >
                    <RiDeleteBinLine /> Remove Item
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h1 className="bg-teal-800 text-white px-6 py-4 text-xl font-semibold mt-[40px]">
          Drop Off
        </h1>

        <div className="flex flex-col gap-6">
          <div className="flex items-center mt-[30px]">
            <label className="w-1/3 px-6" htmlFor="address">
              Select Drop Address
            </label>
            {allCustomerAddress?.length === 0 && <p>No address found</p>}

            {allCustomerAddress?.length > 0 && (
              <div className="">
                {allCustomerAddress?.map((address, index) => (
                  <input
                    key={index}
                    type="button"
                    className={`py-2 px-4 me-2 rounded border capitalize ${
                      selectedDeliveryAddress === address.type
                        ? "bg-gray-300"
                        : "bg-white"
                    }`}
                    value={address.type}
                    onClick={() => handleSelectDeliveryAddress(address.type)}
                  />
                ))}

                {selectedDeliveryAddress === "other" && (
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
                            checked={
                              pickAndDropData.deliveryAddressOtherAddressId ===
                              otherAddr.id
                            }
                            onChange={() => {
                              // setSelectedDeliveryOtherAddressId(otherAddr.id);
                              setPickAndDropData({
                                ...pickAndDropData,
                                deliveryAddressOtherAddressId: otherAddr.id,
                              });
                            }}
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

          {selectedDeliveryAddress === "home" && (
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

          {selectedDeliveryAddress === "work" && (
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
            <div className="flex">
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
            {isNewDeliveryAddressVisible && (
              <NewAddressTwo
                onAddCustomerAddress={() => {}}
                BASE_URL={""}
                token={""}
              />
            )}
          </div>

          {data?.deliveryTime && (
            <div className="flex items-center">
              <label className="w-1/3 px-6" htmlFor="deliveryTime">
                Delivery Time
              </label>
              <input
                type="text"
                name="deliveryime"
                readOnly
                placeholder="In scheduled order, it will be filled automatically as scheduled"
                className="h-10 ps-3 text-sm w-1/2  outline-none focus:outline-none"
                value={data?.deliveryTime}
                onChange={() => {}}
              />
            </div>
          )}

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="dropData.instructions">
              Drop Instructions (if any)
            </label>
            <input
              type="text"
              name="instructionInDelivery"
              placeholder="Instructions"
              className="h-10 ps-3 text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none"
              value={pickAndDropData.instructionInDelivery}
              onChange={() => {}}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="dropData.addedTip">
              Add Tip
            </label>
            <input
              type="text"
              name="addedTip"
              pattern="[0-9]"
              placeholder="Tip for the delivery"
              className="h-10 ps-3 text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none"
              value={pickAndDropData.addedTip}
              onChange={() => {}}
              inputmode="numeric"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="dropData.addedTip">
              Vehicle type
            </label>
            {["Bike", "Scooter"].map((vehicle) => (
              <button
                key={""}
                type="button"
                className={`py-2 px-4 rounded border me-2 ${
                  selectedVehicle === vehicle ? "bg-gray-300" : "bg-white"
                }`}
                onClick={() => {}}
              >
                {vehicle}
              </button>
            ))}
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

      {cartData?.items && <ShowBill data={""} />}
    </div>
  );
};

export default PickAndDrop;
