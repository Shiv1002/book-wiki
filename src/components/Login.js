import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import toast, { Toaster } from "react-hot-toast";
import {
  CreateUserData,
  LoginWithFirebase,
  SignupWithFirebase,
} from "./Actions/firebase-actions";
import axios from "axios";
import "./Login.css";
import { Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Background from "./Background";
import { GoogleIcon } from "./Layout/icons";
const initState = {
  email: "",
  password: "",
};

function Login({ state, dispatch }) {
  const [inputState, setInputState] = useState(initState);
  const [isLoading, setIsLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (userCredential) => fetchUserData(userCredential),
    onError: (err) => console.log(err),
    onNonOAuthError: (e) => console.log(e),
  });

  function cleanInputs() {
    setInputState(initState);
  }

  const handleInput = (e) => {
    console.log("Changing");
    console.log(e.target.name, e.target.value);
    setInputState({ ...inputState, emailError: "", passError: "" });

    setInputState({ ...inputState, [e.target.name]: e.target.value });
    console.log(inputState);
  };

  const setProfile = (res) => {
    toast.success("User logged!");
    dispatch({
      type: "setUser",
      payload: { email: res.email, profileImg: res.picture },
    });
    cleanInputs();
  };

  function fetchUserData(userCredential) {
    axios
      .get("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: { Authorization: `Bearer ${userCredential.access_token}` },
      })
      .then((res) => {
        setProfile(res.data);
        // dispatch({
        //   type: "setUser",
        //   payload: { email: res.data.email, profileImg: res.data.picture },
        // });
        // console.log(d)
      })
      .catch((e) => console.log(e));
  }

  function signInWithFirebase(e) {
    if (!inputState.email || !inputState.password) {
      toast.error("Email or Password cannot be empty");
      return;
    }

    e.preventDefault();
    setIsLoading(true);

    LoginWithFirebase(inputState.email, inputState.password)
      .then((user) => {
        setProfile(user);

        // dispatch({ type: "setUser", payload: { email: user.email } });
        // toast.success("User Logged!!");
        // cleanInputs();
      })
      .catch((e) => {
        toast.error(e);
      })
      .finally(() => setIsLoading(false));
  }

  function signUpWithFireBase() {
    if (!inputState.email || !inputState.password) {
      toast.error("Email or Password cannot be empty");
      return;
    }
    setIsLoading(true);
    SignupWithFirebase(inputState.email, inputState.password)
      .then((user) => {
        setProfile(user);
      })
      .catch((e) => {
        toast.error(e);
      })
      .finally(() => setIsLoading(false));
  }

  const handleSuccess = (googledata) => {
    // setInputState({ email: googledata.profileObj.email });
    // localStorage.setItem("loginName", googledata.profileObj.name);
    // localStorage.setItem("loginEmail", googledata.profileObj.email);
    // localStorage.setItem("imageUrl", googledata.profileObj.imageUrl);
    console.log(googledata);
  };

  function handleLogout() {
    // setUser();
    console.log("Logged out successfully");
    cleanInputs();
    dispatch({ type: "resetUser" });
    toast.success("User Logged Out!!");
  }

  return (
    <div className="login">
      <form onSubmit={(e) => e.preventDefault()}>
        {/* working */}

        {!state.user.email ? (
          isLoading ? (
            <div className="m-auto">
              {" "}
              <Spinner />{" "}
            </div>
          ) : (
            <div className="input-form ">
              <h2 className="mb-4">Login account</h2>

              <div className=" flex-grow-1  d-flex flex-column ">
                <div className="mb-4">
                  <div className="px-2 ">
                    <input
                      className="form-control user"
                      name="email"
                      type="email"
                      id="email"
                      required
                      placeholder="Enter Email Address here!"
                      value={inputState.email}
                      onChange={handleInput}
                    />

                    <input
                      className="form-control user"
                      name="password"
                      type="password"
                      id="pwd"
                      placeholder="Enter Password here!"
                      value={inputState.password}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <p className="labels align-center mx-2 my-2">
                    By signing up you accept our&nbsp;
                    <a className="" href="#">
                      Terms Of Use
                    </a>
                  </p>
                  <div className="d-flex justify-content-evenly">
                    <button
                      className="buttn "
                      type="submit"
                      onClick={(e) => signInWithFirebase(e)}
                    >
                      login
                    </button>

                    <button
                      className="buttn "
                      type="submit"
                      onClick={() => signUpWithFireBase()}
                    >
                      sign up
                    </button>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="login-or">
                    <hr className="hr-or" />
                    <span className="span-or">or Signup with</span>
                  </div>
                </div>

                <div id="logo" className="d-flex mt-4">
                  <button
                    onClick={() => login()}
                    className="d-flex align-items-center"
                  >
                    <span>Login with</span> <GoogleIcon fill="darkred" />
                  </button>
                </div>
              </div>
            </div>
          )
        ) : (
          <Navigate to="/Profile" replace={true} />
          // <Profile state={state} dispatch={dispatch} />
        )}
      </form>
      <Background />
    </div>
  );
}

export default Login;
