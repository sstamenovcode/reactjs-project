import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import './Contacts.scss'

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
        e.preventDefault()
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(data => {
                this.props.history.push('/')
            })
            .catch(function (error) {
                console.log(error.message)
            });
    }

    render() {
        return (
            <div className="contacts-container">
                <h1 className="heading">Contacts</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        value={this.state.username} 
                        name="email" 
                        onChange={this.handleChange} 
                        id="email" 
                        placeholder="Your email..." />
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        value={this.state.password} 
                        name="password" 
                        onChange={this.handleChange}
                        id="password" 
                        placeholder="Your password..." />
                    <label htmlFor="message">Message:</label>
                    <textarea 
                        value={this.state.message} 
                        name="message" 
                        onChange={this.handleChange}
                        id="message" 
                        placeholder="Your message...">
                    </textarea>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default Contacts
