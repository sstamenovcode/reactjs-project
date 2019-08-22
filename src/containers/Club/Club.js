import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPost } from '../../actions/postActions';

import './Club.scss';

class Club extends Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        {this.props.post.title}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.posts.post
})

const mapDispatchToProps = dispatch => {
  return {
      fetchPost: (id) => dispatch(fetchPost(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Club));
