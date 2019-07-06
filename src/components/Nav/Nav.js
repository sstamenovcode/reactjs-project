import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Nav.scss'

class Nav extends Component {
    render() {
        return (
            <div className="header">
                <Link to="/">
                    <span className="logo">The Natural Dating</span>
                </Link>
                <ul>
                    <Link to="/posts">
                        <li>Blog</li>
                    </Link>
                    <Link to="#">
                        <li>Your stories</li>
                    </Link>
                    <Link to="/about-us">
                        <li>About us</li>
                    </Link>
                    <Link to="/contacts">
                        <li>Contacts</li>
                    </Link>
                    <Link to="#">
                        <li>Log in</li>
                    </Link>
                    <Link to="#">
                        <li>Sign up</li>
                    </Link>
                </ul>
            </div>
        )
    }
}

export default Nav
