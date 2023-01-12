
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import noImage from './BookThumbnail/No Image.jpg' ;
function BookDiscription({ ebook }) {
  let { id } = useParams();
  
  const [imgUrl,setUrl] =  useState(noImage)
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

  console.log(ebook[id])

  useEffect(()=>{
    try {
    let urlThumbnail = process.env.REACT_APP_SERVER +"images/"+ebook[id].Thumbnail;     
    setUrl(urlThumbnail)
  } catch (e) {
    console.log(e)
   }
  },[ebook,id])
  
 
  return (
    <div className='book-desc col-md-6 col-lg-6 col-sm-10 col-xs-8 mx-auto my-3 ' style={{
      border: "0px solid black",
      borderRadius: "20px",
      padding: "10px",
      boxShadow: "black 1px 2px 20px 5px",
      fontSize: "1rem",
      fontFamily: 'Exo, sans-serif',
      fontWeight: "500",
      // margin: "2rem auto",
      // background:"blue",
      
      
    }}> 

    <div className='m-3 ' style={{
      display: "flex",
         }}>
        <img  crossOrigin="anonymous" className="img m-2" style={{ background: "Black" }} src={imgUrl} alt="" />

        <div className='m-2 book-head' >
          <p><strong> Name </strong>: {ebook[id].Name}</p>
          <p><strong>Author</strong> : {ebook[id].Author}</p>
          <p><strong>Genre</strong>: {ebook[id].Genre}</p>
          <p><strong>Publisher</strong>: {ebook[id].Publisher}</p>
        </div>
      </div>

      <p className='m-4 book-head'>{ebook[id].Description}</p>
    </div>
  )
}

export default BookDiscription