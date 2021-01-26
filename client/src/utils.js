import { useParams } from "react-router-dom";

export function withCategory(Component) {
    return function WrappedComponent(props) {
      const { category } = useParams();
      return <Component {...props} category={category} />;
    }
}

export function withQuestionId(Component) {
    return function WrappedComponent(props) {
      const { question_id } = useParams();
      return <Component {...props} questionId={question_id} />;
    }
}

export function formatDate(date) {
  var date = new Date(date);

  const dateOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    const timeOptions = {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    };
    
    const options = {
      ...timeOptions, ... dateOptions
    };
    
    return date.toLocaleString('en-US', options);
}

export const CATEGORIES = ["Cat1", "Cat2", "Cat3", "Cat4", "Cat5"]