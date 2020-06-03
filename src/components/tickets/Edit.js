import React from 'react'
import axios from '../../config/axios'
import Axios from 'axios'

import TicketForm from './Form'

class EditTicket extends React.Component {
    _isMounted = false
    constructor() {
        super()
        this.state = {
            ticket: {}
        }
    }

    handleSubmit = (formData) => {
        const id = this.props.match.params.id
        axios.put(`/tickets/${id}`, formData, { headers: { 'x-auth': localStorage.getItem('authToken') }})
            .then((response) => {
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.message)
                } else {
                    if(this._isMounted){
                        alert('Updated Successfully')
                        this.props.history.push(`/tickets/${id}`)
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentDidMount() {
        this._isMounted = true
        const id = this.props.match.params.id
        const tokenObject = { headers: { 'x-auth': localStorage.getItem('authToken')}}
        const getTicket = axios.get(`/tickets/${id}`, tokenObject)
        const getCustomers = axios.get('/customers', tokenObject)
        const getDepartments = axios.get('/departments', tokenObject)
        const getEmployees = axios.get('/employees', tokenObject)

        Axios.all([getTicket, getCustomers, getDepartments, getEmployees])
            .then((responses) => {
                const [ ticketData, customersData, DepartmentsData, EmployeesData ] = responses
                const findCustomer = customersData.data.find(cust => cust._id === ticketData.data.customer)
                const findDepartment = DepartmentsData.data.find(dept => dept._id === ticketData.data.department)
                const findEmployees = ticketData.data.employees.map(employee => EmployeesData.data.find(empl => empl._id === employee._id))

                const ticket = Object.assign({}, ticketData.data, {
                    customer: { value: findCustomer._id, label: findCustomer.name },
                    department: { value: findDepartment._id, label: findDepartment.name },
                    employees: findEmployees.map(empl => ({ value: empl._id, label: empl.name}))
                })

                if(this._isMounted) {
                    this.setState({ ticket })
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
        const { ticket } = this.state
        return (
            <div>
                <h2>Edit Ticket</h2>
                { !!Object.keys(ticket).length && <TicketForm handleSubmit={this.handleSubmit} ticket={ticket} /> }
            </div>
        )
    }
}

export default EditTicket