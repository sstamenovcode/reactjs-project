import React, { Component } from 'react';
import firebase from 'firebase';
import { toastr } from 'react-redux-toastr';
import Input from '../../components/UI/Input/Input';
import { validateEmail } from '../../utility';

import './UserProfile.scss';

class UserProfile extends Component {
  state = {
    email: firebase.auth().currentUser ? firebase.auth().currentUser.email : 'Your profile',
    newPassword: '',
    retypedNewPassword: '',
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

  changeEmail = (e) => {
    e.preventDefault();
    const user = firebase.auth().currentUser;

    if (firebase.auth().currentUser.email !== this.state.email) {
      user.updateEmail(this.state.email).then(function() {
        toastr.success('Success!', 'You have successfully changed your email. You should logout and login again in order to see the changes take effect.');
      }).catch(function(error) {
        toastr.error('Error.', 'There was an error.');
      });
    } else {
      toastr.error('Error.', 'Please, provide a different email from the previous one.');
    }
  }

  changePassword = (e) => {
    e.preventDefault();
    const user = firebase.auth().currentUser;

    if (this.state.newPassword === this.state.retypedNewPassword) {
      user.updatePassword(this.state.newPassword).then(() => {
        this.clearUserDataState();
        toastr.success('Success!', 'You have successfully changed your password.');
      }).catch(error => {
        toastr.error('Error.', 'There was an error.');
      });
    } else {
      toastr.error('Error.', 'The passwords you entered should be the same.');
    }
  }

  clearUserDataState = () => {
    this.setState({
        newPassword: '',
        retypedNewPassword: ''
    });
  }

  setErrorClasses = () => {
    if (validateEmail(this.state.email)) {
        this.setState(state => ({ isEmailValid: true }))
    } else {
        this.setState(state => ({ isEmailValid: false }));
    }
  }

  checkValidity = () => {
    if (this.state.isEmailValid && this.state.isPasswordValid) {
        return true;
    } else {
        return false;
    }
  }

  render() {
    const emailInputErrorMessage = <p className="error-message">The email is not valid.</p>;
    const passwordInputErrorMessage = <p className="error-message">The password is not valid.</p>;

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
            type="password"
            labelfor="newPassword"
            label="New Password:"
            name="newPassword"
            value={this.state.newPassword || ''}
            onChange={this.handleChange} 
            id="newPassword"
            placeholder="Your new password..."
            required
          />
          {!this.state.isPasswordValid && this.state.isFormDirty ? passwordInputErrorMessage : null}
          <Input
            proptype="input"
            type="password"
            labelfor="retypeNewPassword"
            label="Retype New Password:"
            name="retypedNewPassword"
            value={this.state.retypedNewPassword || ''}
            onChange={this.handleChange} 
            id="retypeNewPassword"
            placeholder="Retype your new password..."
            required
          />
          {!this.state.isPasswordValid && this.state.isFormDirty ? passwordInputErrorMessage : null}
          <div className="action-btns-container">
            <Input
              proptype="input"
              type="button" 
              value="Change email"
              className="success-btn"
              onClick={this.changeEmail}
            />
            <Input 
              proptype="input"
              type="button"
              className="success-btn"
              value="Change password"
              onClick={this.changePassword}
            />
          </div>
        </form>
      </div>
    )
  }
}

export default UserProfile;
