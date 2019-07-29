import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/postActions';

import './Blog.scss';

class Posts extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    truncate(text) {
        if (text.length > 150) {
            return text.slice(0, 150).concat('...');
        }

        return text;
    }

    render() {
        const postItems = this.props.posts.map((post, i) => {
            return <div key={i} className="post">
                        <h3 className="post-title">{post.title}</h3>
                        <hr />
                        <p className="post-text">{this.truncate(post.text)}</p>
                        <div className="read-more-container">
                            <Link to={`/posts/${post.id}`}>Read more</Link>
                        </div>
                    </div>
        });

        return (
            <div className="blog-container">
                <h1 className="heading">Posts</h1>
                {postItems}
            </div>
        );
    }
}

Posts.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    posts: state.posts.posts
})

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: () => dispatch(fetchPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
