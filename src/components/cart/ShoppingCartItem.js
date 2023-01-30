import classes from "./ShoppingCartItem.module.css";
import { useState, Fragment } from "react";

const ShoppingCartItem = (props) => {
  const options = [
    { value: "S", text: "S" },
    { value: "M", text: "M" },
    { value: "L", text: "L" },
  ];

  const price = `${props.price.toFixed(0)}`;
  const [selectedSize, setSelectedSize] = useState(options[0].value);

  props.setSize({
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
              x {props.amount < 0 ? props.amount === 0 : props.amount}
            </span>
            <span className={classes.price}>
              ${price < 0 ? price === 0 : price}
            </span>
          </div>
        </div>
        <div className={classes.actions}>
          <button onClick={props.onAdd}>+</button>
          <button onClick={props.onRemove}>−</button>
        </div>
      </li>
    </Fragment>
  );
};

export default ShoppingCartItem;
