import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { fetchPost, editPost, deletePost } from '../../../actions/postActions';
import Input from '../../../components/UI/Input/Input';

import './AdminEditDeleteClub.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class AdminEditDeleteClub extends Component {
  state = {
    title: '',
    text: '',
    editorState: EditorState.createEmpty()
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.post !== prevProps.post) {
      const blocksFromHtml = htmlToDraft(this.props.post.text);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorState = EditorState.createWithContent(contentState);

      this.setState({
        title: this.props.post.title,
        text: this.props.post.text,
        editorState
      });
    }
  }

  componentWillUnmount() {
    this.props.deletePost(this.props.match.params.id);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.editPost(
      this.props.match.params.id, 
      this.state.title, 
      draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    );
    this.props.history.push({pathname: '/admin-dashboard'});
  }

  deletePost = (e) => {
    e.preventDefault();
    this.props.deletePost(this.props.match.params.id, true);
    this.props.history.push({pathname: '/admin-dashboard'});
  }

  render() {
    const { editorState } = this.state;

    return (
      <div className="edit-club-container">
        <h1 className="heading">Edit / Delete club</h1>
        <form className="register-container" onSubmit={this.handleSubmit}>
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
              value="Edit" 
            />
            <Input
              proptype="input"
              className="delete-post-btn"
              type="button"
              value="Delete"
              onClick={this.deletePost}
            />
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.posts.post
})

const mapDispatchToProps = dispatch => {
  return {
      fetchPost: (id) => dispatch(fetchPost(id)),
      editPost: (id, title, text) => dispatch(editPost(id, title, text)),
      deletePost: (id, isPermanent) => dispatch(deletePost(id, isPermanent))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminEditDeleteClub));
