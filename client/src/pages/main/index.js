import React, { Component } from 'react';
import { useParams } from "react-router-dom";

import Loader from 'react-loader-spinner'

class Main extends Component {
    state = {
        questions: [],
        loading: false
    }

    async componentDidMount() {
        this.setState({loading: true});

        let { category } = useParams();
        let response = await fetch('/api/feed/' + category, {
            method: 'GET'
        });
    }

    render() {
        return (
            this.state.loading ? (
                <div className="d-flex justify-content-center align-items-center h-100">
                    <Loader
                        type="TailSpin"
                        color="#333"
                        height={50}
                        width={50}            
                    />
                </div>
            ) : (
                <h1>Loaded!</h1>
            )
        )
    }
}

export default Main;