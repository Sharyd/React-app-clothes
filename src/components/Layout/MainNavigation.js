import { useContext } from "react";
import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import DataContext from "../../store/data-context";
const MainNavigation = (props) => {
  const dataCtx = useContext(DataContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Fashion Hits</div>
      <nav>
        <ul>
          <li>
            <NavLink to="/all-clothes" activeClassName={classes.active}>
              All Clothes
            </NavLink>
          </li>

          <li>
            <NavLink to="men" activeClassName={classes.active}>
              Men
            </NavLink>
          </li>
          <li>
            <NavLink to="women" activeClassName={classes.active}>
              Women
            </NavLink>
          </li>
          <button className={classes.button} onClick={props.onClick}>
            Shopping Cart
            <span className={classes.badge}>{dataCtx.totalAmount}</span>
          </button>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
