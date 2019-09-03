import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../../actions/postActions';
import { Link } from 'react-router-dom';
import { truncate } from '../../../utility';
import AdminAddClub from '../AdminAddClub/AdminAddClub';
import AdminEditRoles from '../AdminEditRoles/AdminEditRoles';

import './AdminDashboard.scss';

class AdminDashboard extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const postItems = this.props.posts.map((post, i) => {
      return  <div key={i} className="post">
                  <Link to={`/posts/${post.id}`}>
                    <h3 className="post-title">{post.title}</h3>
                    <hr />
                    <p className="post-text">{truncate(post.text)}</p>
                  </Link>
              </div>
    });

    return (
      <div className="admin-dashboard-container">
        <div className="edit-delete-post">
          <h1 className="heading">Edit / Delete Club</h1>
          {postItems}
        </div>
        <div className="add-post">
          <h1 className="heading">Add club</h1>
          <AdminAddClub />
        </div>
        <div className="set-admin-role">
          <h1 className="heading">Set admin</h1>
          <AdminEditRoles />
        </div>
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
