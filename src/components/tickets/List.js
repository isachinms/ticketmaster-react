import React from 'react'
import axios from '../../config/axios'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { Chart } from 'react-google-charts'
import TicketsTable from './Table'

class TicketsList extends React.Component {
    _isMounted = false
    constructor() {
        super()
        this.state = {
            tickets: [],
            ticketType: "pending",
            departments: []
        }
    }

    handleTicketType = (e) => {
        this.setState({ ticketType: e.target.value })
    }

    handleRemove = (id) => {
        const confirmRemove = window.confirm('Are you sure you want to remove?')
        if(confirmRemove){
            axios.delete(`/tickets/${id}`, { headers: { 'x-auth': localStorage.getItem('authToken')}})
            .then((response) => {
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.message)
                } else {
                    if(this._isMounted){
                        this.setState((prevState) => ({
                            tickets: prevState.tickets.filter(ticket => ticket._id !== response.data._id)
                        }))
                        alert('Removed Successfully')
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    handleCheck = (ticket) => {
        axios.put(`/tickets/${ticket._id}`, { isResolved: !ticket.isResolved }, { headers: { 'x-auth': localStorage.getItem('authToken')}})
            .then((response) => {
                const updatedTicket = response.data
                if(this._isMounted){
                    this.setState((prevState) => ({
                        tickets: prevState.tickets.map(ticket => ticket._id === updatedTicket._id ? Object.assign(ticket, { isResolved: updatedTicket.isResolved}) : ticket )
                    }))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    generatePieChartData = (pendingTickets) => {
        const chartData = [[ 'Priority', 'No of tickets'], ['High', 0], ['Medium', 0], ['Low', 0]]
        if(pendingTickets.length === 0) {
            return chartData
        } else {
            pendingTickets.forEach(ticket => {
                if(ticket.priority === 'High') {
                    chartData[1][1] += 1 
                } else if (ticket.priority === 'Medium') {
                    chartData[2][1] += 1
                } else {
                    chartData[3][1] += 1
                }
            })
            return chartData
        }
    }

    generateBarChartData = (pendingTickets) => {
        const chartData = [[ 'Department', 'Tickets' ]]
        this.state.departments.forEach(department => {
            let count = 0
            pendingTickets.forEach(ticket => {
                if(ticket.department === department.name) {
                    count++
                }
            })
            chartData.push([ department.name, count])
        })
        return chartData
    }

    componentDidMount() {
        this._isMounted = true
        const tokenObject = { headers: { 'x-auth': localStorage.getItem('authToken')}}
        const getTickets = axios.get('/tickets', tokenObject)
        const getCustomers = axios.get('/customers', tokenObject)
        const getDepartments = axios.get('/departments', tokenObject)
        const getEmployees = axios.get('/employees', tokenObject)

        Axios.all([getTickets, getCustomers, getDepartments, getEmployees])
            .then((responses) => {
                const [ ticketsData, customersData, departmentsData, employeesData ] = responses

                const tickets = ticketsData.data.map(ticket => (Object.assign({}, ticket, {
                    customer: customersData.data.find(cust => cust._id === ticket.customer).name,
                    department: departmentsData.data.find(dept => dept._id === ticket.department).name,
                    employees: ticket.employees.map(employee => employeesData.data.find(empl => empl._id === employee._id).name).join(', ')
                })))

                if(this._isMounted) {
                    this.setState({ tickets, departments: departmentsData.data })
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
        const { tickets, ticketType } = this.state
        const pendingTickets = tickets.filter(ticket => !ticket.isResolved)
        const completedTickets = tickets.filter(ticket => ticket.isResolved)
        const completionRate = tickets.length ? Math.round(completedTickets.length / tickets.length * 100) + '%' : '0%'
        
        return (
            <div>
                <h2>Tickets - {tickets.length} </h2>
                <input type="radio" id="pending" checked={ticketType === 'pending'} value="pending" onChange={this.handleTicketType} /><label htmlFor="pending" >Pending</label>
                <input type="radio" id="completed" checked={ticketType === 'completed'} value="completed" onChange={this.handleTicketType} /><label htmlFor="completed" >Completed</label>
                <TicketsTable ticketType={ticketType} tickets={ticketType === 'pending' ? pendingTickets : completedTickets} handleCheck={this.handleCheck} handleRemove={this.handleRemove} />
                <Link to="/tickets/new" >Add ticket</Link>

                <label>Completed Tickets - {completionRate}</label>
                <div>
                    <div role="progressbar" min="0" max="100" style={{width: completionRate}}>{completionRate}</div>
                </div>
                
                <h2>Data on Pending Tickets</h2>
                <Chart chartType="PieChart" width="100%" height="400px" data={this.generatePieChartData(pendingTickets)} options={{ "title": "Ticket Priority", pieHole: 0.4, is3D: false}}/>
                <Chart chartType="Bar" width="600px" height="300px" data={this.generateBarChartData(pendingTickets)} options={{ chart: {"title": "Pending Tickets by Department"}}} />
            </div>
        )
    }
}

export default TicketsList