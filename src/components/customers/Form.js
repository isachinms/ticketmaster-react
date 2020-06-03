import React from 'react'

class CustomerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.customer ? props.customer.name : '',
            email: props.customer ? props.customer.email : '',
            mobile: props.customer ? props.customer.mobile : ''
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
            mobile: this.state.mobile
        }
        this.props.handleSubmit(formData)
        this.setState({ name: '', email: '', mobile: ''})
    }

    render() {
        const { name, email, mobile } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Name </label>
                <input type="text" id="name" name="name" value={name} onChange={this.handleChange} />

                <label htmlFor="email">Email </label>
                <input type="text" id="email" name="email" value={email} onChange={this.handleChange} />

                <label htmlFor="mobile">Mobile </label>
                <input type="text" id="mobile" name="mobile" value={mobile} onChange={this.handleChange} />

                <input type="submit" />
            </form>
        )
    }
}

export default CustomerForm