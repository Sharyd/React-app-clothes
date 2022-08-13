import { Fragment, useState, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AllClothesPage from "./pages/AllClothes";
import MenPage from "./pages/Men";
import WomenPage from "./pages/Women";
import Layout from "./components/Layout/Layout";
import ShoppingCart from "./components/cart/ShoppingCart";

import DataContext from "./store/data-context";
function App() {
  const [showCart, setShowCart] = useState(false);
  const dataCtx = useContext(DataContext);
  const { cartData } = dataCtx;

  const showCartHandler = () => {
    setShowCart(() => {
      if (cartData.length >= 1) {
        return true;
      }
    });
  };
  const hideCartHandler = () => {
    setShowCart(false);
  };
  return (
    <Fragment>
      {showCart && <ShoppingCart onClose={hideCartHandler} />}
      <Layout onClick={showCartHandler}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/all-clothes" />
          </Route>
          <Route path="/all-clothes" exact>
            <AllClothesPage />
          </Route>
          <Route path="/men">
            <MenPage />
          </Route>
          <Route path="/women">
            <WomenPage />
          </Route>
        </Switch>
      </Layout>
    </Fragment>
  );
}

export default App;
