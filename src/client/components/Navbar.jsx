import React, { Component } from 'react'
import './css/Main.css'


class Navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <a href="#home"><i className="fa fa-fw fa-home"></i>Home</a>
                <a href="#container-about"><i className="fa fa-fw fa-user"></i>Profile</a>
                <a href="#skillheader"><i className="fa fa-fw fa-xing"></i>Calender</a>
                <a id="protofolio-link" href="#Portfolio"><i className="fa fa-github-alt"></i>Connect</a> 
            </nav>
        )
    }
}

export default Navbar
