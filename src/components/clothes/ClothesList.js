import ClothesItem from "./ClothesItem";
import classes from "./ClothesList.module.css";
const ClothesList = (props) => {
  return (
    <ul className={classes.list}>
      {props.clothes.map((cloth) => (
        <ClothesItem
          key={cloth.id}
          id={cloth.id}
          image={cloth.image}
          title={cloth.title}
          price={cloth.price}
        />
      ))}
    </ul>
  );
};

export default ClothesList;
