import { Fragment, useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingCart } from "react-icons/hi";

import classes from "./MainNavigation.module.css";
import DataContext from "../../store/data-context";
import AuthContext from "../../store/auth-context";

const MainNavigation = (props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [userIconFeedback, setUserIconFeedback] = useState(null);
  const dataCtx = useContext(DataContext);
  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handlerUserIconFeedback = () => {
    setUserIconFeedback("Welcome to your profile!");
  };

  useEffect(() => {
    if (userIconFeedback !== "") {
      const timer = setTimeout(() => {
        setUserIconFeedback(null);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [userIconFeedback]);

  return (
    <Fragment>
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
                {!isLoggedIn ? (
                  <NavLink to="auth" activeClassName={classes.active}>
                    <HiOutlineUser className={classes.userIcon}></HiOutlineUser>
                  </NavLink>
                ) : (
                  <NavLink to="profile" activeClassName={classes.active}>
                    <HiOutlineUser
                      className={classes.userIcon2}
                      onClick={handlerUserIconFeedback}
                    ></HiOutlineUser>
                  </NavLink>
                )}
              </li>
              {userIconFeedback && (
                <p className={classes.userFeedback}>{userIconFeedback}</p>
              )}

              <button className={classes.button} onClick={props.onClick}>
                <HiOutlineShoppingCart></HiOutlineShoppingCart>
                <span className={classes.badge}>{dataCtx.totalAmount}</span>
              </button>
            </div>
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};

export default MainNavigation;
