import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';

import './Contacts.scss';

class Contacts extends Component {
    state = {
        email: '',
        password: '',
        message: ''
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const isValid = this.checkValidity();
    }

    checkValidity = () => {
        if (this.validateEmail(this.state.email) &&
            this.state.password.length >= 8 && 
            this.state.message.length >= 20) {
            return true;
        }

        return false;
    }

    validateEmail = (email) => {
        let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    }

    render() {
        return (
            <div className="contacts-container">
                <h1 className="heading">Contacts</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        proptype="input"
                        type="email"
                        labelfor="email"
                        label="Email:"
                        value={this.state.username} 
                        name="email" 
                        onChange={this.handleChange} 
                        id="email" 
                        placeholder="Your email..."
                        required 
                    />
                    <Input 
                        proptype="input"
                        type="password" 
                        labelfor="password"
                        label="Password:"
                        value={this.state.password} 
                        name="password" 
                        onChange={this.handleChange}
                        id="password" 
                        placeholder="Your password..."
                        required
                    />
                    <Input 
                        proptype="textarea"
                        labelfor="message"
                        label="Message:"
                        value={this.state.message} 
                        name="message" 
                        onChange={this.handleChange}
                        id="message" 
                        placeholder="Your message..."
                        required
                    />
                    <Input
                        proptype="submit" 
                        type="submit" 
                        value="Submit" 
                    />
                </form>
            </div>
        )
    }
}

export default Contacts;
