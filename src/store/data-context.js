import { createContext, useCallback, useState, useMemo } from "react";
import uniqid from "uniqid";
// import coat from "/coat.jpg";
// import dress from "/redDress.jpg";
// import jacket from "/jacket.jpg";
// import whiteDress from "/whiteDress.jpg";
// import whiteShirt from "/whiteShirt.jpg";

// import ClothesList from "../components/clothes/ClothesList";

const DUMMY_CONTENT = [
  {
    id: "m1" + uniqid(),
    title: "Brilliant tiger shirt",
    image: process.env.PUBLIC_URL + "img/tigerShirt.jpg",
    price: 139.99,
    content: "This is special shirt, from the real handy work",
    size: ["S", "M", "L"],
  },
  {
    id: "m2" + uniqid(),
    title: "The worldest Black jacket",
    image: process.env.PUBLIC_URL + "img/jacket.jpg",
    price: 119.99,
    content: "This is special jacket, from the real handy work",
    size: ["S", "M", "L"],
  },
  {
    id: "m3" + uniqid(),
    title: "One most popular T-Shirt",
    image: process.env.PUBLIC_URL + "img/whiteShirt.jpg",
    price: 129.99,
    content: "This is special T-Shirt, from the real handy work",
    size: ["S", "M", "L"],
  },
  {
    id: "w1" + uniqid(),
    title: "Impressive red dress",
    image: process.env.PUBLIC_URL + "img/redDress.jpg",
    price: 199.99,
    content: "This is special red dress, from the real handy work",
    size: ["S", "M", "L"],
  },
  {
    id: "w2" + uniqid(),
    title: "Famous black coat",
    image: process.env.PUBLIC_URL + "img/coat.jpg",
    price: 99.99,
    content: "This is special coat, from the real handy work",
    size: ["S", "M", "L"],
  },
  {
    id: "w3" + uniqid(),
    title: "Breathtaking white dress",
    image: process.env.PUBLIC_URL + "img/whiteDress.jpg",
    price: 149.99,
    content: "This is special white dress, from the real handy work",
    size: ["S", "M", "L"],
  },
];

const DataContext = createContext({
  allClothes: [],
  menRender: [],
  womenRender: [],
  detailItem: (id) => {},
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

  const addDataHandler = useCallback((clothes) => {
    setData((prevData) => {
      return [...prevData, clothes];
    });
    setAmount((prevAmount) => prevAmount + 1);
  }, []);

  const removeDataHandler = useCallback((id) => {
    setData((prevData) => {
      return prevData.filter((data) => data.id !== id);
    });
    setAmount((prevAmount) => prevAmount - 1);
  }, []);

  const setJustOneToCart = (id) => {
    const existingItemIndex = addData.findIndex((data) => data.id === id);
    const existingItem = addData[existingItemIndex];
    if (existingItem) {
      setData((prevData) => prevData.filter((data) => data !== existingItem));
      setAmount((prevAmount) => prevAmount - 1);
    }
  };

  const getOneDetailItem = (id) => {
    return data.filter((data) => data.id === id);
  };

  const setDataToNull = useCallback(() => {
    setData([]);
    setAmount(0);
  }, []);

  const context = {
    allClothes: useMemo(() => data, [data]),
    menRender: data.filter((data) => data.id.startsWith("m")),
    womenRender: data.filter((data) => data.id.startsWith("w")),
    detailItem: getOneDetailItem,
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
