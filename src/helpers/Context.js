import ClothesList from "../components/clothes/ClothesList";
const Context = (props) => {
  let content;
  if (props.data.length === 0) {
    content = <p>You are without Content! Please try to reload page</p>;
  } else {
    content = <ClothesList clothes={props.data} />;
  }
  return <div>{content}</div>;
};

export default Context;
