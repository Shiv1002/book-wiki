import React, { Component } from "react";
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons"

import './bookcontainer.css'

class Message extends Component {
    constructor() {
        super()
        var setcount = 0;
        console.log("no1 ")
        this.state = {
            count: setcount,
            email: '',
            password: '' ,
            clientId : '970428558790-ffr69jngr3odgddnb8043sdn6pii1cd2.apps.googleusercontent.com',
        }
        
    }


    static getDerivedStateFromProps(props, state) {

        // The getDerivedStateFromProps() method is called right before rendering the element(s) in the DOM.
        // This is the natural place to set the state object based on the initial props.        //
        // It takes state as an argument, and returns an object with changes to the state.
        // returns a state with chenge in object due to props
        // this is undefined    

        return null
    }

    start(client) {
// here state cannot be used
        try{            
            gapi.client.init({ clientId: client, scope: '' })
        }catch(err){
            console.log(err);
        }
       
    }

    async componentDidMount() {
        // The componentDidMount() method is called after the component is rendered.
        // This is where you run statements that requires when the component is already placed in the DOM

        var getCount = 0
        const res = await fetch("/api/users")
        const users = await res.json()
        //json is users
        getCount = users.length
        console.log("Total Subsciber we have ", getCount)
        console.log("componentDidMount called")
        this.setState({
            count: getCount,
            email: localStorage.getItem('loginEmail')
        })
        localStorage.setItem('count', this.state.count)
        console.log("Email On Load", this.setState.email)

        //
        try{
            gapi.load('client:auth2', this.start(this.state.clientId));
        }catch(err){console.log(err)}
       
    }

    // shouldComponentUpdate(nextprops, nextstate) {
    //     //    if this.state is same as nextstate then return false
    //     //    console.log("IN shouls update component",this.state,nextstate)
    //     return true
    // }
    // getSnapshotBeforeUpdate(prevProps, prevState) {
    //     //    console.log("IN getsnapshot")
    //     return null
    // }
    componentDidUpdate(prevProps, prevState, Snapshot) {
        if (prevState.count === this.state.count - 1) {
            document.getElementById('email').value = ""
            document.getElementById('pwd').value = ""
        }
        console.log("componentDidUpdate called!!!")
    }

    addsub() {
        this.setState(
            // here put 1 to zero to reset
            { count: this.state.count + 1 }, () => {
                localStorage.setItem('count', this.state.count)
                console.log(this.state.count)
            }
        )
    }

    handleEmail = (e) => {
        this.setState({
            email: e.target.value
        }
        )
    }
    changePass = (event) => {
        this.setState({
            password: event.target.value
        }
        )
    }

    Submit = (event) => {
        event.preventDefault()
        const check = this.validator()
        if (check) {
            console.log("In submit")
            localStorage.setItem('count', this.state.count)
            // localStorage.setItem('loginName',this.state.email)
            console.log(`${this.state.email} is subcriber no - ${this.state.count}`)
        }
        else {
            console.log("Invalid Email or Password!!")

            return
        }

        const data = { "postID": this.state.count, "email": this.state.email, "password": this.state.password }

        console.log("posting data")

        fetch('http://localhost:3080/api/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))



    }

    validator() {
        console.log("In validator")
        var value = false
        if (((this.state.email !== '') && (this.state.password !== ''))) {
            value = true
        }
        return value
    }
    handleSuccess = (googledata) => {

        this.setState({ email: googledata.profileObj.email })
        localStorage.setItem('loginName', googledata.profileObj.name)
        localStorage.setItem('loginEmail', googledata.profileObj.email)
        localStorage.setItem('imageUrl', googledata.profileObj.imageUrl)
        console.log(googledata)
    }
    handleFail = (error) => { console.log(error) }

    async getUser() {
        const res = await fetch("/api/users")
        const json = await res.json()
        console.log(json)
    }
    hS = () => {
        console.log("Logged out successfully")
        this.setState({ email: "" })
        localStorage.setItem('loginName', "")
        localStorage.setItem('loginEmail', "")
        localStorage.setItem('imageUrl', null)
    }
    render() {
        return (

            <div className="login">

                <form onSubmit={this.Submit}>
                    <div >
                        {/* working */}
                        <table>

                            {
                                !localStorage.getItem('loginName') || !localStorage.getItem('loginEmail') ? (
                                    <tbody>
                                        <tr><th><h2>Login</h2></th></tr>

                                        <tr>
                                            <td>
                                                <input className='form-control user' type='email' id="email" placeholder="Enter Email Address here!" value={this.state.email} onChange={this.handleEmail} />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <input className='form-control user' type='password' id="pwd" placeholder="Enter Password here!" value={this.state.password} onChange={this.changePass} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-0">
                                                <p className="labels align-center mx-2 my-2">By signing up you accept our&nbsp;<a className="" href="#">Terms Of Use</a></p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <button className="buttn " type="submit" onClick={() => {
                                                    const check = this.validator()
                                                    if (check) {
                                                        this.addsub()

                                                    }
                                                }}>LOGIN</button>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="py-0">
                                                <div className="col-md-12">
                                                    <div className="login-or">
                                                        <hr className="hr-or" />
                                                        <span className="span-or">or Signup with</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><div id="logo" className="d-flex">
                                                <GoogleLogin
                                                    clientId={this.state.clientId}
                                                    render={renderProps => (
                                                        <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                                            <img src={require('./logo/google-logo-9822.png')} />
                                                        </button>
                                                    )}
                                                    isSignedIn={true}
                                                    onSuccess={this.handleSuccess}
                                                    onFailure={this.handleFail}
                                                    cookiePolicy={'single_host_origin'}

                                                >
                                                </GoogleLogin>
                                                <button><img src={require('./logo/2021_Facebook_icon.png')} /></button>
                                                
                                                <button><img src={require('./logo/logo-twitter-png-5863.png')}  /></button>

                                            </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                                    : (
                                        <tbody>

                                            <tr>
                                                <td className="User"><h3 className="my-0">{localStorage.getItem('loginName')}</h3></td>
                                            </tr>
                                            <tr>
                                                <td className="User"><img id="emailImg" src={localStorage.getItem('imageUrl')} alt="No Image" /> </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div id="logo">
                                                        <GoogleLogout
                                                            clientId={this.clientId}
                                                            render={renderProps => (
                                                                <button className="buttn bg-primary" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                                                    LogOut
                                                                </button>
                                                            )}
                                                            onLogoutSuccess={this.hS}

                                                        >
                                                        </GoogleLogout>
                                                    </div>
                                                </td>

                                            </tr>
                                        </tbody>
                                    )
                            }
                        </table>

                    </div>
                </form>
                {/* <button className="buttn" style={{ height: " 55px", width: "180px" }} onClick={() => this.getUser()}>Get Users</button> */}
                <div>
                    {/*this.state.count*/}
                    {/* <h2><b><code>Subcribers - {this.state.count}</code></b></h2> */}
                </div>
            </div>

        )
    }
}

export default Message