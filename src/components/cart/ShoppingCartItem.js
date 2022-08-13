import classes from "./ShoppingCartItem.module.css";
import { useState, useContext, Fragment, useCallback } from "react";
import DataContext from "../../store/data-context";

const ShoppingCartItem = (props) => {
  const options = [
    { value: "S", text: "S" },
    { value: "M", text: "M" },
    { value: "L", text: "L" },
  ];

  const price = `${props.price.toFixed(1)}`;
  const dataCtx = useContext(DataContext);
  const { removeDataHandler } = dataCtx;
  const [amount, setAmount] = useState(1);
  const [uprice, setPrice] = useState(+price);
  const [selectedSize, setSelectedSize] = useState(options[0].value);

  const { id, name } = props;

  console.log(selectedSize);
  const addAmountHandler = useCallback(() => {
    setAmount((prevAmount) => prevAmount + 1);
    setPrice(price * (amount + 1));
  }, [price, amount]);

  const deleteAmountHandler = useCallback(() => {
    setAmount((prevAmount) => {
      if (prevAmount <= 1) {
        return removeDataHandler(id);
      } else {
        setPrice(price * (amount - 1));
        return prevAmount - 1;
      }
    });
  }, [amount, price, removeDataHandler, id]);

  props.updatedData({
    name: name,
    amount: amount,
    price: uprice,
    size: selectedSize,
  });

  return (
    <Fragment>
      <li className={classes["cart-item"]}>
        <div>
          <h2>{props.name}</h2>
          <div className={classes.mainContainer}>
            <img
              className={classes.image}
              src={props.image}
              alt={props.name}
            ></img>
            <form className={classes.selectedContainer}>
              <label htmlFor="size">Choose your size:</label>
              <select
                id="size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </form>
          </div>

          <div className={classes.summary}>
            <span className={classes.amount}>
              x {amount < 0 ? amount === 0 : amount}
            </span>
            <span className={classes.price}>
              ${uprice < 0 ? uprice === 0 : uprice}
            </span>
          </div>
        </div>
        <div className={classes.actions}>
          <button onClick={deleteAmountHandler}>−</button>
          <button onClick={addAmountHandler}>+</button>
        </div>
      </li>
    </Fragment>
  );
};

export default ShoppingCartItem;
