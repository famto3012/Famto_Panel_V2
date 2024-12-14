import { useContext, useEffect, useState } from "react";

import AddressContext from "@/context/AddressContext";

import { HStack } from "@chakra-ui/react";
import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "@/components/ui/radio-card";
import { toaster } from "@/components/ui/toaster";

const AddressSelection = ({ address, onAddressSelect, label }) => {
  const [selectedAddress, setSelectedAddress] = useState({
    type: null,
    otherAddressId: null,
  });

  const { addressType, setAddressType, otherAddressId, setOtherAddressId } =
    useContext(AddressContext);

  useEffect(() => {
    onAddressSelect(selectedAddress);
  }, [selectedAddress]);

  const handleSelectAddressType = (type) => {
    if (type === addressType && type !== "other") {
      toaster.create({
        title: "Error",
        description: "Pick-up Address and Delivery Address cannot be the same",
        type: "error",
      });
      return;
    }

    setAddressType(type);
    setSelectedAddress({ type, otherAddressId: null });
  };

  const handleSelectOtherAddress = (id) => {
    if (id === otherAddressId) {
      toaster.create({
        title: "Error",
        description: "Pick-up Address and Delivery Address cannot be the same",
        type: "error",
      });
      return;
    }

    setOtherAddressId(id);
    setSelectedAddress((prev) => ({ ...prev, otherAddressId: id }));
  };

  return (
    <>
      {address?.length > 0 && (
        <div className="flex items-start mb-5">
          <label className="w-1/3 px-6" htmlFor="address">
            {label}
          </label>

          <div>
            {address?.map((address, index) => (
              <input
                key={index}
                type="button"
                className={`py-2 px-4 me-2 rounded border capitalize cursor-pointer ${
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
