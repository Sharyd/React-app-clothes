import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
const Layout = (props) => {
  return (
    <div>
      <MainNavigation onClick={props.onClick} />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};

export default Layout;
