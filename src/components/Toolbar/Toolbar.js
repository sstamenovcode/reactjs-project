import React from 'react'
import { Link } from 'react-router-dom'
import './Toolbar.scss'

const toolbar = (props) => {
    return (
        <header className="header">
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
        </header>
    )
}

export default toolbar
