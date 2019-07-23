import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.registerUserAction(this.state.email, this.state.password);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registerUserAction: (email, password) => dispatch(registerUser(email, password))
  }
}

export default connect(null, mapDispatchToProps)(Register);
