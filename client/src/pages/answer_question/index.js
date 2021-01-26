import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withCategory, withQuestionId, CATEGORIES } from '../../utils';

import './answer_question.css';

class AnswerQuestion extends Component {
    state = {
        question: {},
        text: ""
    }

    componentDidMount() {
        this.loadQuestion();
    }

    async loadQuestion() {
        let question = await fetch('/api/questions/' + this.props.questionId, {
            method: 'GET'
        }).then((res) => {
            return res.json();
        });

        this.setState({question})
    }

    handleChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        if(this.state.text == "") return;

        let data = {
            user_id: this.props.user.id,
            text: this.state.text,
        };

        await fetch('/api/questions/' + this.props.questionId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(() => {
            this.props.history.push(`/${this.props.category}/${this.props.questionId}/question`);
        });
    }

    render() {
        return this.state.question == {} ? (
            <div>Loading...</div>
        ) : (
            <form className="new-a-form">
                <p>{this.state.question.text}</p>
                <textarea id="answer-text" className="form-control" rows="5" value={this.state.text} onChange={(e) => this.handleChange(e)}></textarea>
                
                <button type="buttons" className="btn btn-primary btn-lg" onClick={(e) => this.handleSubmit(e)}>Submit</button>
                
                <Link to={`/${this.props.category}/${this.props.questionId}/question`}>
                    <button type="button" className="btn btn-secondary btn-lg">Back to Question</button>
                </Link>
            </form>
        )
    }
}

export default withQuestionId(withRouter(withCategory(AnswerQuestion)));

