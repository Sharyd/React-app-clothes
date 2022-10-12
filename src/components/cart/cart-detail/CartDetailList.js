import DataContext from "../../../store/data-context";
import { useContext } from "react";
import classes from "./CartDetailList.module.css";
import AuthContext from "../../../store/auth-context";
import { toast } from "react-hot-toast";
const CartDetailList = (props) => {
  const dataCtx = useContext(DataContext);
  const authCtx = useContext(AuthContext);
  const { price } = props;

  const forAuthenticatedPrice = price / 1.5;

  const dataHandler = () => {
    dataCtx.addItem({
      id: props.id,
      name: props.title,
      amount: 1,
      price: authCtx.isLoggedIn ? forAuthenticatedPrice : props.price,
      image: props.image,
    });
    toast.success(`${props.name} added to basket`, {
      position: "bottom-center",
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
              {authCtx.isLoggedIn ? forAuthenticatedPrice.toFixed(0) : price}$
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
