import React from 'react';
import { NavLink } from 'react-router-dom';
import './Toolbar.scss';

const toolbar = (props) => {
    return (
        <header className="header">
            <NavLink to="/">
                <span className="logo">The Natural Dating</span>
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
            </nav>
        </header>
    )
}

export default toolbar;
