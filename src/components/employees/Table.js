import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../../config/axios'

class EmployeeTable extends React.Component {
    _isMounted = false
    constructor() {
        super()
        this.state = {
            employees: []
        }
    }

    handleRemove = (id) => {
        const confirmRemove = window.confirm('Are you sure you want to remove?')
        if(confirmRemove) {
            axios.delete(`/employees/${id}`, { headers: { 'x-auth': localStorage.getItem('authToken')} })
            .then((response) => {
                if(this._isMounted) {
                    this.setState((prevState) => ({
                        employees: prevState.employees.filter(empl => empl._id !== response.data._id)
                    }))
                    alert('Removed Successfully')
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }             
    }

    componentDidMount() {
        this._isMounted = true
        axios.get('/employees', { headers: { 'x-auth': localStorage.getItem('authToken')}})
            .then((response) => {
                if(this._isMounted) {
                    this.setState({ employees: response.data.filter(empl => empl.department) })
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
        const { employees } = this.state
        return (
            <div>
                <h2>Employees - {employees.length}</h2>
                <table border="1px">
                <thead>
                    <tr>
                        <th>Sl. No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Department</th>
                        <th>Action</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    { employees.map((empl,i) => {
                        return <tr key={empl._id}>
                            <td>{i+1}</td>
                            <td>{empl.name}</td>
                            <td>{empl.email}</td>
                            <td>{empl.mobile}</td>
                            <td>{empl.department ? empl.department.name : null}</td>
                            <td><Link to={`/employees/${empl._id}`} >show</Link></td>
                            <td><button onClick={() => this.handleRemove(empl._id)}>remove</button></td>
                        </tr>
                    }) }
                </tbody>
                </table>
                <Link to="/employees/new">Add Employee</Link>
            </div>
        )
    }
}

export default EmployeeTable