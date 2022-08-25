import Card from "../ui/Card";
import { Link } from "react-router-dom";
import classes from "./ClothesItem.module.css";
import DataContext from "../../store/data-context";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
const ClothesItem = (props) => {
  const dataCtx = useContext(DataContext);
  const authCtx = useContext(AuthContext);
  const { id } = props;

  const { price } = props;
  const forAuthenticatedPrice = price / 1.5;

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
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <Link to={`/${id}`}>
            <img src={props.image} alt={props.title} />
          </Link>
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <h3 className={classes.price}>
            {authCtx.isLoggedIn ? forAuthenticatedPrice.toFixed(2) : price}$
            {authCtx.isLoggedIn && (
              <span className={classes.priceSale}>{price}$</span>
            )}
          </h3>
        </div>
        <div className={classes.actions}>
          <button
            onClick={() => {
              dataHandler();
              renderJustOneToCart();
            }}
          >
            To Cart
          </button>
        </div>
      </Card>
    </li>
  );
};

export default ClothesItem;
