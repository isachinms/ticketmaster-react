import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class CustomersTable extends React.Component {
    _isMounted = false
    constructor() {
        super()
        this.state = {
            customers: []
        }
    }

    componentDidMount() {
        this._isMounted = true
        axios.get('/customers', { headers: { 'x-auth': localStorage.getItem('authToken')}})
            .then((response) => {
                if(response.data.hasOwnProperty('errors')){
                    alert(console.data.message)
                } else {
                    const customers = response.data
                    if(this._isMounted) {
                        this.setState({ customers })
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    handleRemove = (id) => {
        const confirmRemove = window.confirm('Are you sure you want to remove?')
        if(confirmRemove) {
            axios.delete(`/customers/${id}`, { headers: { 'x-auth': localStorage.getItem('authToken')}} )
                .then((response) => {
                    if(response.data.hasOwnProperty('errors')) {
                        alert(response.data.message)
                    } else {
                        if(this._isMounted){
                            alert('Customer has been removed successfully')
                            this.setState((prevState) => ({
                                customers: prevState.customers.filter(cust => cust._id !== response.data._id)
                            }))
                        }
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    render() {
        const { customers } = this.state
        return (
            <div>
                <h2>Customers - {customers.length}</h2>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Sl. No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Action</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        { customers.map((customer,i) => {
                            return (
                                <tr key={customer._id}>
                                    <td>{i + 1}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.mobile}</td>
                                    <td><Link to={`/customers/${customer._id}`}>show</Link></td>
                                    <td><button onClick={() => this.handleRemove(customer._id)}>Remove</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Link to="/customers/new">Add customer</Link>
            </div>
        )
    }
}

export default CustomersTable