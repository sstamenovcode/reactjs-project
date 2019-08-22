import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../../actions/postActions';
import { Link } from 'react-router-dom';
import { truncate } from '../../../utility';

import './AdminDashboard.scss';

class AdminDashboard extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const postItems = this.props.posts.map((post, i) => {
      return  <div key={i} className="post">
                  <h3 className="post-title">{post.title}</h3>
                  <hr />
                  <Link to={`/posts/${post.id}`}><p className="post-text">{truncate(post.text)}</p></Link>
              </div>
    });

    return (
      <div className="admin-dashboard-container">
        <h1 className="heading">Club information</h1>
        {postItems}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts
})

const mapDispatchToProps = dispatch => {
  return {
      fetchPosts: () => dispatch(fetchPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
