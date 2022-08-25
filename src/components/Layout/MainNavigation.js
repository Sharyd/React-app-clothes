import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineMenu,
  HiOutlineShoppingCart,
} from "react-icons/hi";

import classes from "./MainNavigation.module.css";
import DataContext from "../../store/data-context";

const MainNavigation = (props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const dataCtx = useContext(DataContext);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <header className={`${classes.header} ${isScrolled && classes.scrolled}`}>
      <div className={classes.logo}>Fashion Hits</div>
      <nav className={classes.nav}>
        <ul>
          <li className={classes.centerAll}>
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
          <div className={classes.iconsContent}>
            <li>
              <NavLink to="auth" activeClassName={classes.active}>
                <HiOutlineUser className={classes.userIcon}></HiOutlineUser>
              </NavLink>
            </li>
            <button className={classes.button} onClick={props.onClick}>
              <HiOutlineShoppingCart></HiOutlineShoppingCart>
              <span className={classes.badge}>{dataCtx.totalAmount}</span>
            </button>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
