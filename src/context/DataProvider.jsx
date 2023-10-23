import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [shopName, setShopName] = useState("");

  const setID = (newID) => {
    setId(newID);
  };

  const setNAME = (newName) => {
    setShopName(newName);
  };

  return (
    <DataContext.Provider value={{ id, setID, shopName, setNAME }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
