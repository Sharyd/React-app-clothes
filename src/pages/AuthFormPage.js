import { Fragment } from "react";
import AuthForm from "../components/auth/AuthForm";
import classes from "./AllPages.module.css";

const AuthFormPage = () => {
  return (
    <Fragment>
      <h2 className={classes.heading}>Sign up and get special prices!!</h2>
      <AuthForm />
    </Fragment>
  );
};

export default AuthFormPage;
