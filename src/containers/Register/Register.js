import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import Input from '../../components/UI/Input/Input';

import './Register.scss';

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
    this.props.history.push({pathname: '/'});
  }

  render() {
    return (
      <div className="forms-container">
        <h1 className="heading">Register</h1>
        <form className="register-container" onSubmit={this.handleSubmit}>
          <Input
            proptype="input"
            type="email"
            labelfor="email"
            label="Email:"
            name="email" 
            value={this.state.email} 
            onChange={this.handleChange} 
            id="email"
            placeholder="Your email..."
            required
          />
          <Input
            proptype="input"
            type="password"
            labelfor="password"
            label="Password:"
            name="password" 
            value={this.state.password} 
            onChange={this.handleChange} 
            id="password"
            placeholder="Your password..."
            required
          />
          <Input 
            proptype="input"
            type="submit" 
            value="Submit" 
          />
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registerUserAction: (email, password) => dispatch(registerUser(email, password))
  }
}

export default connect(null, mapDispatchToProps)(Register);
