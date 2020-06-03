import React from 'react'
import axios from '../../config/axios'
import DepartmentForm from './Form'

class EditDepartment extends React.Component {
    _isMounted = false
    constructor() {
        super()
        this.state = {
            department: {}
        }
    }

    handleSubmit = (FormData) => {
        const id = this.props.match.params.id
        axios.put(`/departments/${id}`, FormData, { headers: { 'x-auth': localStorage.getItem('authToken')}})
            .then((response) => {
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.message)
                } else {
                    alert('Updated Successfully')
                    this.props.history.push(`/departments/${id}`)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentDidMount() {
        this._isMounted = true
        const id = this.props.match.params.id
        axios.get(`/departments/${id}`, { headers: { 'x-auth': localStorage.getItem('authToken')}})
            .then((response) => {
                if(this._isMounted) {
                    this.setState({ department: response.data })
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
        const { department } = this.state 
        return (
            <div>
            <h2>Edit Department</h2>
            { !!Object.keys(department).length && <DepartmentForm department={department} handleSubmit={this.handleSubmit} /> }
            </div>
        )
    }
}

export default EditDepartment