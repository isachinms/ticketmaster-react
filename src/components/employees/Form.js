import React from 'react'
import axios from '../../config/axios'

class EmployeeForm extends React.Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.state = {
            name: props.employee ? props.employee.name : '',
            email: props.employee ? props.employee.email : '',
            mobile: props.employee ? props.employee.mobile : '',
            department: props.employee ? props.employee.department._id : '',
            departments: []
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            department: this.state.department
        }
        this.props.handleSubmit(formData)
        this.setState({ name: '', email: '', mobile: '', department: ''})
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
        const { name, email, mobile, department, departments } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={name} onChange={this.handleChange} />

                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" value={email} onChange={this.handleChange} />

                <label htmlFor="mobile">Mobile</label>
                <input type="text" id="mobile" name="mobile" value={mobile} onChange={this.handleChange} />

                <label htmlFor="department">Department</label>
                <select id="department" name="department" value={department} onChange={this.handleChange}>
                    <option value="">select</option>
                    { departments.map(dept => {
                        return <option key={dept._id} value={dept._id}>{dept.name}</option>
                    })}
                </select>

                <input type="submit" />
            </form>
        )
    }
}

export default EmployeeForm