import React, { Component } from 'react';

class Main extends Component {
    state = {

    }

    render() {
        return <>
            <h1>Welcome to the Dashboard {this.props.user.username}!</h1>
        </>;
    }
}

export default Main;