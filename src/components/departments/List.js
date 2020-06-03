import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../../config/axios'

import DepartmentForm from './Form'

class DepartmentsList extends React.Component {
    _isMounted = false
    constructor() {
        super()
        this.state = {
            departments: []
        }
    }

    handleRemove = (id) => {
        const confirmRemove = window.confirm('Are you sure you want to remove?')
        if(confirmRemove) {
            axios.delete(`/departments/${id}`, { headers: { 'x-auth': localStorage.getItem('authToken')}})
                .then((response) => {
                    alert('Removed Successfully')
                    if(this._isMounted){
                        this.setState((prevState) => ({
                            departments: prevState.departments.filter(dept => dept._id !== response.data._id)
                        }))
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    handleSubmit = (formData) => {
        axios.post('/departments', formData, { headers: { 'x-auth': localStorage.getItem('authToken')}})
            .then((response) => {
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.message)
                } else {
                    if(this._isMounted){
                        alert('Added successfully')
                        this.setState((prevState) => ({
                            departments: [].concat(prevState.departments, response.data)
                        }))
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentDidMount() {
        this._isMounted = true
        axios.get('/departments', { headers: { 'x-auth': localStorage.getItem('authToken')}})
            .then((response) => {
                if(this._isMounted) {
                    this.setState({ departments: response.data })
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
        const { departments } = this.state
        return (
            <div>
                <h2>Departments - {departments.length}</h2>
                <ul>
                    {
                        departments.map(dept => {
                            return <li key={dept._id}>{dept.name} 
                                <Link to={`/departments/${dept._id}`}>show</Link>
                                <button onClick={() => this.handleRemove(dept._id)}>remove</button>
                            </li>
                        })
                    }
                </ul>
                <h3>Add Department</h3>
                <DepartmentForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default DepartmentsList