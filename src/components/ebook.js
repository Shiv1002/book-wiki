import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, HeartIcon, RedHeartIcon, CartIcon } from "./Layout/icons.js";
import noImage from "./BookThumbnail/No Image.jpg";
import Ratings from "./Layout/ratingStars.js";
import { Placeholder } from "react-bootstrap";
import "./ebook.css";
import {
  AddUserDataFavBooks,
  RemoveUserDataFavBooks,
} from "./Actions/firebase-actions.js";
import toast from "react-hot-toast";

function Ebook({ user, ebook, dispatch, isLiked }) {
  const [fav, setIsfav] = useState(isLiked);
  const nav = useNavigate();
  // console.log(ebook);
  const book = ebook.volumeInfo;
  // supporting image load handling
  // const { src } = useImage(
  //   book.imageLinks ? { srcList: book.imageLinks.thumbnail } : { srcList: "" }
  // );

  useEffect(() => {}, []);

  return (
    <>
      <div
        id="thumbContainer"
        className="my-3 mx-3 thumbContainer position-relative d-flex flex-column rounded-4"
      >
        {/* hoverd element */}

        <div className="h-100 imageblock   rounded-top rounded-4 d-flex flex-column overflow-hidden ">
          <img
            loading="lazy"
            className="w-100 h-75 img z-index-0"
            src={book.imageLinks ? book.imageLinks.thumbnail : ""}
            alt={book.title}
            title={book.title}
            onLoad={() => {
              console.log("loaded successfully");
            }}
            loader={
              <Placeholder
                className="w-100 h-75 img z-index-0"
                as="p"
                animation="glow"
              >
                <Placeholder style={{ height: "100%" }} xs={12} />
              </Placeholder>
            }
          />

          <div className="bg-transparent  position-relative flex-grow-1 d-flex flex-column text-center pt-2 fw-normal text-white">
            <div className="d-flex flex-column  p-2">
              <span className="text-overflow-ellipsis flex-grow-1 font-link">
                <strong>
                  {book.title} ({book.publishedDate})
                </strong>
              </span>
              <span>
                Rating:
                {book.averageRating ? (
                  <span>
                    {" "}
                    <Ratings rating={book.averageRating} />
                  </span>
                ) : (
                  <span>N/A</span>
                )}
              </span>
            </div>

            <div
              // style={{ height: "1rem" }}
              className="ebook-icons mt-auto   d-flex align-items-center justify-content-between  "
            >
              <div
                className="flex-grow-1 text-center "
                onClick={(eve) => {
                  setIsfav((val) => !val);

                  //if user not exist
                  if (!user.email) {
                    toast.error("You have to Login!!");
                    nav("/login");
                    return;
                  }

                  if (!isLiked)
                    AddUserDataFavBooks(user.email, ebook.selfLink).then(
                      (data) => {
                        console.log(data);
                        if (data.status === "success") {
                          dispatch({
                            type: "setUser",
                            payload: {
                              ...user,
                              favBooks: [...user.favBooks, ebook.selfLink],
                            },
                          });
                          toast.success("Added to favorites!");
                        }
                        setIsfav(!isLiked);
                      }
                    );
                  else
                    RemoveUserDataFavBooks(user.email, ebook.selfLink).then(
                      (data) => {
                        console.log(data);
                        if (data.status === "success") {
                          dispatch({
                            type: "setUser",
                            payload: {
                              ...user,
                              favBooks: user.favBooks.filter(
                                (links) => links !== book.selfLink
                              ),
                            },
                          });

                          toast.success("Removed from favorites!");
                        }
                        setIsfav(!isLiked);
                      }
                    );
                }}
                title="add to favorites"
              >
                <span className="icon-box border border-2 border rounded-circle p-2">
                  {fav ? (
                    <RedHeartIcon height="1.5rem" width="1.5rem" fill="red" />
                  ) : (
                    <HeartIcon height="1.5rem" width="1.5rem" fill="white" />
                  )}
                </span>
              </div>
              <div className=" flex-grow-1 p-2" title="details">
                <Link
                  to={`/book/${ebook.id}`}
                  state={ebook}
                  className="icon-box border-2 border rounded-circle p-2 "
                >
                  <EyeIcon height="1.5rem" width="1.5rem" fill="white" />
                </Link>
              </div>
              <div className="flex-grow-1 text-center" title="check out!">
                <a
                  href={book.infoLink}
                  className="icon-box border-2 border rounded-circle p-2"
                >
                  <CartIcon height="1.5rem" width="1.5rem" fill="white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

    // {
    //   "kind": "books#volume",
    //   "id": "7GUkAQAAMAAJ",
    //   "etag": "9OoXGSLUPgI",
    //   "selfLink": "https://www.googleapis.com/books/v1/volumes/7GUkAQAAMAAJ",
    //   "volumeInfo": {
    //       "title": "The House of Arden",
    //       "subtitle": "A Story for Children",
    //       "authors": [
    //           "Edith Nesbit"
    //       ],
    //       "publisher": "Puffin Books",
    //       "publishedDate": "1986",
    //       "description": "Young Edred Arden and his sister Elfrida have inherited Arden Castle, but they will loose it forever unless they can find the long-lost treasure of the Ardens before Edred's birthday. With the aid of the Mouldiwarp of Arden -- a tempermental but magical golden-furred mole -- they travel back thorugh time to Tudor, Stuart and Napoleonic days to search for the missing treasure.",
    //       "industryIdentifiers": [
    //           {
    //               "type": "OTHER",
    //               "identifier": "UOM:39076000967468"
    //           }
    //       ],
    //       "readingModes": {
    //           "text": false,
    //           "image": false
    //       },
    //       "pageCount": 260,
    //       "printType": "BOOK",
    //       "categories": [
    //           "Adventure"
    //       ],
    //       "maturityRating": "NOT_MATURE",
    //       "allowAnonLogging": false,
    //       "contentVersion": "0.2.2.0.preview.0",
    //       "panelizationSummary": {
    //           "containsEpubBubbles": false,
    //           "containsImageBubbles": false
    //       },
    //       "imageLinks": {
    //           "smallThumbnail": "http://books.google.com/books/content?id=7GUkAQAAMAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
    //           "thumbnail": "http://books.google.com/books/content?id=7GUkAQAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    //       },
    //       "language": "en",
    //       "previewLink": "http://books.google.co.in/books?id=7GUkAQAAMAAJ&dq=subject:Adventure&hl=&cd=40&source=gbs_api",
    //       "infoLink": "http://books.google.co.in/books?id=7GUkAQAAMAAJ&dq=subject:Adventure&hl=&source=gbs_api",
    //       "canonicalVolumeLink": "https://books.google.com/books/about/The_House_of_Arden.html?hl=&id=7GUkAQAAMAAJ"
    //   },
    //   "saleInfo": {
    //       "country": "IN",
    //       "saleability": "NOT_FOR_SALE",
    //       "isEbook": false
    //   },
    //   "accessInfo": {
    //       "country": "IN",
    //       "viewability": "NO_PAGES",
    //       "embeddable": false,
    //       "publicDomain": false,
    //       "textToSpeechPermission": "ALLOWED",
    //       "epub": {
    //           "isAvailable": false
    //       },
    //       "pdf": {
    //           "isAvailable": false
    //       },
    //       "webReaderLink": "http://play.google.com/books/reader?id=7GUkAQAAMAAJ&hl=&source=gbs_api",
    //       "accessViewStatus": "NONE",
    //       "quoteSharingAllowed": false
    //   }
    // }
  );
}

export default Ebook;
