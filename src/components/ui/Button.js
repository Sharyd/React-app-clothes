import classes from "./Button.module.css";

const Button = (props, ref) => {
  return <button className={classes.button}>{props.children}</button>;
};

export default Button;
