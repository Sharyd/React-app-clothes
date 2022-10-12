import React from "react";
import { Fragment, useContext } from "react";
import { useParams } from "react-router-dom";
import CartDetailItem from "../components/cart/cart-detail/CartDetailItem";

import DataContext from "../store/data-context";

const CartDetailPage = (props) => {
  const dataCtx = useContext(DataContext);
  const { id } = useParams();
  const { allClothes } = dataCtx;

  return (
    <Fragment>
      <CartDetailItem
        dataDetail={allClothes.filter((data) => data.id === id)}
      />
    </Fragment>
  );
};

export default React.memo(CartDetailPage);
