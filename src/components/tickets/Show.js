import React from 'react'
import axios from '../../config/axios'
import Axios from 'axios'
import { Link } from 'react-router-dom'

class ShowTicket extends React.Component {
    _isMounted = false
    constructor() {
        super()
        this.state = {
            ticket: {}
        }
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

                const ticket = Object.assign({}, ticketData.data, {
                    customer: customersData.data.find(cust => cust._id === ticketData.data.customer).name,
                    department: DepartmentsData.data.find(dept => dept._id === ticketData.data.department).name,
                    employees: ticketData.data.employees.map(employee => EmployeesData.data.find(empl => empl._id === employee._id).name).join(', ')
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
                <h2>Code : {ticket.code}</h2>
                <p>Customer : {ticket.customer}</p>
                <p>Department : {ticket.department}</p>
                <p>Employees : {ticket.employees}</p>
                <p>Message : {ticket.message}</p>
                <p>Priority : {ticket.priority}</p>
                { !ticket.isResolved && <Link to={`/tickets/edit/${this.props.match.params.id}`} >Edit</Link> }
            </div>
        )
    }
}

export default ShowTicket