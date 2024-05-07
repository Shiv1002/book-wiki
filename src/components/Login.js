import React, { useState } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import toast, { Toaster } from "react-hot-toast";
import auth from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";
import "./Login.css";
function Subcribers({ user, setUser }) {
  const [state, setState] = useState({
    emailError: "",
    passError: "",
    email: "",
    password: "",
  });

  const login = useGoogleLogin({
    onSuccess: (userCredential) => fetchUserData(userCredential),
    onError: (err) => console.log(err),
    onNonOAuthError: (e) => console.log(e),
  });

  function cleanInputs() {}

  const handleInput = (e) => {
    setState({ emailError: "", passError: "" });
    setState({ [e.target.name]: e.target.value }, () =>
      console.log(e.target.name, e.target.value)
    );
  };

  function fetchUserData(userCredential) {
    axios
      .get("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: { Authorization: `Bearer ${userCredential.access_token}` },
      })
      .then((d) => console.log(d))
      .catch((e) => console.log(e));
  }

  function signInWithFirebase(e) {
    if (!state.email || !state.password) {
      toast.error("Email,Password cannot be empty");
      return;
    }
    e.preventDefault();
    signInWithEmailAndPassword(auth, state.email, state.password)
      .then((userCred) => {
        console.log(userCred.user.uid);
        //set user
        setUser(userCred.user.email);
        localStorage.setItem("loginEmail", userCred.user.email);
        cleanInputs();
      })
      .catch((err) => {
        console.log(err);
        switch (err.code) {
          case "auth/invalid-email":
            setState({ emailError: "Invalid Email" });
            break;
          case "auth/user-disabled":
            console.log("Permission blocked");
            break;
          case "auth/user-not-found":
            setState({ emailError: "No account found" });
            break;
          case "auth/wrong-password":
            setState({ passError: "Wrong password" });
            break;
          default:
        }
      });
  }

  function signUpWithFireBase() {
    createUserWithEmailAndPassword(auth, state.email, state.password)
      .then((userCred) => {
        console.log("creating user", userCred.user.uid);
        //setUser
        setUser(userCred.user.email);
        cleanInputs();
      })
      .catch((err) => console.log(err));
  }

  const handleSuccess = (googledata) => {
    // setState({ email: googledata.profileObj.email });
    // localStorage.setItem("loginName", googledata.profileObj.name);
    // localStorage.setItem("loginEmail", googledata.profileObj.email);
    // localStorage.setItem("imageUrl", googledata.profileObj.imageUrl);
    console.log(googledata);
  };

  function handleLogout() {
    setUser();
    console.log("Logged out successfully");
    cleanInputs();
    localStorage.setItem("loginName", "");
    localStorage.setItem("loginEmail", "");
    localStorage.setItem("imageUrl", null);
  }

  return (
    <div className="login">
      <Toaster position="middle" />
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          {/* working */}
          <table>
            {!state.email ? (
              <tbody>
                <tr>
                  <th>
                    <h2>Login account</h2>
                  </th>
                </tr>

                <tr>
                  <td>
                    <input
                      className="form-control user"
                      name="email"
                      type="email"
                      id="email"
                      required
                      placeholder="Enter Email Address here!"
                      value={state.email}
                      onChange={(e) => handleInput(e)}
                    />
                  </td>
                  {state.emailError ? (
                    <td>
                      <span className="authError">{state.emailError}</span>
                    </td>
                  ) : (
                    <></>
                  )}
                </tr>

                <tr>
                  <td>
                    <input
                      className="form-control user"
                      name="password"
                      type="password"
                      id="pwd"
                      placeholder="Enter Password here!"
                      value={state.password}
                      onChange={handleInput}
                      required
                    />
                  </td>
                  {state.passError ? (
                    <td>
                      <span className="authError">{state.passError}</span>
                    </td>
                  ) : (
                    <></>
                  )}
                </tr>
                <tr>
                  <td className="py-0">
                    <p className="labels align-center mx-2 my-2">
                      By signing up you accept our&nbsp;
                      <a className="" href="#">
                        Terms Of Use
                      </a>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td>
                    <button
                      className="buttn "
                      type="submit"
                      onClick={(e) => signInWithFirebase(e)}
                    >
                      login
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      className="buttn "
                      type="submit"
                      onClick={() => signUpWithFireBase()}
                    >
                      sign up
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="py-0">
                    <div className="col-md-12">
                      <div className="login-or">
                        <hr className="hr-or" />
                        <span className="span-or">or Signup with</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div id="logo" className="d-flex">
                      <button onClick={() => login()}>Login</button>

                      <button onClick={() => googleLogout()}>logout</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {localStorage.getItem("loginEmail") !== "" ? (
                  <tr>
                    <td className="User">
                      <h3 className="my-0">
                        You are logged in as{" "}
                        {localStorage.getItem("loginEmail")}
                      </h3>
                    </td>
                  </tr>
                ) : (
                  <></>
                )}

                {localStorage.getItem("imageUrl") !== "null" ? (
                  <tr>
                    <td className="User">
                      <img
                        id="emailImg"
                        src={localStorage.getItem("imageUrl")}
                        alt=""
                      />
                    </td>
                  </tr>
                ) : (
                  <></>
                )}

                <tr>
                  <td>
                    <div id="logo">
                      <button
                        className="buttn bg-primary"
                        onClick={handleLogout}
                      >
                        LogOut
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </form>
      {/* <button className="buttn" style={{ height: " 55px", width: "180px" }} onClick={() => getUser()}>Get Users</button> */}
      <div>
        {/*state.count*/}
        {/* <h2><b><code>Subcribers - {state.count}</code></b></h2> */}
      </div>
    </div>
  );
}

export default Subcribers;
