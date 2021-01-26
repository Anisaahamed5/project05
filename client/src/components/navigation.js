import { useParams } from "react-router-dom";

import Navbar from './navbar';
import Sidebar from './sidebar';

import { CATEGORIES } from '../utils';

export default function(props) {
    const { category } = useParams();

    return <>
        <Navbar title={category ? "Q&A App > " + CATEGORIES[category] : "Q&A App"} logout={props.logout} user={props.user}></Navbar>
        <div className="row">
            <div className="col-md-3">
                <Sidebar categories={CATEGORIES} category={category}></Sidebar>
            </div>
            <div className="col-md-9">
                { props.children }
            </div>
        </div>
    </>;
}