import React from 'react'
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'

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

const ProtectedRoute = ({ component: Component, ...rest}) => {
    const isAuthenticated = localStorage.getItem('authToken')
    return (
        <Route {...rest} 
            render={props => (
                isAuthenticated ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location}}} />
            )}
        />
    )
}

function App() {
    const isAuthenticated = localStorage.getItem('authToken')
    return (
        <BrowserRouter>
        <div>
            { isAuthenticated ? (
                <div>
                    <Link to="/" >Home </Link>
                    <Link to="/customers">Customers </Link>
                    <Link to="/departments">Departments </Link>
                    <Link to="/employees">Employees </Link>
                    <Link to="/tickets">Tickets </Link>
                    <Link to="/logout">Logout </Link>
                </div> ) : (
                    <div>
                        <Link to="/" >Home </Link>
                        <Link to="/login">Login </Link>
                        <Link to="/register">Register </Link>
                    </div>
                )
            }

            <Switch>
            <Route path="/" component={Welcome} exact/>
            <Route path="/login" component={Login} exact/>
            <Route path="/register" component={Register} exact/>
            <ProtectedRoute path="/logout" component={Logout} exact/>

            <ProtectedRoute path="/customers" component={CustomersTable} exact/>
            <ProtectedRoute path="/customers/new" component={AddCustomer} exact/>
            <ProtectedRoute path="/customers/edit/:id" component={EditCustomer} exact/>
            <ProtectedRoute path="/customers/:id" component={ShowCustomer} exact/>

            <ProtectedRoute path="/departments" component={DepartmentsList} exact/>
            <ProtectedRoute path="/departments/edit/:id" component={EditDepartment} exact/>
            <ProtectedRoute path="/departments/:id" component={ShowDepartment} exact/>

            <ProtectedRoute path="/employees" component={EmployeeTable} exact/>
            <ProtectedRoute path="/employees/new" component={AddEmployee} exact/>
            <ProtectedRoute path="/employees/edit/:id" component={EditEmployee} exact/>
            <ProtectedRoute path="/employees/:id" component={ShowEmployee} exact/>

            <ProtectedRoute path="/tickets" component={TicketsList} exact />
            <ProtectedRoute path="/tickets/new" component={AddTicket} exact/>
            <ProtectedRoute path="/tickets/edit/:id" component={EditTicket} exact/>
            <ProtectedRoute path="/tickets/:id" component={ShowTicket} exact/>

            <Route path="*" component={() => <div>404 : Page Not Found</div>} />
            </Switch>
        </div>
        </BrowserRouter>
    )
}

export default App