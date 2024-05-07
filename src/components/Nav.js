import React, { Component } from "react";
import { Link, Outlet } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Nav.css";
class NavBar extends Component {
  constructor(props) {
    super(props);

    const e = props.ebook;

    this.state = {
      // word is holder of term being searched
      word: "",
      ebook: e,
      genres: null,
      nameList: e.map((x) => x.Name),
      AuthorList: e.map((x) => x.Author),
      PublisherList: e.map((x) => x.Publisher),
      navCat: [],
    };
  }
  navCat = [];

  static getDerivedStateFromProps(props, state) {
    state.ebook = props.ebook;
    state.genres = props.genre;

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
  }

  inputHandler = (event) => {
    console.log("Event is fired");
    this.setState({
      word: event.target.value,
    });
  };

  Search(x) {
    // x is state word
    // all objects in ebook  this.state.ebook.map((ele)=>console.log(ele))

    let target = this.state.word;
    const result = this.state.ebook.filter((book) => {
      let index = book.srno;

      // console.log(target,book)
      if (
        target === book.Name ||
        target === book.Author ||
        target === book.Publisher
      ) {
        //
        console.log(
          target + " is matched with index " + index + " of booklist "
        );
        return true;
      } else return false;
    });
    // list of book found after search

    result.map((ob) => console.log(ob));

    //getting list of filtered indexes
    const noList = result.reduce((acc, ele) => {
      acc.push(ele.srno);
      return acc;
    }, []);

    //check for empty list
    if (noList.length === 0) {
      alert("No Search results!!");
    } else {
      alert(`Searched one is present at ${noList}`);
    }
  }

  //search end

  submit = (event) => {
    this.Search(this.state.word);
    //to stop reloadinng of paage
    event.preventDefault();
  };

  searchBook = () => {};

  render() {
    return (
      <>
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

              {/* bootstrap classes */}
              {/* {property}{sides}-{breakpoint}-{size} */}
              <li className="nav-item ms-sm-auto">
                <Link className="nav-link " to="/Login">
                  login
                </Link>
              </li>
              <li className="nav-item ms-0">
                <Link className="nav-link " to="#??">
                  about
                </Link>
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
