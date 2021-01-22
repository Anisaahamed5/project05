import { Link } from 'react-router-dom';

export default function(props) {
    return <>
        <ul className="list-unstyled d-flex flex-column" style={{'margin-top': '-1.5rem'}}>
            {
                props.categories.map((cat, index) => {
                    return <Link to={`/${props.categories.indexOf(cat)}/feed`}>
                        <li className={index == props.category ? "py-4 text-center bg-secondary text-white" : "py-4 text-center"} style={{'border': '1px solid black', 'border-top': 'none', 'width': '100%'}}>
                            {cat}
                        </li>
                    </Link>
                })
            }
        </ul>
    </>
}