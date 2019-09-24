import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../../actions/postActions';
import { Link } from 'react-router-dom';
import AdminAddClub from './AdminAddClub/AdminAddClub';
import AdminEditRoles from './AdminEditRoles/AdminEditRoles';

import './AdminDashboard.scss';

class AdminDashboard extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const postItems = this.props.posts.map((post, i) => {
      return  <Link to={`/posts/${post.id}`} key={i}>
                <div className="post">
                  <h3 className="post-title">{post.title}</h3>
                </div>
              </Link>         
    });

    return (
      <div className="admin-dashboard-container">
        <div className="edit-delete-post">
          <h1 className="heading">Edit / Delete club</h1>
          {postItems}
        </div>
        <div className="add-post">
          <AdminAddClub />
        </div>
        <div className="set-admin-role">
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
