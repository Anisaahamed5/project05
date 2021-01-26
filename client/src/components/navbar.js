export default function(props) {
    return <div className="navbar d-flex justify-content-center mb-4" style={{'border': '1px solid black', 'borderTop': 'none'}}>
        <h1>{props.title}</h1>

        <div style={{'position': 'absolute', 'right': '10px'}}>
            <span>Welcome, {props.user.username}</span>
            <button type="button" className="btn btn-danger ml-2" onClick={props.logout}>Log out</button>
        </div>
    </div>;
}