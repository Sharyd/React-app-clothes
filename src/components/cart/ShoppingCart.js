import React, { useCallback, useMemo } from "react";
import classes from "./ShoppingCart.module.css";
import Modal from "../ui/Modal";
import ShoppingCartItem from "./ShoppingCartItem";

import DataContext from "../../store/data-context";

import { Fragment, useContext, useState, useEffect } from "react";
import FormCart from "./FormCart";

const ShoppingCart = (props) => {
  const [isForm, setIsForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const [error, setError] = useState({
    errorMessage: "",
    errorBool: false,
  });

  // const [itemInCart, setItemInCart] = useState(false);

  const dataCtx = useContext(DataContext);
  const { setDataToNull } = dataCtx;
  const { cartData } = dataCtx;

  const hasItems = cartData.length >= 1;
  const { onClose } = props;

  const removeHandler = (clothes) => {
    dataCtx.removeDataHandler({ ...clothes });
    setIsForm(false);
  };

  const formHandler = () => {
    setIsForm(true);
  };
  const cancelInFormHandler = () => {
    setIsForm(false);
  };

  let myData = [];

  const getUpdatedData = useCallback(
    (data) => {
      console.log(data);
      if (data) {
        myData.push(data);
      }
    },
    [myData]
  );

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    try {
      await fetch(
        "https://cloth-3a6df-default-rtdb.firebaseio.com/ordersClothes.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: [...myData],
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsSubmitting(false);
      setDidSubmit(true);
    } catch (err) {
      // console.log(err);
      setError({
        errorMessage: err + ".Try again, please",
        errorBool: true,
      });
      throw new Error(err.message || "Something went wrong!");
    }
  };

  const setErrorToNull = () => {
    setError(false);
    setIsSubmitting(false);
  };

  const cartItems1 = (
    <Fragment>
      <ul className={classes["cart-items"]}>
        {cartData.map((cloth) => (
          <ShoppingCartItem
            key={cloth.id}
            id={cloth.id}
            name={cloth.name}
            price={cloth.price}
            amount={cloth.amount}
            image={cloth.image}
            removeHandler={removeHandler}
            onClose={props.onClose}
            updatedData={getUpdatedData}
          />
        ))}
      </ul>

      {!isForm && hasItems && (
        <button className={classes.order} onClick={formHandler}>
          Order
        </button>
      )}
      {isForm && hasItems && (
        <FormCart
          onConfirm={submitOrderHandler}
          onCancel={cancelInFormHandler}
        ></FormCart>
      )}
    </Fragment>
  );

  const didSubmitModalContent = (
    <React.Fragment>
      <p className={classes.textSubmit}>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button
          className={classes.button}
          onClick={() => {
            setDataToNull();
          }}
        >
          Close
        </button>
      </div>
    </React.Fragment>
  );

  useEffect(() => {
    if (didSubmit) {
      const timer = setTimeout(() => {
        setDidSubmit(false);
        setIsSubmitting(false);
        setDataToNull();
      }, 4500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [didSubmit, setDataToNull]);

  if (!hasItems) {
    onClose();
  }

  return (
    <React.Fragment>
      {hasItems && (
        <Modal onClose={props.onClose}>
          {!isSubmitting && !didSubmit && cartItems1}
          {isSubmitting}
          {!isSubmitting && didSubmit && didSubmitModalContent}
          {isSubmitting && !error && (
            <p className={classes.loading}>Loading...</p>
          )}
          {error.errorBool && (
            <p className={classes.error} onClick={setErrorToNull}>
              {error.errorMessage}
            </p>
          )}
        </Modal>
      )}
    </React.Fragment>
  );
};

export default React.memo(ShoppingCart);
