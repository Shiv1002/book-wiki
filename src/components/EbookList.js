import React, { useState, useEffect, Suspense } from "react";
import { CircularProgress } from "@mui/material";
import Header from "./header";
import Ebook from "./ebook";
import { fetchGenreBooks } from "./Actions/actions";
export default function EbookList({ genre, state, dispatch }) {
  const booklist = state.books
    .filter(
      (book) =>
        book.volumeInfo.maturityRating == "NOT_MATURE" &&
        book.volumeInfo.imageLinks
    )
    .map((book) => <Ebook key={book.id} ebook={book} />);

  useEffect(() => {
    console.log(genre, "loading");
    setIsLoading(true);
    fetchGenreBooks(genre)
      .then((data) => {
        // onPropsChange(data);
        console.log(data);
        dispatch({ type: "setBooks", payload: data });
        // onPropsChange(data);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));

    setIsLoading(false);
  }, []);
  //

  // const [booklist, setBookList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="row">
      <div className="col position-absolute [bg-primary] w-100">
        {isLoading ? (
          <div className="text-center my-5">
            <CircularProgress style={{ color: "#fff" }} />
            <h3 className="text-white">Loading...</h3>
          </div>
        ) : booklist.length > 0 ? (
          <>
            <Header title={genre} total={booklist.length} />

            <div className="d-flex flex-wrap justify-content-center">
              {booklist}
            </div>
          </>
        ) : (
          <div className="d-flex justify-content-center text-white fs-2 fw-normal">
            <span className="">No Books found!!</span>
          </div>
        )}
      </div>
    </div>
  );
}
