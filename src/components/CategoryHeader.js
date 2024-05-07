import React from "react";

const Header = (props) => {
  const { title, total } = props;
  const style = {
    backgroundColor: "#6c0000",
    color: "white",
    width: "fit-content",
    border: "1px solid #fffefe",
    borderRadius: "1rem",
    fontFamily: "Kaushan Script",
    fontSize: "1.4rem",
    padding: "0.5rem",
    margin: "0px auto",
  };
  return (
    <h1
      id="list-num-header"
      className="text-center px-5 my-3 font-link"
      style={style}
    >
      {title}-{total}
    </h1>
  );
};

export default Header;
