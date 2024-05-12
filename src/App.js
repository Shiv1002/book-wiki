import "./App.css";
import React from "react";
import { useState, useEffect, useReducer, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import NavBar from "./components/Nav";
import MainFrame from "./components/Main";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";
import BookDiscription from "./components/BookDiscription";
import { initState, reducer } from "./components/Reducers/reducer";
import EbookList from "./components/EbookList";
import SearchBookList from "./components/SearchBookList";
import Profile from "./components/Profile";
import Background from "./components/Background";

function App() {
  const genre = ["Adventure", "Fiction", "Horror", "Literature"];
  const [state, dispatch] = useReducer(reducer, initState);

  //using axios

  useEffect(() => {
    //perform get request
    console.log("useEffect called");
  }, []);

  let genreTabs = useMemo(
    () =>
      genre.map((gen) => {
        // console.log(ele)
        console.log("Gen genres");
        return (
          <Route
            path={encodeURIComponent(gen)}
            key={gen}
            element={
              <EbookList
                key={gen}
                genre={gen}
                state={state}
                dispatch={dispatch}
              />
            }
          />
        );
      }),
    [state.books]
  );

  return (
    <>
      <Router basename="/">
        <Routes>
          <Route
            element={<NavBar state={state} genre={genre} dispatch={dispatch} />}
          >
            <Route
              path="/"
              element={<MainFrame state={state} dispatch={dispatch} />}
            >
              <Route
                index
                element={
                  <>
                    <EbookList
                      key="Adventure"
                      genre="Adventure"
                      state={state}
                      dispatch={dispatch}
                    />
                    {/* <Background /> */}
                  </>
                }
              ></Route>

              {genreTabs}

              <Route
                path="search/:term"
                element={
                  <SearchBookList
                    key="search"
                    state={state}
                    dispatch={dispatch}
                  />
                }
              />
              <Route path="book/:id" element={<BookDiscription />} />
            </Route>
            <Route
              path="Login"
              element={<Login state={state} dispatch={dispatch} />}
            />
            {/* <Route path="AddBook" element={<AddBook />} /> */}
            <Route
              path="/profile"
              element={<Profile state={state} dispatch={dispatch} />}
            />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <div
          className=""
          style={
            {
              // height:
              //   document.getElementById("ebook-list")?.scrollHeight || "100dvh",
              // top: 0,
            }
          }
        ></div>
      </Router>
    </>
  );
}
function ChildWithAnimation({ children }) {
  return (
    <>
      {children}
      <Background />
    </>
  );
}

export default App;
