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
        // "http://localhost:3001/api/books"
      )
      .then((res) => {
        // console.log("Books from server", res.data); //working
        resolve(res.data.items);
        // resolve([]);
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

export const ReadUserFavBooks = async (favBooksLinks) => {
  return new Promise(async (resolve, reject) => {
    let response = [];
    try {
      for (let link of favBooksLinks)
        await fetch(link)
          .then((rs) => rs.json())
          .then((data) => {
            console.log("read data", data);
            response.push(data);
          });

      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
};
