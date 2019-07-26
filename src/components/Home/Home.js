import React from 'react';
import './Home.scss';

const home = () => {
    return (
        <div>
            <div className="hero-image">
                <div className="hero-text">
                    <h1>Project</h1>
                    <p>This is something good.</p>
                </div>
            </div>
            <h2 className="latest-blog-posts">Latest blog posts</h2>
        </div>
    )
};

export default home;
