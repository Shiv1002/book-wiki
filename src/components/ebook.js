import axios from 'axios';
import React, { useEffect } from 'react'
import { Link, Outlet, useParams, useRouteMatch } from 'react-router-dom';
import './bookcontainer.css';
var card = document.getElementById("thumbContainer");

function Ebook({ ebook }) {
  // only for one comp
  var imgSrc;
  try{
    let url = "http://localhost:3080/images/";     
     imgSrc = url+ebook.Thumbnail;
  
  }catch(e){
    imgSrc = require("" + `./BookThumbnail/No Image.jpg`)
    console.log(e)
  }
  return (
    // container bg-light font-link
    <div id='thumbContainer' className='my-3 mx-3 thumbContainer'  >
      <Link to={`/book/${ebook.srno - 1}`} >
        <div>
           <img className="img"  src={imgSrc} alt="Image" />
        </div>       
      </Link>
      <Outlet />
    </div>



    // {/* <div className='mx-2'> <h4 >{index + 1}.</h4> </div> */}
    // {/* <div className='bookTitle d-flex-col mx-3 my-2'>
    //  <span> <a id='booktitle' href={ebook.link} target='_blank'>{ebook.Name}</a></span><span>by {ebook.Author}</span>
    //   <div className=''>
    //   <p align='justify'>{ebook.Description}</p>
    //   <a href="https://www.goodreads.com/book/show/1885.Pride_and_Prejudice?ac=1&from_search=true&qid=qvieLlISY0&rank=2" > <button className='btn btn-outline-success  me-2' >Sources</button> </a>
    //   </div>
    // </div> */}





  )
}

export default Ebook