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

export const CATEGORIES = ["Cat1", "Cat2", "Cat3", "Cat4", "Cat5"]