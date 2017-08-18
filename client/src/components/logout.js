import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { logout } from '../api/user_api';

export default class Logout extends Component {
    componentDidMount() {
        logout();
    }

    render() {
        return (
            <Switch>
                <Redirect to="/" />
            </Switch>
        );
    }
}

