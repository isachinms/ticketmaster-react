import React from 'react'
import axios from '../../config/axios'

import TicketForm from './Form'

class AddTicket extends React.Component {

    handleSubmit = (formData) => {
        axios.post('/tickets', formData, { headers: { 'x-auth': localStorage.getItem('authToken')}})
            .then((response) => {
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.message)
                } else {
                    alert('Ticket has been created successfully')
                    this.props.history.push('/tickets')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
     
    render() {
        return (
            <div>
                <h2>Add Ticket</h2>
                <TicketForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default AddTicket