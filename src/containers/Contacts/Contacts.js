import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import { validateEmail } from '../../utility';

import './Contacts.scss';

class Contacts extends Component {
    state = {
        email: '',
        password: '',
        message: '',
        inputEmailStyle: null,
        inputPasswordStyle: null,
        inputMessageStyle: null
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        await this.setErrorClasses();
        const isValid = this.checkValidity();
        return isValid ? this.clearUserDataState() : null;
    }

    clearUserDataState = () => {
        this.setState({
            email: '',
            password: '',
            message: ''
        });
    }

    setErrorClasses = () => {
        if (!validateEmail(this.state.email)) {
            this.setState(state => ({ inputEmailStyle: 'invalid' }))
        } else {
            this.setState(state => ({ inputEmailStyle: null }));
        }

        if (this.state.password.length < 8) {
            this.setState(state => ({ inputPasswordStyle: 'invalid' }));
        } else {
            this.setState(state => ({ inputPasswordStyle: null }));
        }

        if (this.state.message.length < 20) {
            this.setState(state => ({ inputMessageStyle: 'invalid' }));
        } else {
            this.setState(state => ({ inputMessageStyle: null })); 
        }
    }

    checkValidity = () => {
        if (this.state.inputEmailStyle || 
            this.state.inputPasswordStyle || 
            this.state.inputMessageStyle) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        const emailInputErrorMessage = <p className="error-message">The email is not valid.</p>;
        const passwordInputErrorMessage = <p className="error-message">The password should be at least 8 characters long.</p>;
        const messageInputErrorMessage = <p className="error-message">The message should be at least 20 characters long.</p>;

        return (
            <div className="forms-container">
                <h1 className="heading">Contacts</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        proptype="input"
                        type="email"
                        labelfor="email"
                        label="Email:"
                        className={this.state.inputEmailStyle}
                        value={this.state.email} 
                        name="email"
                        onChange={this.handleChange} 
                        id="email" 
                        placeholder="Your email..."
                        required 
                    />
                    {this.state.inputEmailStyle ? emailInputErrorMessage : null}
                    <Input 
                        proptype="input"
                        type="password" 
                        labelfor="password"
                        label="Password:"
                        className={this.state.inputPasswordStyle}
                        value={this.state.password} 
                        name="password"
                        onChange={this.handleChange}
                        id="password" 
                        placeholder="Your password..."
                        required
                    />
                    {this.state.inputPasswordStyle ? passwordInputErrorMessage : null}
                    <Input 
                        proptype="textarea"
                        labelfor="message"
                        label="Message:"
                        className={this.state.inputMessageStyle}
                        value={this.state.message} 
                        name="message"
                        onChange={this.handleChange}
                        id="message" 
                        placeholder="Your message..."
                        required
                    />
                    {this.state.inputMessageStyle ? messageInputErrorMessage : null}
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
