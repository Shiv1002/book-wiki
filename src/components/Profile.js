import React from "react";
import noImage from "./BookThumbnail/No Image.jpg";
import "./profile.css";
import { Navigate } from "react-router-dom";
import Library from "./Library";
import { User } from "./Layout/icons";
export default function Profile(props) {
  const { state, dispatch } = props;
  return !state.user.email ? (
    <Navigate to="/" replace />
  ) : (
    <div className="container rounded-5 d-flex flex-column flex-lg-row m-5 mx-auto">
      <div className=" profile-data  d-flex flex-column ">
        <div className="profile-pic d-flex flex-column  align-items-center box-border p-5">
          {state.user.profileImg ? (
            <img
              style={{
                borderRadius: "50%",
                boxShadow: "1px 2px 12px 0px",
              }}
              className="rounded-50"
              id="emailImg"
              src={state.user.profileImg}
              alt=""
            />
          ) : (
            <div
              className="d-flex  flex-grow-1 justify-content-center"
              style={{ width: "100%", height: "60%" }}
            >
              <User className="icon" fill="black" height="100" width="100" />
            </div>
          )}

          <span className="fs-2"> {state.user.email} </span>
        </div>

        <div className="  text-center">
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

      <div
        className="fav-books  flex-grow-1 fs-2 d-flex flex-column"
        style={{
          borderLeft: "1px solid #bdbdbd",
          paddingLeft: "1rem",
        }}
      >
        <div className="fs-2 fs-bold">Library</div>
        {/* <hr />s */}
        <Library {...props} />
      </div>
    </div>
  );
}
