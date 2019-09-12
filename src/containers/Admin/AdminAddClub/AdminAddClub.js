import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { createPost } from '../../../actions/postActions';
import Input from '../../../components/UI/Input/Input';

import './AdminAddClub.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class AdminAddClub extends Component {
  state = {
    title: '',
    text: '',
    editorState: EditorState.createEmpty()
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    
    if (this.checkValidity()) {
      this.props.createPost(this.state.title, draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())));
      this.setState({
        text: '',
        title: '',
        editorState: EditorState.createEmpty()
      });
    } else {
      alert('The title, the text, or both should consist of more letters.');
    }
  };

  checkValidity = (e) => {
    if (this.state.title.length < 3 || this.state.editorState.getCurrentContent() < 150) {
      return false;
    }

    return true;
  };

  render() {
    const { editorState } = this.state;

    return (
      <React.Fragment>
        <h1 className="heading">Add club</h1>
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
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.onEditorStateChange}
          />
          <div className="post-actions-container">
            <Input
              proptype="input"
              type="submit" 
              value="Add Club" 
            />
          </div>
        </form>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPost: (text, title) => dispatch(createPost(text, title))
  }
}

export default connect(null, mapDispatchToProps)(AdminAddClub);
