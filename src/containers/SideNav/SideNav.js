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
          <NavLink to="/" onClick={this.closeNav}><li>Home</li></NavLink>
          <NavLink to="/blog" onClick={this.closeNav}><li>Blog</li></NavLink>
          <NavLink to="/about-us" onClick={this.closeNav}><li>About us</li></NavLink>
          <NavLink to="/contacts" onClick={this.closeNav}><li>Contacts</li></NavLink>
          {!this.props.isAuth ? <NavLink to="/register" onClick={this.closeNav}><li>Register</li></NavLink> : null}
          {!this.props.isAuth ? <NavLink to="/login" onClick={this.closeNav}><li>Login</li></NavLink> : null}
          {this.props.isAuth ? <NavLink to="/logout" onClick={this.closeNav}><li>Logout</li></NavLink> : null}
        </ul>
      </div>
    )
  }
}

export default SideNav;
