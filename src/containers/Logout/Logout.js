import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';
 
class Logout extends Component {
  componentDidMount() {
    return this.props.isAuth ? this.props.onLogout() : null;
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
