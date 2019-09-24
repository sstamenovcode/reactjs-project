import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { fetchPosts } from '../../actions/postActions';
 
import './Home.scss';

export class Home extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        const postItems = this.props.posts.map((post, i) => {
            return  <div key={i} className="post">
                        <h3 className="post-title">{post.title}</h3>
                        <hr />
                        <div className="post-text">{ReactHtmlParser(post.text)}</div>
                        <Link to={`/clubs/${post.id}`} className="read-more-container">Read more</Link>
                    </div>
        }).slice(0, 3);

        return (
            <div>
                <div className="hero-image">
                    <h1 className="hero-text">Find information about the club you want.</h1>
                </div>
                <h2 className="latest-blog-posts">&#60;&#60; Most recently added clubs 	&#62;&#62;</h2>
                <div className="latest-posts-container">
                    {postItems}
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => ({
    posts: state.posts.posts
})

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: () => dispatch(fetchPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
