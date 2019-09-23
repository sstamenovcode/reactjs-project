import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import Autosuggest from 'react-autosuggest';
import Input from '../../../components/UI/Input/Input';
import { getAllUsers, addAdminRole, removeAdminRole } from '../../../actions/authActions';

import './AdminEditRoles.scss';

class AdminEditRoles extends Component {
  state = {
    value: '',
    suggestions: []
  };

  componentDidMount() {
    this.props.getUsers();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addAdmin(this.state.value, firebase.auth().currentUser.ra);
    this.setState({
      value: ''
    });
  };

  removeAdmin = (e) => {
    e.preventDefault();
    this.props.removeAdmin(this.state.value, firebase.auth().currentUser.ra);
    this.setState({
      value: ''
    });
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.props.users.filter(user => {
      return user.email.toLowerCase().slice(0, inputLength) === inputValue;
    });
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = (suggestion) => {
    return suggestion.email;
  }

  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => (
    <div>
      {suggestion.email}
    </div>
  );

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type the email of the user',
      value,
      onChange: this.onChange
    };

    return (
      <div className="admin-roles-container">
        <h1 className="heading">Manage admins</h1>
        <form onSubmit={this.handleSubmit}>
          <label>User email:</label> 
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
          />
          <Input
            proptype="input"
            type="submit" 
            value="Add Admin" 
          />
          <Input
            proptype="input"
            type="button"
            value="Remove Admin"
            className="alert-btn"
            onClick={this.removeAdmin}
          />
        </form>
        <h2 className="current-admins-heading">Current admins:</h2>
        <ul className="current-admins-list">
          {this.props.users.map(user => {
            if (user.customClaims.admin) {
              return <li key={user.uid}>{user.email}</li>;
            }
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.auth.users || []
})

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getAllUsers()),
    addAdmin: (email, token) => dispatch(addAdminRole(email, token)),
    removeAdmin: (email, token) => dispatch(removeAdminRole(email, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditRoles);
