import './question.css';
import { Link, useParams } from 'react-router-dom';

import { formatDate } from '../utils';

export default function Question(props) {
    // props.question = {
    //     "id": 2,
    //     "text": "How do I answer a question?",
    //     "category": "Cat2",
    //     "createdAt": "2021-01-21T05:53:15.000Z",
    //     "updatedAt": "2021-01-21T05:53:15.000Z",
    //     "UserId": 1
    // }

    const { category } = useParams();

    return <div className="question">
        <p className="question-row">
            <span>{ formatDate(props.question.createdAt)}</span>
            <span>by: {props.question.User.username}</span>
            <span>{ props.question.Answers.length } Answers</span>
        </p>
        <Link to={`/${category}/${props.question.id}/question`}>
            <p>{props.question.text}</p>
        </Link>
    </div>;
}