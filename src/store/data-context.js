import { createContext, useCallback, useState } from "react";

import shirt from "../img/tigerShirt.jpg";
import coat from "../img/coat.jpg";
import dress from "../img/redDress.jpg";
import jacket from "../img/jacket.jpg";
import whiteDress from "../img/whiteDress.jpg";
import whiteShirt from "../img/whiteShirt.jpg";

// import ClothesList from "../components/clothes/ClothesList";

const DUMMY_CONTENT = [
  {
    id: "m1",
    title: "Brilliant tiger shirt",
    image: shirt,
    price: 139.99,
  },
  {
    id: "m2",
    title: "The worldest Black jacket",
    image: jacket,
    price: 119.99,
  },
  {
    id: "m3",
    title: "One most popular T-Shirt",
    image: whiteShirt,
    price: 129.99,
  },
  {
    id: "w1",
    title: "Impressive red dress",
    image: dress,
    price: 199.99,
  },
  {
    id: "w2",
    title: "Famous black coat",
    image: coat,
    price: 99.99,
  },
  {
    id: "w3",
    title: "Breathtaking white dress",
    image: whiteDress,
    price: 149.99,
  },
];

const DataContext = createContext({
  allClothes: [],
  menRender: [],
  womenRender: [],
  dataFunc: () => {},
  removeDataHandler: (id) => {},
  setJustOneToCart: (id) => {},
  setDataToNull: () => {},
  totalAmount: 0,
  addData: [],
});

export const DataContextProvider = (props) => {
  const [data] = useState(DUMMY_CONTENT);

  const [amount, setAmount] = useState(0);
  const [addData, setData] = useState([]);

  const addDataHandler = (clothes) => {
    setData((prevData) => {
      return [...prevData, clothes];
    });
    setAmount((prevAmount) => prevAmount + 1);
  };

  const removeDataHandler = (id) => {
    setData((prevData) => {
      return prevData.filter((data) => data.id !== id);
    });
    setAmount((prevAmount) => prevAmount - 1);
  };

  const setJustOneToCart = (id) => {
    const existingItemIndex = addData.findIndex((data) => data.id === id);
    const existingItem = addData[existingItemIndex];
    if (existingItem) {
      setData((prevData) => prevData.filter((data) => data !== existingItem));
      setAmount((prevAmount) => prevAmount - 1);
    }
  };

  const setDataToNull = useCallback(() => {
    setData([]);
    setAmount(0);
  }, []);

  const context = {
    allClothes: data,
    menRender: data.filter((data) => data.id.startsWith("m")),
    womenRender: data.filter((data) => data.id.startsWith("w")),
    dataFunc: addDataHandler,
    removeDataHandler,
    setJustOneToCart,
    setDataToNull,
    totalAmount: amount,
    cartData: addData,
  };

  return (
    <DataContext.Provider value={context}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
