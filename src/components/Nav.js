import React, { Component } from 'react'
import { Link, Outlet } from 'react-router-dom'
import './bookcontainer.css';

class NavBar extends Component {
  constructor(props) {
    super(props)

    const e = props.ebook;
    
    this.state = {
      // word is holder of term being searched
      word: '',
      ebook: e,
      genres:null,
      nameList: e.map((x) => x.Name),
      AuthorList: e.map((x) => x.Author),
      PublisherList: e.map((x) => x.Publisher)
    }
  }
  navCat;

  static getDerivedStateFromProps(props, state) {
    state.ebook = props.ebook
    state.genres  = props.genre
    console.log(props)
    
    return state
  }
  

  inputHandler = (event) => {
    console.log("Event is fired")
    this.setState({
      word: event.target.value
    })
  }

  Search(x) {
    // x is state word
    // all objects in ebook  this.state.ebook.map((ele)=>console.log(ele))

    let target = this.state.word
    const result = this.state.ebook.filter((book) => {
      let index = book.srno

      // console.log(target,book)
      if ((target === book.Name) || (target === book.Author) || (target === book.Publisher)) {
        //
        console.log(target + " is matched with index " + index + " of booklist ")
        return true
      }
      else return false
    })
    // list of book found after search 

    result.map((ob) => console.log(ob))

    //getting list of filtered indexes
    const noList = result.reduce((acc, ele) => {
      acc.push(ele.srno)
      return acc
    }, [])

    //check for empty list
    if ((noList.length === 0)) {
      alert("No Search results!!")
    }
    else {
      alert(`Searched one is present at ${noList}`)
    }


  }
  //search end

    submit = (event) => {
    this.Search(this.state.word)
    //to stop reloadinng of paage
    event.preventDefault()
  }

  
  render() {
    return (
      <>
        <nav className='navbar navbar-expand-lg'>
          <button type="button" className="navbar-toggler bg-light" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id='navbarCollapse' className='collapse navbar-collapse'>
            <ul className="nav nav-pills navbar-nav">

              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>
            {
            
      this.navCat = this.state.genres.map((ele)=>{
        return (<li className="nav-item"  key={ele}>
        <Link className="nav-link" to={ele}>{ele}</Link>
      </li>)
      })
    
    }              
              <li className="nav-item">
                <Link className="nav-link " to="/Subscribe">Subcribe</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/AddBook">Add a Book</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="#??">about</Link>
              </li>

            </ul>
            <div className='search-form ms-auto'>

              <input className='form-control mx-2 ' id='search-type' type="search" value={this.state.word} onChange={this.inputHandler} placeholder='Title/Author/Publisher' aria-label='Search' />
              <button className='btn btn-outline-success my-1 mx-2 white' onClick={this.submit} type='submit'>Search</button>

            </div>

          </div>

        </nav>
        <Outlet />
      </>
    )
  }
}




export default NavBar

