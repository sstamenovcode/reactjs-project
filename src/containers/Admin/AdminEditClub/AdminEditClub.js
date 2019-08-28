import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPost, editPost, deletePost } from '../../../actions/postActions';
import Input from '../../../components/UI/Input/Input';

import './AdminEditClub.scss';

class AdminEditClub extends Component {
  state = {
    title: '',
    text: ''
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.post !== prevProps.post) {
      this.setState({
        title: this.props.post.title,
        text: this.props.post.text
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.editPost(this.props.match.params.id, this.state.title, this.state.text);
    this.props.history.push({pathname: '/admin-dashboard'});
  }

  deletePost = (e) => {
    e.preventDefault();
    this.props.deletePost(this.props.match.params.id, true);
    this.props.history.push({pathname: '/admin-dashboard'});
  }

  render() {
    return (
      <div className="edit-club-container">
        <h1 className="heading">Edit / Delete Post</h1>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminEditClub));
