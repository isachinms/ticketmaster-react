import React from 'react'
import axios from '../../config/axios'
import CustomerForm from './Form'

class EditCustomer extends React.Component {
    _isMounted = false
    constructor() {
        super()
        this.state = {
            customer: {}
        }
    }

    handleSubmit = (FormData) => {
        const id = this.props.match.params.id
        axios.put(`/customers/${id}`, FormData, { headers: { 'x-auth': localStorage.getItem('authToken')}})
            .then((response) => {
                console.log(response.data)
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.message)
                } else {
                    alert('Customer has been updated successfully')
                    this.props.history.push(`/customers/${id}`)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentDidMount() {
        this._isMounted = true
        const id = this.props.match.params.id
        axios.get(`/customers/${id}`, { headers: { 'x-auth': localStorage.getItem('authToken')}})
            .then((response) => {
                const customer = response.data
                if(this._isMounted){
                    this.setState({ customer })
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
        return (
            <div>
                <h2>Edit Customer</h2>
                { !!Object.keys(this.state.customer).length && <CustomerForm customer={this.state.customer} handleSubmit={this.handleSubmit} /> }
            </div>
        )
    }
}

export default EditCustomer