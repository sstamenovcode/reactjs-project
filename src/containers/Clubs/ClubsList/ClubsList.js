import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import './ClubsList.scss';

class ClubsList extends Component {
  render() {
    const postItems = this.props.postItems.map((post, i) => {
      return  <div key={i} className="post">
                  <h3 className="post-title">{post.title}</h3>
                  <hr />
                  <div className="post-text">{ReactHtmlParser(post.text)}</div>
                  <div className="read-more-container">
                      <Link to={`/clubs/${post.id}`}>Read more</Link>
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

export default ClubsList;
