import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./bookcontainer.css";
import { EyeIcon, HeartIcon, RedHeartIcon, CartIcon } from "./Layout/icons.js";
import noImage from "./BookThumbnail/No Image.jpg";

function Ebook({ ebook }) {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <>
      <div
        id="thumbContainer "
        className="my-3 mx-3 thumbContainer position-relative "
      >
        {/* hoverd element */}
        <div className="position-absolute thumbContainerHover bg-light rounded-4 rounded-bottom border border-dark border-bottom-0 d-flex">
          <div
            className=" rounded-end rounded-bottom rounded-4"
            onClick={(eve) => {
              setIsLiked((val) => !val);
            }}
          >
            <span className="">
              {isLiked ? (
                <RedHeartIcon height="1.5rem" width="1.5rem" color="" />
              ) : (
                <HeartIcon height="1.5rem" width="1.5rem" color="" />
              )}
            </span>
          </div>

          <Link to={`/book/${ebook.id}`}>
            <div className="border-end border-dark border-start middle ">
              <EyeIcon height="1.5rem" width="1.5rem" color="" />
            </div>
          </Link>

          <div className="rounded-start rounded-bottom rounded-4">
            <CartIcon height="1.5rem" width="1.5rem" color="" />
          </div>
        </div>
        <div className="imageblock position-relative border border-dark bg-dark rounded-top rounded-4">
          <img
            className="img"
            src={
              ebook.volumeInfo.imageLinks
                ? ebook.volumeInfo.imageLinks.thumbnail
                : noImage
            }
            alt={ebook.name}
          />
        </div>
      </div>
      {/* <Outlet /> */}
    </>

    // {/* <div className='mx-2'> <h4 >{index + 1}.</h4> </div> */}
    // {/* <div className='bookTitle d-flex-col mx-3 my-2'>
    //  <span> <a id='booktitle' href={ebook.link} target='_blank'>{ebook.Name}</a></span><span>by {ebook.Author}</span>
    //   <div className=''>
    //   <p align='justify'>{ebook.Description}</p>
    //   <a href="https://www.goodreads.com/book/show/1885.Pride_and_Prejudice?ac=1&from_search=true&qid=qvieLlISY0&rank=2" > <button className='btn btn-outline-success  me-2' >Sources</button> </a>
    //   </div>
    // </div> */}
  );
}

export default Ebook;
