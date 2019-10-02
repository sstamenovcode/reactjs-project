import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { fetchPosts } from '../../../actions/postActions';
import { Link } from 'react-router-dom';
import AdminAddClub from './AdminAddClub/AdminAddClub';
import AdminEditRoles from './AdminEditRoles/AdminEditRoles';

import './AdminDashboard.scss';

class AdminDashboard extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props.posts) !== JSON.stringify(nextProps.posts)) {
      return true;
    }

    return false;
  }

  render() {
    const postItems = this.props.posts.map((post, i) => {
      return  <CSSTransition
                key={i}
                timeout={300}
                className="post"
                classNames="item"
              >
                <Link to={`/posts/${post.id}`}>
                  <li className="post-title">{post.title}</li>
                </Link>
              </CSSTransition>      
    });

    return (
      <div className="admin-dashboard-container">
        <div className="edit-delete-post">
          <h1 className="heading">Edit / Delete club</h1>
          <TransitionGroup component={'ul'}>
            {postItems}
          </TransitionGroup>
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
