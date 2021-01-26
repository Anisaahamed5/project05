import './question.css';
import { Link, useParams } from 'react-router-dom';

import { formatDate } from '../utils';

export default function Answer(props) {
    // props.answer = {
    //     "id": 6,
    //     "text": "Like this!",
    //     "createdAt": "2021-01-26T22:45:23.000Z",
    //     "updatedAt": "2021-01-26T22:45:23.000Z",
    //     "QuestionId": 2,
    //     "UserId": 9
    //   }

    const { category } = useParams();

    return <div className="answer mb-5">
        <p className="answer-row">
            <strong>
                <span>{props.answer.User.username} ({ formatDate(props.answer.createdAt)})</span>
            </strong>
        </p>
        <p>
            {props.answer.text}
        </p>
    </div>;
}