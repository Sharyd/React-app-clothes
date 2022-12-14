import { Fragment } from "react";
import Profile from "../components/auth/profile";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { HiLogout } from "react-icons/hi";
import classes from "./AllPages.module.css";
import AuthContext from "../store/auth-context";
import DataContext from "../store/data-context";
const ProfilePage = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const datactx = useContext(DataContext);
  const { setDataToNull } = datactx;

  const logoutHandler = () => {
    authCtx.logout();
    setDataToNull();
    history.push("/auth");
  };
  return (
    <Fragment>
      <div className={classes.container}>
        <h2 className={classes.headingLine}>Your Profile</h2>
        <div className={classes.containerTwo}>
          {isLoggedIn && (
            <Fragment>
              <HiLogout
                className={classes.logout}
                onClick={logoutHandler}
              ></HiLogout>
              <span className={classes.logoutText}>logout</span>
            </Fragment>
          )}
        </div>
      </div>
      <Profile />
    </Fragment>
  );
};

export default ProfilePage;
