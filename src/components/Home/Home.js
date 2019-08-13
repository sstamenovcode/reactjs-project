import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../../actions/postActions';
import { truncate } from '../../utility';
 
import './Home.scss';

class Home extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        const postItems = this.props.posts.map((post, i) => {
            return <div key={i} className="post">
                        <h3 className="post-title">{post.title}</h3>
                        <hr />
                        <p className="post-text">{truncate(post.text)}</p>
                        <Link to={`/posts/${post.id}`} className="read-more-container">Read more</Link>
                    </div>
        }).slice(0, 3);

        return (
            <div>
                <div className="hero-image">
                    <div className="hero-text">
                        <h1>The Natural Dating</h1>
                    </div>
                </div>
                <h2 className="latest-blog-posts">Latest blog posts</h2>
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
