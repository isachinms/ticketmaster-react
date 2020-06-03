import React from 'react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import Welcome from './components/static/Welcome'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Logout from './components/auth/Logout'

import CustomersTable from './components/customers/Table'
import AddCustomer from './components/customers/Add'
import ShowCustomer from './components/customers/Show'
import EditCustomer from './components/customers/Edit'

import DepartmentsList from './components/departments/List'
import ShowDepartment from './components/departments/Show'
import EditDepartment from './components/departments/Edit'

import EmployeeTable from './components/employees/Table'
import AddEmployee from './components/employees/Add'
import ShowEmployee from './components/employees/Show'
import EditEmployee from './components/employees/Edit'

import TicketsList from './components/tickets/List'
import AddTicket from './components/tickets/Add'
import ShowTicket from './components/tickets/Show'
import EditTicket from './components/tickets/Edit'

function App() {
    return (
        <BrowserRouter>
        <div>
            <Link to="/" >Home </Link>
            <Link to="/customers">Customers </Link>
            <Link to="/departments">Departments </Link>
            <Link to="/employees">Employees </Link>
            <Link to="/tickets">Tickets </Link>
            <Link to="/login">Login </Link>
            <Link to="/register">Register </Link>
            <Link to="/logout">Logout </Link>

            <Switch>
            <Route path="/" component={Welcome} exact/>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/logout" component={Logout} />

            <Route path="/customers" component={CustomersTable} exact/>
            <Route path="/customers/new" component={AddCustomer} />
            <Route path="/customers/edit/:id" component={EditCustomer} />
            <Route path="/customers/:id" component={ShowCustomer} />

            <Route path="/departments" component={DepartmentsList} exact/>
            <Route path="/departments/edit/:id" component={EditDepartment} />
            <Route path="/departments/:id" component={ShowDepartment} />

            <Route path="/employees" component={EmployeeTable} exact/>
            <Route path="/employees/new" component={AddEmployee} />
            <Route path="/employees/edit/:id" component={EditEmployee} />
            <Route path="/employees/:id" component={ShowEmployee} />

            <Route path="/tickets" component={TicketsList} exact />
            <Route path="/tickets/new" component={AddTicket} />
            <Route path="/tickets/edit/:id" component={EditTicket} />
            <Route path="/tickets/:id" component={ShowTicket} />
            </Switch>
        </div>
        </BrowserRouter>
    )
}

export default App