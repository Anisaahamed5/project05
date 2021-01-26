import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import Answer from '../../components/answer';

import { withQuestionId, withCategory, formatDate } from '../../utils';

class ViewQuestion extends Component {
    state = {
        question: null,
        loading: true
    }

    componentDidMount() {
        this.getQuestion();
    }

    async getQuestion() {
        this.setState({loading: true});

        let question = await fetch('/api/questions/' + this.props.questionId, {
            method: 'GET'
        }).then((res) => {
            return res.json();
        });

        this.setState({question, loading: false})
    }

    renderAnswers() {
        if(this.state.question.Answers.length > 0) {
            return this.state.question.Answers.map((a) => {
                return <Answer answer={a} />;
            });
        } else {
            return <p>No answers found...</p>
        }
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
                <>
                    <div className="row">
                        <div className="col-md-9">
                            <h2> {this.state.question != null ? this.state.question.text : ""} </h2>
                            <p>
                                <span>Submitted by: {this.state.question.User.username}</span>
                                <span className="pl-4">{ formatDate(this.state.question.createdAt)}</span>
                            </p>
                        </div>
                        <div className="col-md-3">
                            <Link to={`/${this.props.category}/${this.props.questionId}/answer`}>
                                <button className="btn btn-primary mr-2 mt-4">Answer</button>
                            </Link>

                            <Link to={`/${this.props.category}/feed`}>
                                <button className="btn btn-secondary mt-4">Back</button>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mt-4">
                            <h3>Answers</h3>
                            { this.renderAnswers() }
                        </div>
                    </div>
                </>
            )
        );
    }
}

export default withCategory(withQuestionId(ViewQuestion));



// import Question from '../../components/question';

// class Main extends Component {
//     state = {
//         questions: [],
//         loading: false
//     }

//     componentDidMount() {
//         this.updateFeed();
//     }

//     componentDidUpdate(prevProps) {
//         if (prevProps.category !== this.props.category) {
//           this.updateFeed();
//         }
//     }

//     async updateFeed() {
//         this.setState({loading: true});

//         let questions = await fetch('/api/' + CATEGORIES[this.props.category] + '/feed', {
//             method: 'GET'
//         }).then((res) => {
//             return res.json();
//         });

//         this.setState({questions, loading: false})
//     }

//     renderQuestions() {
//         return this.state.questions.map((q) => {
//             return <Question question={q} />
//         });
//     }

//     render() {
//         return (
//             this.state.loading ? (
//                 <div className="d-flex justify-content-center align-items-center h-100">
//                     <Loader
//                         type="TailSpin"
//                         color="#333"
//                         height={50}
//                         width={50}            
//                     />
//                 </div>
//             ) : (
//                 this.renderQuestions()
//             )
//         )
//     }
// }

// export default withCategory(Main);