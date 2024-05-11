import React from "react";
import { useLocation, useParams } from "react-router-dom";
import noImage from "./BookThumbnail/No Image.jpg";
import Ratings from "./Layout/ratingStars";
import Notfound from "./svg/not_found.svg";
function BookDiscription() {
  let ebook = useLocation().state;

  const currBook = ebook;

  const volumeInfo = currBook.volumeInfo;

  // id of 0
  // {srno: 1, Name: 'Harry Potter', Thumbnail: '', Author: 'J.K. Rowling', Genre: 'Fantasy', …}
  // Author: "J.K. Rowling"
  // Description: "Harry Potter is a series of seven fantssy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic and subjugate all wizards and Muggles (non-magical people)."
  // Genre: "Fantasy"
  // Name: "Harry Potter"
  // Publisher: "Bloomsbury Publishing(UK)"
  // Thumbnail: ""
  // link: "https://www.goodreads.com/book/show/1885.Pride_and_Prejudice?ac=1&from_search=true&qid=qvieLlISY0&rank=2"
  // srno: 1

  // const halfstar = '\u2BEA'

  const imageError = (event) => {
    event.target.src = noImage;
  };

  return (
    <div className="p-1">
      {currBook ? (
        <div
          className="book-desc  col-lg-6 col-md-8 col-sm-10 col-xs-8 mx-auto my-3 p-1 "
          style={{
            border: "0px solid black",
            borderRadius: "20px",
            padding: "10px",
            boxShadow: "black 1px 2px 20px 5px",
            fontSize: "1rem",
            fontFamily: "Exo, sans-serif",
            fontWeight: "500",
            // margin: "2rem auto",
            // background:"blue",
          }}
        >
          <div
            className="m-3 book-meta"
            style={{
              display: "flex",
            }}
          >
            <div className="d-flex flex-column align-items-center position-relative">
              {/* {currBook.maturityRating === "MATURE"?
                <span className='position-absolute top-0 start-0  p-1 bg-danger text-light rounded-circle translate-middle m-2'>18+</span>:null } */}

              <img
                className="img img-desc m-2"
                alt={volumeInfo.title}
                onError={imageError}
                src={
                  volumeInfo.imageLinks
                    ? volumeInfo.imageLinks.thumbnail ?? noImage
                    : noImage
                }
              />
            </div>

            <div className="book-head m-2">
              <p>
                <strong> Name </strong>: {volumeInfo.title}
              </p>
              <p>
                <strong>Author</strong> :{" "}
                {volumeInfo.authors !== undefined ??
                  volumeInfo.authors.map((auth) => {
                    return auth + ". ";
                  })}
              </p>
              <p>
                <strong>Genres</strong>:{" "}
                {volumeInfo.categories
                  ? volumeInfo.categories.map((cat) => {
                      return cat + ". ";
                    })
                  : "---"}
              </p>
              <p>
                <strong>Publisher</strong>: {volumeInfo.publisher ?? ""}{" "}
                {`(${volumeInfo.publishedDate})` ?? "---"}
              </p>
              <p>
                <strong>Rating</strong>:
                <span>
                  {volumeInfo.averageRating !== undefined ? (
                    <Ratings rating={volumeInfo.averageRating} />
                  ) : (
                    " No Ratings"
                  )}
                </span>
              </p>
              <p>
                <strong>Page count</strong>: {volumeInfo.pageCount ?? 0} Pages{" "}
              </p>

              {currBook.accessInfo.pdf.isAvailable &&
              currBook.accessInfo.pdf.downloadLink &&
              currBook.accessInfo.pdf.downloadLink.includes(".pdf") ? (
                <button
                  className="btn btn-primary "
                  style={{ padding: "0.5rem 2rem", margin: "auto" }}
                >
                  <a
                    className="link-light"
                    target="_blank"
                    href={currBook.accessInfo.pdf.downloadLink}
                  >
                    Download pdf
                  </a>
                </button>
              ) : (
                <button
                  className="btn btn-primary "
                  style={{ padding: "0.5rem 1rem", margin: "auto" }}
                  disabled
                >
                  {" "}
                  download unavailable
                </button>
              )}
              <button
                className="btn btn-primary "
                style={{ padding: "0.5rem 3rem", margin: "auto" }}
              >
                <a className="link-light " href={volumeInfo.infoLink}>
                  Check out
                </a>
              </button>
            </div>
          </div>

          <p className="m-4 book-head">
            {volumeInfo.description ?? "Description not avalaible"}
          </p>
        </div>
      ) : (
        <div className="col-sm-8 d-flex align-items-center   mx-auto ">
          <img
            src={Notfound}
            style={{ width: "70%", filter: "drop-shadow(2px 4px 24px white)" }}
          />
          <span
            className="fs-1 text-white"
            style={{
              boxSizing: "border-box",
            }}
          >
            Book Not Found!!!
          </span>
        </div>
      )}
    </div>
  );
}

export default BookDiscription;
