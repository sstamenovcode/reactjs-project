import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isUserAuth } from '../../utility';
import { logoutUser } from '../../actions/authActions';
 
class Logout extends Component {
  componentDidMount() {
    return isUserAuth() ? this.props.onLogout() : null;
  }

  render() {
    return (
      <React.Fragment>
        <Redirect to="/" />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onLogout: () => dispatch(logoutUser())
  }
}

export default connect(null, mapDispatchToProps)(Logout);
