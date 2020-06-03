import React from 'react'
import axios from '../../config/axios'

import EmployeeForm from './Form'

class AddEmployee extends React.Component {
    handleSubmit = (formData) => {
        axios.post('/employees', formData, { headers: { 'x-auth': localStorage.getItem('authToken')}})
            .then((response) => {
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.message)
                } else {
                    alert('Added Successfully')
                    this.props.history.push('/employees')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <h2>Add Employee</h2>
                <EmployeeForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default AddEmployee