import { useHistory } from "react-router-dom";

import { useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./profile.module.css";

const passwordChars = (value) => {
  const regexChars = /[$&+,:;=?@#|'<>.^*()%!-]/;
  return value.match(regexChars) && value.length >= 7;
};

const Profile = () => {
  const [formInputsValidity, setFormInputsValidity] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const { token } = authCtx;

  const formSubmit = (e) => {
    e.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    const enteredPasswordIsValid = passwordChars(enteredNewPassword);

    if (!enteredPasswordIsValid) {
      setFormInputsValidity(false);
      return;
    }

    // add validation
    setIsLoading(true);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDiTdcWv-PzF8u_ILkBy4Re6RkMH5I11-A",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data) {
              errorMessage = "You are already changed the password!";
            }

            setError(errorMessage);
            throw new Error(errorMessage);
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
    setFormInputsValidity(true);
  };

  return (
    <div className={classes.container}>
      <div className={classes.containerImg}>
        <img
          src={process.env.PUBLIC_URL + "img/tigerShirt.jpg"}
          alt="profile img"
        ></img>
        <h2 className={classes.heading}>Change your profile image</h2>
      </div>
      <form className={classes.form} onSubmit={formSubmit}>
        <h2 className={classes.heading}>Change your password</h2>
        <div className={classes["form-control"]}>
          <label htmlFor="new-password">new password</label>
          <input
            type="password"
            id="new-password"
            placeholder="new password"
            minLength="7"
            ref={newPasswordInputRef}
          />
          {error && <p className={classes["error-text"]}>{error}</p>}
          {!formInputsValidity && (
            <p className={classes["error-text"]}>
              Your password must have one special char!
            </p>
          )}
        </div>
        <div className={classes.actions}>
          {isLoading && <p>Sending request...</p>}
          <button type="submit">Change password</button>
        </div>
      </form>
    </div>
  );
};
export default Profile;
