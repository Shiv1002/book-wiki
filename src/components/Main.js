import React from 'react'

import Ebook from './ebook'
import Header from './header';

const MainFrame = (props) => {
    const e = props.ebook
    console.log(props.genre,'genres have been called')
    var booklist = []
    var book = {}
    if (e === undefined || e === null) {    alert("EmptyList")   }
    else if (props.genre === "All") {
        booklist = e.map(x => (
            <Ebook key={x.srno} index={x.srno - 1} ebook={x} />   // -1 , since srno is start from 1 and ebook +1 indexses since thry are from 0
        ))
    }
    else {
        book = e.filter((ele) => {  if (ele.Genre === props.genre) { return true }  } )
        //  console.log(book,props.genre)
        booklist = book.map((x, index) =>  <Ebook key={x.srno} index={index} ebook={x} />  )
    }

    return (
        <>
            <Header title={props.genre} total={booklist.length} />
            <div className='d-flex flex-wrap justify-content-center'>
                {booklist}
            </div>
            
        </>
    );
}


export default MainFrame