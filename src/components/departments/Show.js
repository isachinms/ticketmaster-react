import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class ShowDepartment extends React.Component {
    _isMounted = false
    constructor() {
        super() 
        this.state = {
            department: {}
        }
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
        return (
            <div>
                <h2>Name - {this.state.department.name}</h2>
                <Link to={`/departments/edit/${this.props.match.params.id}`} >Edit</Link>
            </div>
        )
    }
}

export default ShowDepartment