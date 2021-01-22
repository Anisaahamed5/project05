import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Login from './pages/login';
import Registration from './pages/registration';
import Main from './pages/main';
import NewQuestion from './pages/new_question';
import ViewQuestion from './pages/view_question';
import AnswerQuestion from './pages/answer_question';

import Navigation from './components/navigation';

import './App.css';

class App extends Component {
  state = { 
    user: JSON.parse(localStorage.getItem('user')) || null
  }

  login(user) {
    this.setState({
      user
    }, () => {
      localStorage.setItem('user', JSON.stringify(this.state.user))
    })
  }

  logout() {
    this.setState({
      user: null
    }, () => {
      localStorage.removeItem('user')
    })
  }

  authenticatedRoutes() {
    if(this.state.user == null) {
      return [
        <Route path="/login">
          <Login login={(user) => this.login(user)}/>
        </Route>,
        <Route path="/register">
          <Registration login={(user) => this.login(user)}/>
        </Route>,
        <Route path="/">
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      </Route>];
    } else {
      return <>
        <Route path="/login">
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        </Route>
        <Route path="/register">
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        </Route>
        <Route path="/:category/new_question">
          <Navigation logout={() => this.logout()}>
            <NewQuestion />
          </Navigation>
        </Route>
        <Route path="/:category/:question_id/question">
          <Navigation logout={() => this.logout()}>
            <ViewQuestion />
          </Navigation>
        </Route>
        <Route path="/:category/:question_id/answer">
          <Navigation logout={() => this.logout()}>
            <AnswerQuestion />
          </Navigation>
        </Route>
        <Route path="/:category/feed">
          <Navigation logout={() => this.logout()}>
            <Main user={this.state.user} logout={() => this.logout()}/>
          </Navigation>
        </Route>
        <Route path="/">
          <Redirect 
            to={{
              pathname: "/0/feed",
            }}
          />
        </Route>
      </>
    }
  }
  
  render() {
    return <Router>
        <Switch>
          { this.authenticatedRoutes() }
        </Switch>
    </Router>
  }
}

// import logo from './logo.svg';

// import './App.css';

// class App extends Component {
//   state = {
//     response: '',
//     post: '',
//     responseToPost: '',
//   };
  
//   componentDidMount() {
//     this.callApi()
//       .then(res => this.setState({ response: res.express }))
//       .catch(err => console.log(err));
//   }
  
//   callApi = async () => {
//     const response = await fetch('/api/hello');
//     const body = await response.json();
//     if (response.status !== 200) throw Error(body.message);
    
//     return body;
//   };
  
//   handleSubmit = async e => {
//     e.preventDefault();
//     const response = await fetch('/api/world', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ post: this.state.post }),
//     });
//     const body = await response.text();
    
//     this.setState({ responseToPost: body });
//   };
  
// render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//         <p>{this.state.response}</p>
//         <form onSubmit={this.handleSubmit}>
//           <p>
//             <strong>Post to Server:</strong>
//           </p>
//           <input
//             type="text"
//             value={this.state.post}
//             onChange={e => this.setState({ post: e.target.value })}
//           />
//           <button type="submit">Submit</button>
//         </form>
//         <p>{this.state.responseToPost}</p>
//       </div>
//     );
//   }
// }

export default App;