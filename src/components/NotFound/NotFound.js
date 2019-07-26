import React from 'react';

import './NotFound.scss';

const notFound = () => {
    return (
        <div className="not-found-container">
            <h1 className="heading">404 - Page not found</h1>
            <p className="message">
                Please, tell Chuck Norris about that. He can find the page for sure.
            </p>
            <img src="https://live.staticflickr.com/3521/3847818322_f49bc1f7cf.jpg" />
        </div>
    )
}

export default notFound;
