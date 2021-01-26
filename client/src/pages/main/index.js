import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import Question from '../../components/question';

import { withCategory, CATEGORIES } from '../../utils';

import './main.css';

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

    // map is only used on lists, questions is an []. 
    // map takes in a function and applies it to every item in a list, then creates a new list with the results.

    renderQuestions() {
        return this.state.questions.map((q) => {
            return <Question question={q} />;
        });
    }

    // Ternary operator: expression ? true : false;
    // The list of questions are rendered below
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
                <>
                    <Link to={`/${this.props.category}/${this.props.category}/new_question`}>
                        <button className="btn btn-primary new-q-button">New Question</button>
                    </Link>
                    { this.renderQuestions() }
                </>
            )
        )
    }
}

export default withCategory(Main);