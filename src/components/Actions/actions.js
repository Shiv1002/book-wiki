import axios from "axios";

export const fetchGenreBooks = async (genre) => {
  return new Promise((resolve, reject) => {
    // resolve(advObj);
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          "subject:" +
          genre +
          `&key=${process.env.REACT_APP_BOOKS_KEY}` +
          "&maxResults=40"
      )
      .then((res) => {
        resolve(res.data.items);
      })
      .catch((err) => reject(err));
  });
};

export const fetchSearchBooks = async (search) => {
  return new Promise((resolve, reject) => {
    // resolve(kam);
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          search +
          `&key=${process.env.REACT_APP_BOOKS_KEY}` +
          "&maxResults=40"
      )
      .then((res) => {
        console.log(res.data.items);
        resolve(res.data.items);
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
