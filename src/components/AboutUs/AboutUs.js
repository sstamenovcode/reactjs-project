import React from 'react';

import './AboutUs.scss';
import footballBall from '../../assets/images/football-ball.png';

const aboutUs = () => {
    return (
        <div className="about-us-container">
            <h1 className="heading">About us</h1>
            <div className="text-container">
                <p>
                    "Football Clubs" is a website about some of the greatest football clubs in the world. 
                </p>
                <p>
                    Here you can find information about them such as the year they are founded, their famous players, their trophies and many more!
                </p>
                <p>If you have any ideas for improving the website, you can use the Contacts page and submit them in a text form.</p>
                <img src={footballBall} className="football-ball" alt="Football Ball" />
            </div>
        </div>
    )
}

export default aboutUs;
