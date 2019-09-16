import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import { validateEmail } from '../../utility';

import './Contacts.scss';

class Contacts extends Component {
    state = {
        email: '',
        message: '',
        isHuman: false,
        isEmailValid: false,
        isMessageValid: false,
        isFormDirty: false
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    toggleChangeIsHuman = (e) => {
        this.setState({
            isHuman: !this.state.isHuman
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState(state => ({ isFormDirty: true }))
        await this.setErrorClasses();
        const isValid = this.checkValidity();
        if (isValid) {
            const message = this.state.message;
            const url = `https://us-central1-test-72840.cloudfunctions.net/sendMail?from=${this.state.email}&message=${message}`;
            fetch(url, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(message)
                }
            )
                .then(() => { 
                    return this.clearUserDataState();
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }

    clearUserDataState = () => {
        this.setState({
            email: '',
            message: '',
            isHuman: false,
            isFormDirty: false
        });
    }

    setErrorClasses = () => {
        if (!validateEmail(this.state.email)) {
            this.setState(state => ({ isEmailValid: false }))
        } else {
            this.setState(state => ({ isEmailValid: true }));
        }

        if (this.state.message.length < 20) {
            this.setState(state => ({ isMessageValid: false }));
        } else {
            this.setState(state => ({ isMessageValid: true })); 
        }

        if (!this.state.isHuman) {
            this.setState(state => ({ isHuman: false }));
        } else {
            this.setState(state => ({ isHuman: true })); 
        }
    }

    checkValidity = () => {
        if (!this.state.isEmailValid || 
            !this.state.isMessageValid ||
            !this.state.isHuman) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        const emailInputErrorMessage = <p className="error-message">The email is not valid.</p>;
        const messageInputErrorMessage = <p className="error-message">The message should be at least 20 characters long.</p>;
        const isHumanInputErrorMessage = <p className="error-message">In order to send the message, you should confirm that you are human.</p>

        return (
            <div className="contacts-container">
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
                    {!this.state.isEmailValid && this.state.isFormDirty ? emailInputErrorMessage : null}
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
                    {!this.state.isMessageValid && this.state.isFormDirty ? messageInputErrorMessage : null}
                    <div className="check-human-input">
                        <input
                            type="checkbox"
                            name="isHuman"
                            value="isHuman"
                            checked={this.state.isHuman}
                            onChange={this.toggleChangeIsHuman}
                        /> Check if you are human.
                    {!this.state.isHuman && this.state.isFormDirty ? isHumanInputErrorMessage : null}
                    </div>
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
