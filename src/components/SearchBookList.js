import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import Header from "./header";
import Ebook from "./ebook";
import { fetchGenreBooks, fetchSearchBooks } from "./Actions/actions";
import { useParams } from "react-router-dom";
export default function SearchBookList({ state, dispatch }) {
  const params = useParams();
  const booklist = state.books
    .filter(
      (book) =>
        book.volumeInfo.maturityRating === "NOT_MATURE" &&
        book.volumeInfo.imageLinks
    )
    .map((book) => <Ebook key={book.id} ebook={book} />);

  useEffect(() => {
    console.log(params, "loading");
    setIsLoading(true);
    fetchSearchBooks(params.term)
      .then((data) => {
        dispatch({ type: "setBooks", payload: data });
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });

    setIsLoading(false);
  }, []);
  //

  // const [booklist, setBookList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="row">
      <div className="col position-absolute [bg-primary]">
        {isLoading ? (
          <div className="text-center my-5">
            <CircularProgress style={{ color: "#fff" }} />
            <h3 className="text-white">Loading...</h3>
          </div>
        ) : booklist.length > 0 ? (
          <>
            <Header title={params.term} total={booklist.length} />
            <div className="d-flex flex-wrap justify-content-center">
              {booklist}
            </div>
          </>
        ) : (
          <div>No Books found</div>
        )}
      </div>
    </div>
  );
}
