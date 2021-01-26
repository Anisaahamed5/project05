export default function(props) {
    return <div className="navbar d-flex justify-content-center mb-4" style={{'border': '1px solid black', 'borderTop': 'none'}}>
        <h1>{props.title}</h1>
        <button type="button" className="btn btn-danger pull-right" onClick={props.logout} style={{'position': 'absolute', 'right': '15px'}}>Log out</button>
    </div>;
}