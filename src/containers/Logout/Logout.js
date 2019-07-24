import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';
 
class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
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
