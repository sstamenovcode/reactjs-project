import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import draftToMarkdown from 'draftjs-to-markdown';
import { createPost } from '../../../actions/postActions';
import Input from '../../../components/UI/Input/Input';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './AdminAddClub.scss';

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
    
    const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
    const contentBlock = htmlToDraft(html);

    console.log(contentBlock.contentBlocks[0].text);

    if (this.checkValidity()) {
      const rawContentState = convertToRaw(this.state.editorState.getCurrentContent());
      const markup = draftToMarkdown(rawContentState, null, null, null);

      console.log(markup);

      this.props.createPost(this.state.title, draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())));
      this.setState({
        text: '',
        title: ''
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
        <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
        {/* <Input
          proptype="textarea"
          label="Text:"
          labelfor="text"
          name="text"
          value={this.state.text}
          onChange={this.handleChange} 
          id="text"
        /> */}
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
