import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [id, setId] = useState(null);

  const setID = (newID) => {
    setId(newID);
  };

  return (
    <DataContext.Provider value={{ id, setID }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
