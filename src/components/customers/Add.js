import React from 'react'

import CustomerForm from './Form'
import axios from '../../config/axios'

class AddCustomer extends React.Component {
    handleSubmit = (formData) => {
        axios.post('/customers', formData, { headers: { 'x-auth': localStorage.getItem('authToken') }})
            .then((response) => {
                console.log(response.data)
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.message)
                } else {
                    alert('Customer has been added successfully')
                    this.props.history.push('/customers')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <h2>Add customer</h2>
                <CustomerForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default AddCustomer