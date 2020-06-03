import React from 'react'
import { Redirect } from 'react-router-dom'

class Logout extends React.Component {
    componentDidMount() {
        console.log(localStorage)
        localStorage.removeItem('authToken')
        alert('Logged out successfully')
        console.log(localStorage)
    }

    render() {
        return <Redirect to="/login" />
    }
}

export default Logout