import React from 'react';
import { NavLink } from 'react-router-dom';

import './Toolbar.scss';

const toolbar = (props) => {
    const toggleMenu = (e) => {
        let element = document.getElementById('hamburger');
        element.classList.toggle('change');
    }

    return (
        <div className="toolbar-container">
            <header className="header">
                <NavLink to="/">
                    <span className="logo">Project</span>
                </NavLink>
                <nav>
                    <ul>
                        <NavLink to="/posts">
                            <li>Blog</li>
                        </NavLink>
                        <NavLink to="/about-us">
                            <li>About us</li>
                        </NavLink>
                        <NavLink to="/contacts">
                            <li>Contacts</li>
                        </NavLink>
                        {!props.isAuth ? <NavLink to="/register">
                            <li>Register</li>
                        </NavLink> : null}
                        {!props.isAuth ? <NavLink to="/login">
                            <li>Login</li>
                        </NavLink> : null}
                        {props.isAuth ? <NavLink to="/logout">
                            <li>Logout</li>
                        </NavLink> : null}
                    </ul>
                    <div className="hamburger" id="hamburger" onClick={toggleMenu}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default toolbar;
