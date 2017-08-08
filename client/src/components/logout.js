import React, { Component } from 'react';
import { Switch, Route, Redirect, Link} from 'react-router-dom';

import { logout } from '../api/user_api';

export default class Logout extends Component {
    constructor(props) {
        super(props);
    }

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

