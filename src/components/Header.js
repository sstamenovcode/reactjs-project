import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <div className="header">
                <span className="logo"><a href="/">Tennis Community</a></span>
                <ul>
                    <li><a href="#">News</a></li>
                    <li><a href="#">Statistics</a></li>
                    <li><a href="#">About us</a></li>
                    <li><a href="#">Contacts</a></li>
                </ul>
            </div>
        )
    }
}

export default Header
