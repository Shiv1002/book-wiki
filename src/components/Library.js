import React, { useEffect, useState } from "react";
import {
  ReadUserData,
  RemoveUserDataFavBooks,
} from "./Actions/firebase-actions";
import { Spinner } from "react-bootstrap";
import { ReadUserFavBooks, fetchGenreBooks } from "./Actions/actions";
import noImage from "./BookThumbnail/No Image.jpg";
import Ebook from "./ebook";
import { toast, Toaster } from "react-hot-toast";
import { ArrowDown } from "./Layout/icons";
import { Link } from "react-router-dom";

export default function Library({ state, dispatch }) {
  const [isLoading, setIsLoading] = useState(false);
  const [favBookLinks, setFavBookLinks] = useState(state.user.favBooks);
  const [favBooks, setFavBooks] = useState([]);

  console.log(favBooks);
  useEffect(() => {
    // read user data from firestore to update favbook links in localhost
    setIsLoading(true);
    ReadUserData(state.user.email)
      .then((d) => {
        console.log(d);
        setFavBookLinks(d.favBooks);
        dispatch({
          type: "setUser",
          payload: { ...state.user, favBooks: d.favBooks },
        });
      })
      .catch((e) => console.log("Error Occured!!", e))
      .finally(() => setIsLoading(false));
    // // fetchGenreBooks("").then((rs) => setFavBooks(rs));
  }, []);

  useEffect(() => {
    if (!favBookLinks.length) return;
    console.log("load");
    setIsLoading(true);
    ReadUserFavBooks(favBookLinks)
      .then((data) => {
        console.log(data);
        setFavBooks(data);
      })
      .catch((e) => {
        console.log("Error Occured", e);
      })
      .finally(() => setIsLoading(false));
  }, [favBookLinks]);

  if (isLoading)
    return (
      <div className="m-auto">
        {" "}
        <Spinner />{" "}
      </div>
    );
  if (!isLoading && !favBooks.length)
    return <div className="fs-2">Your Library is Empty!</div>;

  return (
    <>
      <FavList list={favBooks} state={state} dispatch={dispatch} />
    </>
  );
}

const FavList = ({ list, state, dispatch }) => {
  const [isToggledBook, setToggleBook] = useState(
    Array(list.length).fill(false)
  );
  return (
    <>
      <div
        className="library text-black  flex-grow-1 p-1  position-relative "
        style={{ overflowY: "scroll" }}
      >
        {list.map(
          (book, index) =>
            book && (
              <div
                key={book.id}
                style={{ height: "10vh", width: "100%", borderRadius: "1rem" }}
                className="d-flex  border border-2 justify-items-around my-2 p-1"
              >
                {}
                <img
                  src={
                    book.volumeInfo.imageLinks
                      ? book.volumeInfo.imageLinks.smallThumbnail
                      : noImage
                  }
                  style={{ height: "6vh", borderRadius: "50%", width: "3rem" }}
                  className="m-auto "
                />

                <div
                  className="d-flex flex-column px-2"
                  style={{ width: "90%" }}
                >
                  <span className="fs-5">{book.volumeInfo.title}</span>
                  <span className="fs-6">{book.volumeInfo.description}</span>
                </div>

                <div className="user-option position-absolute end-0">
                  <button
                    className="buttn bg-transparent text-black border-0"
                    onClick={() =>
                      setToggleBook(
                        isToggledBook.map((it, ind) => {
                          if (ind !== index) return false;
                          return !it;
                        })
                      )
                    }
                    onBlur={() => {
                      if (isToggledBook[index]) {
                        //set timer to allow click in side of div before it vanishes
                        setTimeout(
                          () => setToggleBook(Array(list.length).fill(false)),
                          500
                        );
                      }
                    }}
                  >
                    <ArrowDown />

                    {isToggledBook[index] && (
                      <div
                        className="bg-white border border-1 border-black rounded-4 position-absolute bottom-0 "
                        style={{
                          translate: "-90% 100%",
                          zIndex: 1,
                          overflow: "hidden",
                        }}
                      >
                        <div className="toggle-option">
                          {/* btn/  */}
                          <div
                            onClick={() => {
                              RemoveUserDataFavBooks(
                                state.user.email,
                                book.selfLink
                              ).then((data) => {
                                console.log(data);
                                console.log(
                                  state.user.favBooks.filter(
                                    (links) => links !== book.selfLink
                                  )
                                );
                                dispatch({
                                  type: "setUser",
                                  payload: {
                                    ...state.user,
                                    favBooks: state.user.favBooks.filter(
                                      (links) => links !== book.selfLink
                                    ),
                                  },
                                });
                                if (data.status === "success")
                                  toast.success("Removed from favorites!");
                              });
                            }}
                          >
                            Remove from favorites
                          </div>
                          <div>
                            <Link to={`/book/${book.id}`} state={book}>
                              Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
};

const FavBook = ({ book }) => {
  return <></>;
};
