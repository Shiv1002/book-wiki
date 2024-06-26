import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const style = {
  textEle: {
    margin: "0px",
    color: "white",
    textAlign: "center",
    fontFamily: "Carter One, cursive",
  },
  h1: {
    fontSize: "10rem",
    fontFamily: "DynaPuff, cursive ",
    textShadow: "6px 6px 10px #000000b3",
  },
  h2: { fontSize: "1.7rem", margin: "16px" },
  div: { height: "100vh" },
};

function ErrorPage() {
  // Error page served on invalid urls
  return (
    <div
      style={{
        ...style.div,
        background: `linear-gradient(${90}, rgb(91 0 181), rgb(253 152 0))`,
      }}
    >
      <h1 style={{ ...style.textEle, ...style.h1 }}>404</h1>
      <h2 style={{ ...style.textEle, fontSize: "3rem" }}>ERROR</h2>
      <p style={{ ...style.textEle, ...style.h2 }}>Page Not Found!</p>
      <h2 style={{ ...style.textEle, ...style.h2 }}>
        Seems you Entered Invalid Url or clicked on bad link.
      </h2>
      <p style={{ ...style.textEle, ...style.h2 }}>
        Try{" "}
        <Link className="" aria-current="page" to="/">
          Home
        </Link>
      </p>
    </div>
  );
}

export default ErrorPage;
