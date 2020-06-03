import React from 'react'
import axios from '../../config/axios'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
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
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/users/login', formData)
            .then((response) => {
                if(response.data.hasOwnProperty('error')) {
                    alert(response.data.error)
                } else {
                    const { token } = response.data
                    localStorage.setItem('authToken', token)
                    this.setState({ email: '', password: ''})
                    alert('Login Successful')
                    this.props.history.push('/customers')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        const { email, password} = this.state

        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Login</h2>
                <label htmlFor="email">Email </label>
                <input type="text" id="email" name="email" value={email} onChange={this.handleChange} />

                <label htmlFor="password">Password </label>
                <input type="password" id="password" name="password" value={password} onChange={this.handleChange} />

                <input type="submit" value="Login" />
            </form>
        )
    }
}

export default Login