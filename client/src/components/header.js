import React, { Component } from 'react';
import { Switch, Route, Redirect, Link} from 'react-router-dom';

import { isLoggedIn } from '../api/user_api';
import logo from '../logo.svg';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let authLink;

        if (isLoggedIn()) {
            authLink = <Link to="/logout">Logout</Link>;
        } else {
            authLink = <Link to="/login">Login</Link>;
        }

        return (
            <div className="App-header">
                <h2>Skills 4 All</h2>
                { authLink }
            </div>
        );
    }
}

