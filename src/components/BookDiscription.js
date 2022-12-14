import { parse } from '@fortawesome/fontawesome-svg-core';
import React from 'react'
import { useParams } from 'react-router-dom';
function BookDiscription({ ebook }) {
  let { id } = useParams();
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
  var imgSrc;
  try {
    let url = "http://localhost:3080/images/";     
     imgSrc = url+ebook[id].Thumbnail;
  } catch (e) {
    imgSrc = require("" + `./BookThumbnail/No Image.jpg`)
    console.log(e)
  }
  return (
    <div className='m-3' style={{
      border: "1px solid black",
      borderRadius: "20px",
      margin: "10px",
      padding: "10px",
      boxShadow: "inset 0px 0px 20px 1px, 4px 7px 2px 4px darkseagreen",
      fontSize: "1.2rem",
      fontFamily: 'Exo, sans-serif',
      fontWeight: "500",
      background:"cornsilk"
    }}> 

    <div className='m-3' style={{
      display: "flex",
      fontSize: " 2rem"
         }}>
        <img className="img" style={{ background: "Black" }} src={imgSrc} alt="Image" />

        <div className='m-3' >
          <p>Name : {ebook[id].Name}</p>
          <p>Author : {ebook[id].Author}</p>
          <p>genre: {ebook[id].Genre}</p>
          <p>Publisher :{ebook[id].Publisher}</p>
        </div>

      </div>

      <p className='m-4'>{ebook[id].Description}
      </p>
    </div>
  )
}

export default BookDiscription