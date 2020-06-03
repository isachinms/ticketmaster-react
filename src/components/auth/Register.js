import React from 'react'
import axios from '../../config/axios'

class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/users/register', formData)
            .then((response) => {
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.message)
                } else {
                    this.setState({ username: '', email: '', password: ''})
                    alert('Registration Successful')
                    this.props.history.push('/login')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        const { username, email, password } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Register</h2>
                <label htmlFor="username">Username </label>
                <input type="text" id="username" name="username" value={username} onChange={this.handleChange} />

                <label htmlFor="email">Email </label>
                <input type="text" id="email" name="email" value={email} onChange={this.handleChange} />

                <label htmlFor="password">Password </label>
                <input type="password" id="password" name="password" value={password} onChange={this.handleChange} />

                <input type="submit" value="Register" />
            </form>
        )
    }
}

export default Register