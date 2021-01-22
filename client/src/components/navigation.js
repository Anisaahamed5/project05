import { useParams } from "react-router-dom";

import Navbar from './navbar';
import Sidebar from './sidebar';

export default function(props) {
    const categories = ["Cat1", "Cat2", "Cat3", "Cat4", "Cat5"]
    const { category } = useParams();

    return <>
        <Navbar title={category ? "Q&A App > " + categories[category] : "Q&A App"} logout={props.logout}></Navbar>
        <div className="row">
            <div className="col-md-3">
                <Sidebar categories={categories} category={category}></Sidebar>
            </div>
            <div className="col-md-9">
                { props.children }
            </div>
        </div>
    </>;
}