import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class ShowCustomer extends React.Component {
    _isMounted = false
    constructor() {
        super()
        this.state = {
            customer: {}
        }
    }

    componentDidMount() {
        this._isMounted = true
        const id = this.props.match.params.id
        axios.get(`/customers/${id}`, { headers: { 'x-auth': localStorage.getItem('authToken')}})
            .then((response) => {
                console.log(response.data)
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
        const { customer } = this.state
        return (
            <div>
                <h3>Name : {customer.name}</h3>
                <p>Email : {customer.email}</p>
                <p>Mobile: {customer.mobile}</p>
                <Link to={`/customers/edit/${this.props.match.params.id}`} >Edit</Link>
            </div>
        )
    }
}

export default ShowCustomer