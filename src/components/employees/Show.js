import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class ShowEmployee extends React.Component {
    _isMounted = false
    constructor() {
        super()
        this.state = {
            employee: {}
        }
    }

    componentDidMount() {
        this._isMounted = true
        const id = this.props.match.params.id
        axios.get(`/employees/${id}`, { headers: { 'x-auth': localStorage.getItem('authToken')}})
            .then((response) => {
                console.log(response.data)
                if(this._isMounted){
                    this.setState({ employee: response.data })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        const { employee } = this.state
        return (
            <div>
                <h3>Name: {employee.name}</h3>
                <p>Email: {employee.email}</p>
                <p>Mobile: {employee.mobile}</p>
                <p>Department: {employee.department && employee.department.name}</p>
                <Link to={`/employees/edit/${this.props.match.params.id}`} >Edit</Link>
            </div>
        )
    }
}

export default ShowEmployee