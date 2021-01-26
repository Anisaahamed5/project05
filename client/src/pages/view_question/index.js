import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

import { withQuestionId } from '../../utils';

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

    render() {
        return <h1> {this.state.question != null ? this.state.question.text : ""} </h1>;
    }
}



export default withQuestionId(ViewQuestion);



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