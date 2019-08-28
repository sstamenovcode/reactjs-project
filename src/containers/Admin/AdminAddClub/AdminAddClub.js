import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../../actions/postActions';
import Input from '../../../components/UI/Input/Input';

import './AdminAddClub.scss';

class AdminAddClub extends Component {
  state = {
    title: '',
    text: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.checkValidity()) {
      this.props.createPost(this.state.title, this.state.text);
      this.setState({
        text: '',
        title: ''
      });
    } else {
      alert('The title, the text, or both should consist of more letters.');
    }
  }

  checkValidity = (e) => {
    if (this.state.title.length < 3 || this.state.text.length < 150) {
      return false;
    }

    return true;
  }

  render() {
    return (
      <form className="add-club-form" onSubmit={this.handleSubmit}>
        <Input
          proptype="input"
          type="text"
          label="Title:"
          labelfor="title"
          name="title" 
          value={this.state.title || ''}
          onChange={this.handleChange} 
          id="title"
        />
        <Input
          proptype="textarea"
          label="Text:"
          labelfor="text"
          name="text"
          value={this.state.text}
          onChange={this.handleChange} 
          id="text"
        />
        <div className="post-actions-container">
          <Input
            proptype="input"
            type="submit" 
            value="Add Club" 
          />
        </div>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPost: (text, title) => dispatch(createPost(text, title))
  }
}

export default connect(null, mapDispatchToProps)(AdminAddClub);
