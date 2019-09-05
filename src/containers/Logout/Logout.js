import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';
 
class Logout extends Component {
  componentDidMount() {
    firebase
      .auth()
      .signOut()
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

const mapStateToProps = state => ({
  isAuth: state.auth.email
})

const mapDispatchToProps = dispatch => {
  return {
      onLogout: () => dispatch(logoutUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
