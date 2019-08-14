import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { truncate } from '../../utility';

import './Posts.scss';

class Posts extends Component {
  render() {
    const postItems = this.props.postItems.map((post, i) => {
      return  <div key={i} className="post">
                  <h3 className="post-title">{post.title}</h3>
                  <hr />
                  <p className="post-text">{truncate(post.text)}</p>
                  <div className="read-more-container">
                      <Link to={`/posts/${post.id}`}>Read more</Link>
                  </div>
              </div>
    });

    return (
      <React.Fragment>
        {postItems}
      </React.Fragment>
    );
  }
}

export default Posts;
