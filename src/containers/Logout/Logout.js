import React, { Component } from 'react';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
  componentDidMount() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem('loggedIn');
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Redirect to="/" />
      </React.Fragment>
    )
  }
}

export default Logout;
