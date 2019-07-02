import React, { Component } from 'react'
import './Home.scss'

class Home extends Component {
    render() {
        return (
            <div>
                <div className="hero-image">
                    <div className="hero-text">
                        <h1>The Natural Dating</h1>
                        <p>Meet the people that are meant for you!</p>
                    </div>
                </div>
                <h1 className="latest-blog-posts">Latest blog posts</h1>
            </div>
        )
    }
}

export default Home
