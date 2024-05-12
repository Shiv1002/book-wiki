import React, { Component } from "react";
import { Link, Outlet } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Nav.css";
import { User } from "./Layout/icons";
import { Toaster } from "react-hot-toast";
class NavBar extends Component {
  constructor(props) {
    super(props);

    const e = props.state.books;
    this.state = {
      ebook: e,
      genres: props.genre,
      navCat: [],
      user: props.state.user,
      showProfileCard: false,
    };
  }
  navCat = [];

  //need to add as to derive state from props
  static getDerivedStateFromProps(props, state) {
    state.ebook = props.state.books;
    state.genres = props.genre;
    state.user = props.state.user;
    return state;
  }

  componentDidMount() {
    // // for(var i =0;i<5;i++){
    // //   console.log(this.state.genres[i])
    // //   this.navCat.push((<li className="nav-item" key={this.state.genres[i]}>
    // //   <Link className="nav-link" to={encodeURIComponent(this.state.genres[i])} >{this.state.genres[i]}</Link>
    // // </li>))
    // }
    let navItem = document.getElementsByClassName("nav-item");
    for (var ele of navItem) {
      ele.addEventListener("click", function (event) {
        document.getElementById("navbarCollapse").classList.toggle("show");
      });
    }

    console.log("mounting navbar");
  }
  componentDidUpdate() {
    // console.log("updation occured!");
  }

  render() {
    return (
      <>
        <Toaster position="top-center" />
        <nav className="navbar navbar-expand-sm ">
          <button
            id="navToggler"
            type="button"
            className="navbar-toggler bg-light"
            data-bs-toggle="collapse"
            onClick={() => console.log("clicked")}
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarCollapse" className="collapse navbar-collapse">
            <ul
              className="nav nav-pills navbar-nav d-flex"
              style={{ width: "100%" }}
            >
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              {
                (this.navCat = this.state.genres.slice(0, 4).map((ele) => (
                  <li className="nav-item" key={ele}>
                    <Link className="nav-link" to={encodeURIComponent(ele)}>
                      {ele}
                    </Link>
                  </li>
                )))
              }
              <li className="nav-item ms">
                <Link className="nav-link " to="#??">
                  about
                </Link>
              </li>

              {/* bootstrap classes */}
              {/* {property}{sides}-{breakpoint}-{size} */}

              <li
                className="nav-item ms-sm-auto "
                style={{
                  zIndex: 3,
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                }}
              >
                {this.state.user.email ? (
                  <div
                    className="profile-show  position-relative "
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                    onMouseEnter={() => {
                      this.setState({ showProfileCard: true });
                      // console.log(this.state.showProfileCard);
                    }}
                    onMouseLeave={() => {
                      setTimeout(
                        () =>
                          this.setState({
                            showProfileCard: false,
                          }),
                        0
                      );
                    }}
                  >
                    <User fill="white" />
                    <div
                      className="pro-show d-flex flex-column  bg-transparent"
                      style={
                        this.state.showProfileCard
                          ? // true
                            {
                              translate: "0 1rem",
                              opacity: 1,
                            }
                          : {
                              // display: "none",
                              translate: "0 -5rem",
                              opacity: 0,
                            }
                      }
                    >
                      <div className="bg-white d-flex flex-column">
                        <Link to="/Profile" className="">
                          Profile
                        </Link>

                        <button
                          className="  border-0 "
                          onClick={() => {
                            this.props.dispatch({ type: "resetUser" });
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link className="nav-link " to="/Login">
                    login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </nav>

        <Outlet />
      </>
    );
  }
}

export default NavBar;
