import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/postActions';
import Posts from '../Posts/Posts';
import Pagination from '../../components/Pagination/Pagination';

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

    paginate = (number) => {
        this.setState({
            currentPage: number
        })
    }

    render() {
        const indexOfLastPost = this.state.postsPerPage * this.state.currentPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.props.posts.slice(indexOfFirstPost, indexOfLastPost);

        return (
            <div className="blog-container">
                <h1 className="heading">Posts</h1>
                <Posts 
                    postItems={currentPosts}
                    loading={this.state.loading}
                />
                <Pagination 
                    totalPosts={this.props.posts.length}
                    postsPerPage={this.state.postsPerPage}
                    paginate={this.paginate}
                    activePage={this.state.currentPage}
                />
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
