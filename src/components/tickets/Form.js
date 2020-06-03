import React from 'react'
import axios from '../../config/axios'
import Axios from 'axios'
import Select from 'react-select'

class TicketForm extends React.Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.state = {
            code: props.ticket ? props.ticket.code : '',
            customer: props.ticket ? props.ticket.customer : '',
            department: props.ticket ? props.ticket.department : '',
            employees: props.ticket ? props.ticket.employees : '',
            message: props.ticket ? props.ticket.message : '',
            priority: props.ticket ? props.ticket.priority : '',
            allCustomers: [],
            allDepartments: [],
            allEmployees: [],
            priorities: ['Low', 'Medium', 'High']
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleDropdownChange = (selectedValue, field) => {
        this.setState({ [field.name] : selectedValue })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            code: this.state.code,
            customer: this.state.customer.value,
            department: this.state.department.value,
            employees: this.state.employees ? this.state.employees.map(empl => ({ _id: empl.value })) : this.state.employees ,
            message: this.state.message,
            priority: this.state.priority
        }
        this.props.handleSubmit(formData)
    }

    componentDidMount() {
        this._isMounted = true
        const tokenObject = { headers: { 'x-auth': localStorage.getItem('authToken')}}
        const getCustomers = axios.get('/customers', tokenObject)
        const getDepartments = axios.get('/departments', tokenObject)
        const getEmployees = axios.get('/employees', tokenObject)
        Axios.all([getCustomers, getDepartments, getEmployees])
            .then((responses) => {
                const allCustomers = responses[0].data
                const allDepartments = responses[1].data
                const allEmployees = responses[2].data.filter(empl => empl.department)
                if(this._isMounted) {
                    this.setState({ allCustomers, allDepartments, allEmployees })
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
        const { code, customer, department, employees, message, priority, allCustomers, allDepartments, allEmployees, priorities } = this.state
        const customerOptions = allCustomers.map(cust => ({ value: cust._id, label: cust.name }))
        const departmentOptions = allDepartments.map(dept => ({ value: dept._id, label: dept.name }))
        const employeeOptions = allEmployees.filter(empl => empl.department._id === department.value).map(employee => ({ value: employee._id, label: employee.name }))

        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="code">Code </label>
                <input type="text" id="code" name="code" value={code} onChange={this.handleChange} /><br/><br/>

                <label htmlFor="customer">Customer </label>
                <Select id="customer" name="customer" options={customerOptions} value={customer} onChange={this.handleDropdownChange} /><br/><br/>

                <label htmlFor="department">Department </label>
                <Select id="department" name="department" options={departmentOptions} value={department} onChange={this.handleDropdownChange} /><br/><br/>

                <label htmlFor="employees">Employees </label>
                <Select id="code" name="employees" options={employeeOptions} isMulti value={employees} onChange={this.handleDropdownChange} /><br/><br/>

                <label htmlFor="message">Message </label>
                <textarea type="text" id="message" name="message" value={message} onChange={this.handleChange} /><br/><br/>

                <label htmlFor="priority">Priority</label>
                { priorities.map((prior, i) => {
                    return <label htmlFor={prior} key={i}><input type="radio" id={prior} name="priority" checked={priority === prior} value={prior} onChange={this.handleChange} />{prior}</label>
                }) }
                <br/><br/>

                <input type="submit" />
            </form>
        )
    }
}

export default TicketForm