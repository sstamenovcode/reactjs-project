import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { fetchPost, deletePost } from '../../actions/postActions';

import './Club.scss';

class Club extends Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.deletePost(this.props.match.params.id);
  }

  render() {
    return (
      <div className="club-container">
        <h1 className="heading">{this.props.post.title}</h1>
        <div className="post-container">{ReactHtmlParser(this.props.post.text)}</div>
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
      deletePost: (id) => dispatch(deletePost(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Club));
