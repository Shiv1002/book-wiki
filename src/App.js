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
import Message from './components/message';
import ErrorPage from './components/ErrorPage';
import BookDiscription from './components/BookDiscription';
import AddBook from './components/addBook';

const axios = require('axios');


function App() {

  const [books, setBook] = useState([]);
  const [genre, setGenre] = useState([])
  //using axios



  useEffect(() => {
    //perform get requost 
    console.log("useEffect called")
    axios.get('/api/books')
      .then(res => { setBook(res.data.bookList); setGenre(res.data.genre) })  // handle success    // response hold config, , data, headers request status statusText
      .catch(error => console.log(error))
  }, []);

  let genreTabs = genre.map((ele) => {
    return (<Route path={ele} element={<MainFrame ebook={books} key={ele} genre={ele} />} />)
  });

  
    if (books.length !== 0) {
    return (<>
      <Router>
        <Routes>
          <Route path="/" element={<NavBar ebook={books} genre={genre} />}>
            <Route index element={<MainFrame ebook={books} genre="All" />} />

            {genreTabs}

            <Route path="Subscribe" element={<Message />} />
            <Route path="AddBook" element={<AddBook />} />
            <Route path="book/:id" element={<BookDiscription ebook={books} />} />
          </Route>

          <Route path='*' element={<ErrorPage />}></Route>
        </Routes>
      </Router>

    </>)
  } else {
    return(<CircularProgress />)
  }
    

  
}

export default App;
