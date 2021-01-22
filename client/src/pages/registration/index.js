import React, { Component } from 'react';

import './registration.css';

class Registration extends Component {
    state = {
        username: "",
        password: "",
        password2: "",
        errors: []
    }

    onChange(data) {
        this.setState({...data, errors: []});
    }

    renderErrors() {
        return <ul className="text-danger pl-3">
            {
                this.state.errors.map((error) => {
                    return <li>{error}</li>
                })
            }
        </ul>;
    }

    handleSubmit() {
        let errors = [];

        if(this.state.password != this.state.password2) {
            errors.push("Passwords do not match")
        }

        // Other validity checks
        //

        this.setState({
            errors
        });

        if(errors.length < 1) {
            this.submit();
        }
    }

    // Submit the data to the API
    submit() {
        const data = {
            username: this.state.username, 
            password: this.state.password
        }

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });  
    }

    render() {
        return (
            <div id="registration" className="container">
                { this.renderErrors() }
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter username" value={this.state.username} onChange={(e) => this.onChange({username: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password1">Password</label>
                        <input type="password" className="form-control" id="password1" placeholder="Password" value={this.state.password} onChange={(e) => this.onChange({password: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password2" placeholder="Repeat Password" value={this.state.password2} onChange={(e) => this.onChange({password2: e.target.value})}/>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => this.handleSubmit()}>Register</button>
                </form>
            </div>
        );
    }
}

export default Registration;