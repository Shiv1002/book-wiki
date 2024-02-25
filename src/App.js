import "./App.css";
import React, { Suspense } from "react";
import { useState, useEffect, useReducer, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import NavBar from "./components/Nav";
import MainFrame from "./components/Main";
import Subcribers from "./components/Subcribers";
import ErrorPage from "./components/ErrorPage";
import BookDiscription from "./components/BookDiscription";
import AddBook from "./components/addBook";
import { initState, reducer } from "./components/Reducers/reducer";
import { fetchAdventureBooks } from "./components/Actions/actions";
import axios from "axios";
import EbookList from "./components/EbookList";
import SearchBookList from "./components/SearchBookList";

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
          <Route element={<NavBar ebook={state.books} genre={genre} />}>
            <Route
              path="/"
              element={
                <Suspense fallback={<h1 className="fs-1">h2lllll</h1>}>
                  <MainFrame state={state} dispatch={dispatch} />
                </Suspense>
              }
            >
              <Route
                index
                element={
                  <EbookList
                    key="Adventure"
                    genre="Adventure"
                    state={state}
                    dispatch={dispatch}
                  />
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
              <Route
                path="book/:id"
                element={<BookDiscription ebook={state.books} />}
              />
            </Route>
            <Route
              path="Subscribe"
              element={<Subcribers state={state} dispatch={dispatch} />}
            />
            {/* <Route path="AddBook" element={<AddBook />} /> */}
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <div className="user-logo bg-black rounded">
          {/* {state.user.email ? (
            <span className="text-light">{state.user.email}</span>
          ) : (
            <Link
              className="btn text-light fw-semibold rounded-2 fs-5 shadow-none"
              to="/Subscribe"
            >
              Login
            </Link>
          )} */}
        </div>
      </Router>
    </>
  );
}

export default App;
