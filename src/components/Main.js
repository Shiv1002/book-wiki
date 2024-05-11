import React, { useEffect, useState, Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import KUTE from "kute.js";
import { Search } from "./Layout/icons";
import "./Main.css";

const MainPage = ({ state, dispatch }) => {
  const navi = useNavigate();

  const [search, setSearch] = useState("");

  useEffect(() => {
    // console.log(layer1,layer2)
    async function performAnimation() {
      return new Promise((res, rej) => {
        const animation = KUTE.to(
          "#layer1",
          { path: "#layer2" },
          { repeat: 100, duration: "3000", yoyo: "true" }
        );
        // Start the animation
        setTimeout(() => animation.start(), 10000);
        res('"Animation started!!"');
      });

      //   animation.start();
    }
    // performAnimation().then((rs) => console.log(rs));
  }, []);

  const searchBooks = (event) => {
    if (event.key === "Enter") {
      console.log("searching");
      navi(`/search/${search}`);
    }
  };
  const handleSearch = (eve) => {
    setSearch(eve.target.value);
  };

  return (
    <>
      <div className="search-form d-flex flex-column z-1 align-items-center justify-content-end position-relative">
        <div className="nav-heading p-4 d-flex flex-column align-items-center">
          <p className="nav-heading-1 text-light">
            Welcome to a world of endless possibilities
          </p>
          <p className="nav-heading-2 text-light">Explore our website today!</p>
        </div>
        <div className="search-form-group bg-light  ps-3 pe-4 rounded-5">
          <div className="scroll-wrapper position-relative d-flex align-items-center overflow-hidden">
            <div className="me-auto z-0  w-100">
              <input
                className="bg-light border-0 fs-6 p-2"
                id="search-type"
                type="search"
                value={search}
                onChange={handleSearch}
                style={{ width: "60rem" }}
                placeholder="Search your favourite books here"
                aria-label="Search"
                onKeyDown={searchBooks}
              />
            </div>
            <span className="z-3 position-absolute end-0">
              <Search width="1.5rem" height="1.5rem" />
            </span>
          </div>
        </div>
      </div>

      <div>
        <svg
          className="searchBarSvg"
          id="visual"
          viewBox="0 0 900 450"
          width="900"
          height="450"
          xmlns="http://www.w3.org/2000/svg"
          xlink="http://www.w3.org/1999/xlink"
          version="1.1"
        >
          <defs>
            <linearGradient
              id="Gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
              gradientTransform="rotate(270)"
            >
              <stop offset="0%" stopColor="#020202" />
              <stop offset="100%" stopColor="#a50097" />
            </linearGradient>
          </defs>
          <g>
            <path
              id="layer1"
              d="M0 48L21.5 49.8C43 51.7 86 55.3 128.8 52.7C171.7 50 214.3 41 257.2 36.2C300 31.3 343 30.7 385.8 31C428.7 31.3 471.3 32.7 514.2 35C557 37.3 600 40.7 642.8 44.3C685.7 48 728.3 52 771.2 52.8C814 53.7 857 51.3 878.5 50.2L900 49L900 0L878.5 0C857 0 814 0 771.2 0C728.3 0 685.7 0 642.8 0C600 0 557 0 514.2 0C471.3 0 428.7 0 385.8 0C343 0 300 0 257.2 0C214.3 0 171.7 0 128.8 0C86 0 43 0 21.5 0L0 0Z"
              fill="url(#Gradient)"
              strokeLinecap="round"
              strokeLinejoin="miter"
            ></path>
            <path
              id="layer2"
              style={{ visibility: "hidden" }}
              d="M0 47L21.5 47.5C43 48 86 49 128.8 55C171.7 61 214.3 72 257.2 74.3C300 76.7 343 70.3 385.8 65C428.7 59.7 471.3 55.3 514.2 54.5C557 53.7 600 56.3 642.8 58.2C685.7 60 728.3 61 771.2 61.3C814 61.7 857 61.3 878.5 61.2L900 61L900 0L878.5 0C857 0 814 0 771.2 0C728.3 0 685.7 0 642.8 0C600 0 557 0 514.2 0C471.3 0 428.7 0 385.8 0C343 0 300 0 257.2 0C214.3 0 171.7 0 128.8 0C86 0 43 0 21.5 0L0 0Z"
              fill="url(#Gradient)"
              strokeLinecap="round"
              strokeLinejoin="miter"
            ></path>
          </g>
        </svg>
      </div>
      {/* <EbookList isLoading={isLoading} booklist={booklist} {...props} /> */}

      <Outlet />
    </>
  );
};

export default MainPage;
