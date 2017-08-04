import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom';
import logo from './logo.svg';
import Home from './components/home';
import Users from './components/users/user_list';
import './App.css';

class Header extends Component {
  render() {
    return (
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
    );
  }
}

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/users' component={Users} />
        </Switch>
      </div>
    );
  }
}

class App extends Component {
  componentDidMount() {
    window.fetch('/users')
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.log(error));
  }

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
