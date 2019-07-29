import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './SideNav.scss';

class SideNav extends Component {
  closeNav = () => {
    this.props.unmountSideNav();
  }

  render() {
    return (
      <div className="sidenav" id="sideNav">
        <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
        <ul className="mobile-menu">
          <NavLink to="/"><li>Home</li></NavLink>
          <NavLink to="/blog"><li>Blog</li></NavLink>
          <NavLink to="/about-us"><li>About us</li></NavLink>
          <NavLink to="/contacts"><li>Contacts</li></NavLink>
          {!this.props.isAuth ? <NavLink to="/register"><li>Register</li></NavLink> : null}
          {!this.props.isAuth ? <NavLink to="/login"><li>Login</li></NavLink> : null}
          {this.props.isAuth ? <NavLink to="/logout"><li>Logout</li></NavLink> : null}
        </ul>
      </div>
    )
  }
}

export default SideNav;
