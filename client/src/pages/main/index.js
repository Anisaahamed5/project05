import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

import Question from '../../components/question';

import { withCategory, CATEGORIES } from '../../utils';

class Main extends Component {
    state = {
        questions: [],
        loading: false
    }

    componentDidMount() {
        this.updateFeed();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.category !== this.props.category) {
          this.updateFeed();
        }
    }

    async updateFeed() {
        this.setState({loading: true});

        let questions = await fetch('/api/' + CATEGORIES[this.props.category] + '/feed', {
            method: 'GET'
        }).then((res) => {
            return res.json();
        });

        this.setState({questions, loading: false})
    }

    renderQuestions() {
        return this.state.questions.map((q) => {
            return <Question question={q} />
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
                this.renderQuestions()
            )
        )
    }
}

export default withCategory(Main);