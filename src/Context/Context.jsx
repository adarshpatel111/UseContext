// Context.js

import React, { createContext, useState } from "react";

// Create a Context for global state
const MyContext = createContext();

// Create a provider component
export const MyContextProvider = ({ children }) => {
  // This is the global state that will be shared across the app
  const [items, setItems] = useState([]);

  // Function to add an item
  const addItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  // Function to remove an item
  const removeItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };
  const updateItem = (data) => {
    setItems(data);
  };
  return (
    <MyContext.Provider
      value={{ items, addItem, removeItem, updateItem, setItems }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
