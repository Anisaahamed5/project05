import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withCategory, CATEGORIES } from '../../utils';

import './new_question.css';

class NewQuestion extends Component {
    state = {
        text: ""
    }

    handleChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        let data = {
            user_id: this.props.user.id,
            text: this.state.text,
            category: CATEGORIES[this.props.category]
        };

        console.log(data);

        await fetch('/api/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(() => {
            this.props.history.push(`/${this.props.category}/feed`);
        });
    }

    render() {
        return <form className="new-q-form">
            <p>{this.props.user.username}, submit your question: </p>
            <textarea id="question-text" className="form-control" rows="5" value={this.state.text} onChange={(e) => this.handleChange(e)}></textarea>
            
            <button type="buttons" className="btn btn-primary btn-lg" onClick={(e) => this.handleSubmit(e)}>Submit</button>
            
            <Link to={`/${this.props.category}/feed`}>
                <button type="button" className="btn btn-secondary btn-lg">Back to Questions</button>
            </Link>
        </form>;
    }
}

export default withRouter(withCategory(NewQuestion));

