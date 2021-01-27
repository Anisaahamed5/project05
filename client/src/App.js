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
  //routes for navigation
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
      //routes for navigation if logged in
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
        <Route path="/:category/:category/new_question">
          {/* navigation component has header and sidebar */}
          <Navigation logout={() => this.logout()} user={this.state.user}>
            <NewQuestion user={this.state.user} />
          </Navigation>
        </Route>
        <Route path="/:category/:question_id/question">
          <Navigation logout={() => this.logout()} user={this.state.user}>
            <ViewQuestion />
          </Navigation>
        </Route>
        <Route path="/:category/:question_id/answer">
          <Navigation logout={() => this.logout()} user={this.state.user}>
            <AnswerQuestion user={this.state.user} />
          </Navigation>
        </Route>
        <Route path="/:category/feed">
          <Navigation logout={() => this.logout()} user={this.state.user}>
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

export default App;