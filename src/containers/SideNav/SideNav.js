import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './SideNav.scss';

class SideNav extends Component {
  closeNav = () => {
    this.props.unmountSideNav();
  }

  render() {
    return (
      <div className="sidenav" id="sideNav">
        <button className="close-btn" onClick={this.closeNav}>&times;</button>
        <ul className="mobile-menu">
          {this.props.isAuth ? <NavLink to="/user-profile" onClick={this.closeNav} className="user-profile-link"><li>{this.props.email}</li></NavLink> : null}
          <NavLink to="/" onClick={this.closeNav}><li>Home</li></NavLink>
          <NavLink to="/posts" onClick={this.closeNav}><li>Blog</li></NavLink>
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

const mapStateToProps = state => ({
  email: state.auth.email
})

export default connect(mapStateToProps, null)(SideNav);
