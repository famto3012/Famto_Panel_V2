import { createContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [addressType, setAddressType] = useState(null);
  const [otherAddressId, setOtherAddressId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});

  return (
    <DataContext.Provider
      value={{
        addressType,
        setAddressType,
        otherAddressId,
        setOtherAddressId,
        selectedCategory,
        setSelectedCategory,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
