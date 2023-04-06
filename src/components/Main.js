import React from 'react'

import Ebook from './ebook'
import Header from './header';

const MainFrame = (props) => {
    const e = props.ebook
    console.log(props.genre, 'genres have been called')
    var booklist = []
    var book = {}
    if (e === undefined || e === null) { alert("EmptyList") }
    else if (props.genre === "All") {
        booklist = e.map(x =>
            <Ebook key={x.id} index={x.id} ebook={x} />   
        )
    }
    else {
        //categorizing books into catogory, if genrelist of book includes props genre
        book = e.filter((ele) => { if (ele.genre_list.includes(props.genre)) { return true } })
        //  console.log(book,props.genre)
        booklist = book.map((x, index) => <Ebook key={x.id} index={index} ebook={x} />)
        // console.log(booklist)
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