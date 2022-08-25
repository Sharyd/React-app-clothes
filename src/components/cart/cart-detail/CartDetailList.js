import DataContext from "../../../store/data-context";
import { useContext } from "react";
import classes from "./CartDetailList.module.css";
import AuthContext from "../../../store/auth-context";
const CartDetailList = (props) => {
  const dataCtx = useContext(DataContext);
  const authCtx = useContext(AuthContext);
  const { price } = props;

  const forAuthenticatedPrice = price / 1.5;

  const { id } = props;

  const renderJustOneToCart = () => {
    dataCtx.setJustOneToCart(id);
  };

  const dataHandler = () => {
    dataCtx.dataFunc({
      id: props.id,
      name: props.title,
      amount: props.amount,
      price: props.price,
      image: props.image,
    });
  };

  return (
    <li className={classes.detailList}>
      <div className={classes.container}>
        <img src={props.image} alt={props.title}></img>
        <div className={classes.containerContent}>
          <h2>
            {props.title}
            <span className={classes.price}>
              {authCtx.isLoggedIn ? forAuthenticatedPrice.toFixed(2) : price}$
              {authCtx.isLoggedIn && (
                <span className={classes.priceSale}>{price}$</span>
              )}
            </span>
          </h2>
          <p className={classes.content}>{props.content}</p>
          <button
            className={classes.button}
            onClick={() => {
              dataHandler();
              renderJustOneToCart();
            }}
          >
            To Cart
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartDetailList;
