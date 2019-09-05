import React, { Component } from 'react';
import firebase from 'firebase';
import Input from '../../components/UI/Input/Input';
import { validateEmail } from '../../utility';

import './UserProfile.scss';

class UserProfile extends Component {
  state = {
    email: firebase.auth().currentUser.email,
    isEmailValid: null,
    isFormDirty: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState(state => ({ isFormDirty: true }))
    await this.setErrorClasses();
    const isValid = this.checkValidity();
    if (isValid) {
      this.clearUserDataState();
    }
  }

  clearUserDataState = () => {
    this.setState({
        email: ''
    });
  }

  setErrorClasses = () => {
    if (!validateEmail(this.state.email)) {
        this.setState(state => ({ isEmailValid: false }))
    } else {
        this.setState(state => ({ isEmailValid: true }));
    }
  }

  checkValidity = () => {
    if (!this.state.isEmailValid) {
        return false;
    } else {
        return true;
    }
  }

  render() {
    const emailInputErrorMessage = <p className="error-message">The email is not valid.</p>;


    return (
      <div className="user-profile-container">
        <h1 className="heading">Your profile</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            proptype="input"
            type="email"
            labelfor="email"
            label="Email:"
            name="email"
            value={this.state.email || ''}
            onChange={this.handleChange} 
            id="email"
            placeholder="Your email..."
            required
          />
          {!this.state.isEmailValid && this.state.isFormDirty ? emailInputErrorMessage : null}
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


export default UserProfile;
