import { createContext, useState } from "react";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addressType, setAddressType] = useState(null);
  const [otherAddressId, setOtherAddressId] = useState(null);

  return (
    <AddressContext.Provider
      value={{
        addressType,
        setAddressType,
        otherAddressId,
        setOtherAddressId,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export default AddressContext;
