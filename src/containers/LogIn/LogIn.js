import React, { Component } from 'react';
import firebase from 'firebase';
import Input from '../../components/UI/Input/Input';

import './Login.scss';

class Register extends Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        localStorage.setItem('loggedIn', true);
        this.props.history.push({ pathname: '/' });
      })
      .catch(function(error) {
        console.log(error.message);
      });
  };

  render() {
    return (
      <div className="forms-container">
        <h1 className="heading">Login</h1>
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
          <Input proptype="input" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Register;
