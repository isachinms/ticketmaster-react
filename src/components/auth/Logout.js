import React from 'react'
import { Redirect } from 'react-router-dom'

class Logout extends React.Component {
    componentDidMount() {
        console.log(localStorage)
        localStorage.removeItem('authToken')
        alert('Logged out successfully')
        console.log(localStorage)
        window.location.reload()
    }

    render() {
        return <Redirect to="/" />
    }
}

export default Logout