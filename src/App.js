import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { CircularProgress } from '@mui/material';
import NavBar from './components/Nav'
import MainFrame from './components/Main';
import Subcribers from './components/Subcribers';
import ErrorPage from './components/ErrorPage';
import BookDiscription from './components/BookDiscription';
import AddBook from './components/addBook';
import urls from './components/BaseUrls';

const axios = require('axios');


function App() {

  const [books, setBook] = useState([]);
  const [genre, setGenre] = useState([])
  //using axios

  useEffect(() => {
    //perform get request 
    console.log("useEffect called")
    axios.get(urls.books)
      .then(res => { setBook(res.data); gatherGenresFromGenreList(res.data) })  // handle success    // response hold config, , data, headers request status statusText
      .catch(error => console.log(error))
  }, []);

  let genreTabs = genre.map((ele) => {
// console.log(encodeURIComponent(ele))
    return (<Route path={encodeURIComponent(ele)} element={<MainFrame ebook={books} key={ele} genre={ele} />} />)
  });

  const gatherGenresFromGenreList = (list) => {
    var listFrmData = list
    var eachBookGenre = []
    var newGenreList = {}
    // convrting all genres in list.ele into a single name
    listFrmData.map((ele) => {
      var name = ""
      var bookGenreList = []
      for (var gen of ele.genre_list) {

        if (gen != ',') {
          name += gen

        } else {
          if (newGenreList[name] == undefined) {
            newGenreList[name] = 1
          }
          bookGenreList.push(name)
          name = ""
        }
      }
      eachBookGenre.push(bookGenreList);
      // console.log(bookGenreList)
    })
    //setting all uniqe genres 
    setGenre(Object.keys(newGenreList))
    
    // eeach books  genres list
    // console.log(eachBookGenre)
    // iterating over list and adding new ebook element with its own genre list as a list
    var i = 0;
    list = list.map((ele) => { ele.genre_list = eachBookGenre[i];i++; return ele })

    // console.log("All gernes", Object.keys(newGenreList));
    // list.map((ele) => { console.log(ele, "after") })

    //set new ebooks datas with updated genre list
    setBook(list)
  }
  if (books.length !== 0) {
    return (<>
      <Router basename='/book-wiki'>
        <Routes >
          <Route path='/' element={<NavBar ebook={books} genre={genre} />}>
            <Route index element={<MainFrame ebook={books} genre="All" />} />

            {genreTabs}

            <Route path="Subscribe" element={<Subcribers />} />
            <Route path="AddBook" element={<AddBook />} />
            <Route path="book/:id" element={<BookDiscription ebook={books} />} />
          </Route>
          <Route path='*' element={<ErrorPage />}></Route>
        </Routes>
      </Router>

    </>)
  } else {
    return (
      <div className='load'  >
        <CircularProgress style={{ color: "#146bec" }} />
        {/* <h3>Loading...</h3> */}
      </div>

    )
  }



}

export default App;
