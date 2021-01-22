import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './login.css';

class Login extends Component {
    state = {
        username: "",
        password: "",
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

    // Submit the data to the API
    async handleSubmit(e) {
        e.preventDefault();
        
        const data = {
            username: this.state.username, 
            password: this.state.password
        }

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => {
            return res.json();
        });  

        if(response.success == true) {
            // Login succeeded
            this.props.login(response.user);
        } else {
            // Login failed
            this.setState({
                errors: ["Username or password is incorrect"]
            });
        }
    }

    render() {
        return (
            <div id="login" className="container">
                { this.renderErrors() }
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter username" value={this.state.username} onChange={(e) => this.onChange({username: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" value={this.state.password} onChange={(e) => this.onChange({password: e.target.value})}/>
                    </div>
                    <button type="submit" className="btn btn-primary mr-2" onClick={(e) => this.handleSubmit(e)}>Login</button>
                    <Link to="/register">
                        <button type="button" className="btn btn-secondary">Register</button>
                    </Link>
                </form>
            </div>
        );
    }
}

export default Login;