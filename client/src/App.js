import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom';
import Home from './components/home';
import Header from './components/header';
import Users from './components/users/users';
import Login from './components/users/login_form';
import Logout from './components/logout';
import './App.css';
import './assets/kube/kube.css';

class Main extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route path='/users' component={Users} />
        </Switch>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
