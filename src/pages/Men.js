import { useContext } from "react";
import Context from "../helpers/Context";
import DataContext from "../store/data-context";
import classes from "./AllPages.module.css";
const MenPage = (props) => {
  const dataCtx = useContext(DataContext);

  return (
    <div>
      <h2 className={classes.heading}>Men</h2>
      <Context data={dataCtx.menRender} />
    </div>
  );
};

export default MenPage;
