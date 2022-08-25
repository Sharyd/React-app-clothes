import { useContext } from "react";
import DataContext from "../store/data-context";

import Context from "../helpers/Context";
import classes from "./AllPages.module.css";
const AllClothesPage = (props) => {
  const { allClothes } = useContext(DataContext);
  return (
    <div>
      <h2 className={classes.heading}>All Clothes</h2>
      <Context data={allClothes} />
    </div>
  );
};

export default AllClothesPage;
