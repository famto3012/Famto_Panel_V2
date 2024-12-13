import React, { useEffect, useState } from "react";

import { HStack } from "@chakra-ui/react";
import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "@/components/ui/radio-card";

const AddressSelection = ({ address, onAddressSelect }) => {
  const [selectedAddress, setSelectedAddress] = useState({
    type: null,
    otherAddressId: null,
  });

  useEffect(() => {
    onAddressSelect(selectedAddress);
  }, [selectedAddress]);

  const handleSelectAddressType = (type) => {
    setSelectedAddress({ ...selectedAddress, type, otherAddressId: null });
  };

  const handleSelectOtherAddress = (otherAddressId) => {
    setSelectedAddress({ ...selectedAddress, otherAddressId });
  };

  return (
    <>
      {address?.length > 0 && (
        <div className="flex items-start ">
          <label className="w-1/3 px-6" htmlFor="address">
            Select Delivery Address
          </label>

          <div className="">
            {address?.map((address, index) => (
              <input
                key={index}
                type="button"
                className={`py-2 px-4 me-2 rounded border capitalize ${
                  selectedAddress.type === address.type
                    ? "bg-gray-300"
                    : "bg-white"
                }`}
                value={address.type}
                onClick={() => handleSelectAddressType(address.type)}
              />
            ))}

            {selectedAddress.type === "other" && (
              <RadioCardRoot className="mt-5">
                <RadioCardLabel>Select Other Address</RadioCardLabel>
                <HStack
                  align="stretch"
                  className="mt-[14px] flex-wrap gap-[20px]"
                >
                  {address
                    ?.find((addr) => addr.type === "other")
                    ?.otherAddress?.map((otherAddr) => (
                      <RadioCardItem
                        key={otherAddr.id}
                        value={otherAddr.id}
                        className="cursor-pointer"
                        description={
                          <div className="flex flex-col w-[150px] gap-y-1">
                            <span className="text-black">{otherAddr.flat}</span>
                            <span className="text-black">{otherAddr.area}</span>
                            <span className="text-black">
                              {otherAddr.landmark}
                            </span>
                          </div>
                        }
                        checked={
                          otherAddr.id === selectedAddress.otherAddressId
                        }
                        onChange={() => handleSelectOtherAddress(otherAddr.id)}
                      />
                    ))}
                </HStack>
              </RadioCardRoot>
            )}
          </div>
        </div>
      )}

      {selectedAddress.type === "home" && (
        <div className="px-6 py-2 border-2 rounded-md ms-[33%] bg-gray-100 w-fit">
          {address.find((addr) => addr.type === "home")?.homeAddress && (
            <div className="flex flex-col gap-1">
              <span>
                {address.find((addr) => addr.type === "home").homeAddress.flat}
              </span>
              <span>
                {address.find((addr) => addr.type === "home").homeAddress.area}
              </span>
              <span>
                {
                  address.find((addr) => addr.type === "home").homeAddress
                    .landmark
                }
              </span>
            </div>
          )}
        </div>
      )}

      {selectedAddress.type === "work" && (
        <div className="px-6 py-2 border-2 rounded-md ms-[33%] bg-gray-100 w-fit">
          {address?.find((addr) => addr.type === "work")?.workAddress && (
            <div className="flex flex-col gap-1">
              <span>
                {address.find((addr) => addr.type === "work").workAddress.flat}
              </span>
              <span>
                {address.find((addr) => addr.type === "work").workAddress.area}
              </span>
              <span>
                {
                  address.find((addr) => addr.type === "work").workAddress
                    .landmark
                }
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AddressSelection;
