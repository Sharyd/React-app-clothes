import CartDetailList from "./CartDetailList";
import classes from "./CartDetailItem.module.css";
const CartDetailItem = (props) => {
  const { dataDetail } = props;

  return (
    <ul className={classes.cartDetail}>
      {dataDetail.map((data) => (
        <CartDetailList
          key={data.id}
          id={data.id}
          image={data.image}
          price={data.price}
          title={data.title}
          content={data.content}
        />
      ))}
    </ul>
  );
};

export default CartDetailItem;
