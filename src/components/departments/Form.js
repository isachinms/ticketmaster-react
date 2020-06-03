import React from 'react'

class DepartmentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.department ? props.department.name : ''
        }
    }

    handleChange = (e) => {
        this.setState({ name: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = { name: this.state.name }
        this.props.handleSubmit(formData)
        this.setState({ name: ''})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.name} onChange={this.handleChange} />
                <input type="submit" />
            </form>
        )
    }
}

export default DepartmentForm