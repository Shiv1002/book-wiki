import React from "react";
import noImage from "./BookThumbnail/No Image.jpg";
import "./profile.css";
import { Navigate } from "react-router-dom";
import Library from "./Library";
export default function Profile(props) {
  const { state, dispatch } = props;
  return !state.user.email ? (
    <Navigate to="/" replace />
  ) : (
    <div className="container d-flex">
      <div className=" profile-data  d-flex flex-column">
        <div className="profile-pic d-flex flex-column align-items-center box-border">
          <img
            style={{
              borderRadius: "50%",
              boxShadow: "1px 2px 12px 0px",
            }}
            className="rounded-50"
            id="emailImg"
            src={state.user.profileImg || noImage}
            alt=""
          />
          <span className="fs-2"> {state.user.email} </span>
        </div>

        <div className="d-grid align-items-center ">
          <button
            className="buttn bg-primary"
            onClick={() => {
              dispatch({ type: "resetUser" });
            }}
          >
            LogOut
          </button>
        </div>
      </div>

      <div className="fav-books border border-1 flex-grow-1 fs-2 d-flex flex-column">
        <span className="fs-3">Library</span>
        <Library {...props} />
      </div>
    </div>
  );
}
