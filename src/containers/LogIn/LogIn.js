import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

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
    this.props.loginUserAction(this.state.email, this.state.password);
    this.props.history.push({pathname: '/'});
  }

  render() {
    return (
      <div className="contacts-container">
        <h1 className="heading">Login</h1>
        <form className="register-container" onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            name="email" 
            value={this.state.email} 
            onChange={this.handleChange} 
            placeholder="Your email..." />
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            name="password" 
            value={this.state.password} 
            onChange={this.handleChange} 
            placeholder="Your password..." />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUserAction: (email, password) => dispatch(loginUser(email, password))
  }
}

export default connect(null, mapDispatchToProps)(Register);
