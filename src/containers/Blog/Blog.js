import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/postActions';
import Posts from '../Posts/Posts';

import './Blog.scss';

class Blog extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    state = {
        loading: false,
        currentPage: 1,
        postsPerPage: 5
    }

    render() {
        return (
            <div className="blog-container">
                <h1 className="heading">Posts</h1>
                <Posts postItems={this.props.posts} />
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
