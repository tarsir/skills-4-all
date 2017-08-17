import React, { Component } from 'react';
import { Switch, Route, Redirect, Link} from 'react-router-dom';

import { isLoggedIn, getCurrentUser } from '../api/auth_methods';
import logo from '../logo.svg';

function UserGreeting(props) {
    return (
        <div>
            <span className="user-greeting"><Link to={"/users/" + props.userId}>Hi, {props.name}!</Link></span>
        </div>
    );
}

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isLoggedIn: false
        };
    }

    componentDidMount() {
        // we use this to trigger a component update on user login
        if (isLoggedIn()) {
            this.setState({isLoggedIn: true});
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.currentUser) {
            getCurrentUser().then((response) => {
                return response.json();
            }).then((respJson) => {
                this.setState({currentUser: respJson});
            });
        }
        else if (!isLoggedIn()) {
            this.setState({currentUser: null});
        }
    }

    render() {
        let authLink, userGreeting;

        if (this.state.currentUser) {
            userGreeting = <UserGreeting name={this.state.currentUser.first_name} userId={this.state.currentUser.id} />;
            authLink = <Link to="/logout">Logout</Link>;
        } else {
            authLink = <Link to="/login">Login</Link>;
        }

        return (
            <div className="App-header">
                <ul className="navbar">
                    <li><h2 className="title"><Link to="/">Skills 4 All</Link></h2></li>
                    <li>{ userGreeting }</li>
                    <li>{ authLink }</li>
                </ul>
            </div>
        );
    }
}

