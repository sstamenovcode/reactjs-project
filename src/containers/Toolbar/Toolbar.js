import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SideNav from '../SideNav/SideNav';

import './Toolbar.scss';

class Toolbar extends Component {
    state = {
        isSideNavOpen: false
    }

    toggleSideNav = (e) => {
        this.setState(state => ({
            isSideNavOpen: !state.isSideNavOpen
        }))
    }

    render() {
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
                            {!this.props.isAuth ? <NavLink to="/register">
                                <li>Register</li>
                            </NavLink> : null}
                            {!this.props.isAuth ? <NavLink to="/login">
                                <li>Login</li>
                            </NavLink> : null}
                            {this.props.isAuth ? <NavLink to="/logout">
                                <li>Logout</li>
                            </NavLink> : null}
                        </ul>
                        <div className="hamburger" id="hamburger" onClick={this.toggleSideNav}>
                            <div className="bar1"></div>
                            <div className="bar2"></div>
                            <div className="bar3"></div>
                        </div>
                        {this.state.isSideNavOpen ? 
                            (<SideNav 
                                isOpen={this.state.isSideNavOpen}
                                unmountSideNav={this.toggleSideNav} 
                            />) : null}
                    </nav>
                </header>
            </div>
        )
    }
}

export default Toolbar;
