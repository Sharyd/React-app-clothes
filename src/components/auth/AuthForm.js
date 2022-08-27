import { useContext, useState } from "react";
import classes from "./AuthForm.module.css";
import useInput from "../../hooks/use-input";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const passwordChars = (value) => {
  const regexChars = /[$&+,:;=?@#|'<>.^*()%!-]/;
  return value.match(regexChars) && value.length >= 7;
};
const includesFunction = (value) => {
  let regexDomains = /\.\b\w{2,5}\b/; // regex checking if they are last 2 or 3 char in domain
  // let domainCz = "cz";
  // let domainCom = "com";

  return value.match(regexDomains);
};

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput(
    (value) =>
      value.trim() !== "" && includesFunction(value) && value.includes("@")
  );

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "" && passwordChars(value));

  let formIsValid = false;

  if (enteredPasswordIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    resetPasswordInput();
    resetEmailInput();

    setIsLoading(true);

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDiTdcWv-PzF8u_ILkBy4Re6RkMH5I11-A";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDiTdcWv-PzF8u_ILkBy4Re6RkMH5I11-A";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      header: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data) {
              errorMessage = "User exist!";
            }

            setError(errorMessage);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        authCtx.login(data.idToken, Date.now() + data.expiresIn * 1000);
        history.replace("/");
        setError(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // const passwordInputClasses = `${passwordInputHasError
  //   ? {{classes.invalid}}
  //   : classes["form-control"]};`
  // const emailInputClasses = emailInputHasError
  //   ? "form-control invalid"
  //   : "form-control";

  return (
    <section className={classes.auth}>
      <div className={classes.loginContainer}>
        <h1>{isLogin ? "Login" : "SignUp"}</h1>
      </div>

      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.containerContent}>
          <div
            className={`${classes["form-control"]} ${
              emailInputHasError && classes.invalid
            }`}
          >
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              placeholder="email"
              onChange={emailChangeHandler}
              onBlur={emailInputBlurHandler}
              required
              value={enteredEmail}
            />
            {emailInputHasError && (
              <p className={classes["error-text"]}>Enter a valid email</p>
            )}
          </div>

          <div
            className={`${classes["form-control"]} ${
              passwordInputHasError && classes.invalid
            }`}
          >
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              required
              value={enteredPassword}
            />
            {passwordInputHasError && (
              <p className={classes["error-text"]}>
                Enter a valid password! <br></br>(one special char, min length
                7)
              </p>
            )}
          </div>
          <div className={classes.actions}>
            {!isLoading && (
              <button>{isLogin ? "Login" : "Create Account"}</button>
            )}
            {isLoading && <p>Sending request...</p>}
            {error && (
              <p className={classes["error-text"]}>{error} Try again.</p>
            )}

            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
