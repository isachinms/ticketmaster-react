import React from 'react'
import axios from '../../config/axios'

import EmployeeForm from './Form'

class EditEmployee extends React.Component {
    _isMounted = false
    constructor() {
        super()
        this.state = {
            employee: {}
        }
    }

    handleSubmit = (formData) => {
        const id = this.props.match.params.id
        axios.put(`/employees/${id}`, formData, { headers: { 'x-auth': localStorage.getItem('authToken')}})
            .then((response) => {
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.message)
                } else {
                    alert('Updated Successfully')
                    this.props.history.push(`/employees/${id}`)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentDidMount() {
        this._isMounted = true
        const id = this.props.match.params.id
        axios.get(`/employees/${id}`, { headers: { 'x-auth': localStorage.getItem('authToken')}})
            .then((response) => {
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
        console.log(employee)
        return (
            <div>
                <h2>Edit Employee</h2>
                { Object.keys(employee).length ? <EmployeeForm employee={this.state.employee} handleSubmit={this.handleSubmit} /> : <p>Loading</p> }
            </div>
        )
    }
}

export default EditEmployee