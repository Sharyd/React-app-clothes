import { useContext } from "react";
import DataContext from "../store/data-context";
import Context from "../helpers/Context";
import classes from "./AllPages.module.css";
const WomenPage = (props) => {
  const dataCtx = useContext(DataContext);

  return (
    <div>
      <h2 className={classes.heading}>Women</h2>
      <Context data={dataCtx.womenRender} />
    </div>
  );
};

export default WomenPage;
