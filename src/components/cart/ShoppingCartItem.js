import classes from "./ShoppingCartItem.module.css";
import { useState, useContext, Fragment } from "react";
import DataContext from "../../store/data-context";

const ShoppingCartItem = (props) => {
  const price = `${props.price.toFixed(1)}`;
  const dataCtx = useContext(DataContext);
  const [amount, setAmount] = useState(1);
  const [uprice, setPrice] = useState(+price);
  const { id } = props;

  const addAmountHandler = () => {
    setAmount((prevAmount) => prevAmount + 1);
    setPrice(price * (amount + 1));
  };

  const deleteAmountHandler = () => {
    setAmount((prevAmount) => {
      if (prevAmount <= 1) {
        return dataCtx.removeDataHandler(id);
      } else {
        setPrice(price * (amount - 1));
        return prevAmount - 1;
      }
    });
  };

  return (
    <Fragment>
      <li className={classes["cart-item"]}>
        <div>
          <h2>{props.name}</h2>
          <img
            className={classes.image}
            src={props.image}
            alt={props.name}
          ></img>
          <span className={classes.amount}>
            x {amount < 0 ? amount === 0 : amount}
          </span>
          <div className={classes.summary}>
            <span className={classes.price}>
              ${uprice < 0 ? uprice === 0 : uprice}
            </span>
          </div>
        </div>
        <div className={classes.actions}>
          <button
            onClick={() => {
              deleteAmountHandler();
            }}
          >
            −
          </button>
          <button
            onClick={() => {
              addAmountHandler();
            }}
          >
            +
          </button>
        </div>
      </li>
    </Fragment>
  );
};

export default ShoppingCartItem;
