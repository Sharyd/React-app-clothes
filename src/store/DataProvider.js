import { useState, useMemo, useReducer } from "react";
import uniqid from "uniqid";

import DataContext from "./data-context";

const DUMMY_CONTENT = [
  {
    id: "m1" + uniqid(),
    title: "Brilliant tiger shirt",
    image: process.env.PUBLIC_URL + "img/tigerShirt.jpg",
    price: 139.99,
    category: "men",
    content: "This is special shirt, from the real handy work",
    size: ["S", "M", "L"],
  },
  {
    id: "m2" + uniqid(),
    title: "The worldest Black jacket",
    image: process.env.PUBLIC_URL + "img/jacket.jpg",
    price: 119.99,
    category: "men",
    content: "This is special jacket, from the real handy work",
    size: ["S", "M", "L"],
  },
  {
    id: "m3" + uniqid(),
    title: "One most popular T-Shirt",
    image: process.env.PUBLIC_URL + "img/whiteShirt.jpg",
    price: 129.99,
    category: "men",
    content: "This is special T-Shirt, from the real handy work",
    size: ["S", "M", "L"],
  },
  {
    id: "w1" + uniqid(),
    title: "Impressive red dress",
    image: process.env.PUBLIC_URL + "img/redDress.jpg",
    price: 199.99,
    category: "women",
    content: "This is special red dress, from the real handy work",
    size: ["S", "M", "L"],
  },
  {
    id: "w2" + uniqid(),
    title: "Famous black coat",
    image: process.env.PUBLIC_URL + "img/coat.jpg",
    price: 99.99,
    category: "women",
    content: "This is special coat, from the real handy work",
    size: ["S", "M", "L"],
  },
  {
    id: "w3" + uniqid(),
    title: "Breathtaking white dress",
    image: process.env.PUBLIC_URL + "img/whiteDress.jpg",
    price: 149.99,
    category: "women",
    content: "This is special white dress, from the real handy work",
    size: ["S", "M", "L"],
  },
];

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];

      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  return defaultCartState;
};

const DataProvider = (props) => {
  const [data] = useState(DUMMY_CONTENT);
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemToCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };
  const dataContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    setDataToNull: clearCartHandler,
    allClothes: useMemo(() => data, [data]),
    menRender: data.filter((data) => data.category.startsWith("m")),
    womenRender: data.filter((data) => data.category.startsWith("w")),
  };

  return (
    <DataContext.Provider value={dataContext}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
