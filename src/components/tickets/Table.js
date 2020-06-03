import React from 'react'
import { Link } from 'react-router-dom'

function TicketsTable(props) {

    return (
        <table border="1">
            <thead>
                <tr>
                    <th>Code No.</th>
                    <th>Customer</th>
                    <th>Department</th>
                    <th>Employees</th>
                    <th>Message</th>
                    <th>Priority</th>
                    <th>Actions</th>
                    <th>Remove</th>
                    <th>{ props.ticketType === 'pending' ? 'Close?' : 'Reopen?' }</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.tickets.map(ticket => {
                        return (
                            <tr key={ticket._id} >
                                <td>{ticket.code}</td>
                                <td>{ticket.customer}</td>
                                <td>{ticket.department}</td>
                                <td>{ticket.employees}</td>
                                <td>{ticket.message}</td>
                                <td>{ticket.priority}</td>
                                <td><Link to={`/tickets/${ticket._id}`} >Show</Link></td>
                                <td><button onClick={() => props.handleRemove(ticket._id)}>Remove</button></td>
                                <td><input type="checkbox" onChange={() => props.handleCheck(ticket)} /></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default TicketsTable