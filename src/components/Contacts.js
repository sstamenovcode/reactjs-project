import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import './Contacts.scss'

class Contacts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            message: ''
        }
        
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(e) {
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
                    <div>
                        <label for="email">Email:</label>  
                        <input 
                            type="email" 
                            value={this.state.username} 
                            name="email" 
                            onChange={this.handleChange} 
                            id="email" 
                            placeholder="Your email..." />
                    </div>
                    <div>
                        <label for="password">Password:</label>
                        <input 
                            type="password" 
                            value={this.state.password} 
                            name="password" 
                            onChange={this.handleChange}
                            id="password" 
                            placeholder="Your password..." />
                    </div>
                    <div>
                    <label for="message">Message:</label>
                        <textarea 
                            value={this.state.message} 
                            name="message" 
                            onChange={this.handleChange}
                            id="message" 
                            placeholder="Your message...">
                        </textarea>
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default Contacts
