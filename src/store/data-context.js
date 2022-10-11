import React from "react";

const DataContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
  allClothes: [],
  menRender: [],
  womenRender: [],
});

export default DataContext;
