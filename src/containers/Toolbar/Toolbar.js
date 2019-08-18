import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
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
                        <span className="logo">Football Clubs</span>
                    </NavLink>
                    <nav>
                        <ul className="desktop-menu">
                            {this.props.email ? <NavLink to="/user-profile">
                                <li>{this.props.email}</li>
                            </NavLink> : null}
                            <NavLink to="/blog">
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
                                isAuth={this.props.isAuth}
                                isOpen={this.state.isSideNavOpen}
                                unmountSideNav={this.toggleSideNav} 
                            />) : null}
                    </nav>
                </header>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    email: state.auth.email
})

export default connect(mapStateToProps, null)(Toolbar);
