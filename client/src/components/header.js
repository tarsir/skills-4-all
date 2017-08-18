import React, { Component } from 'react';
import { Link} from 'react-router-dom';

import { isLoggedIn, getCurrentUser } from '../api/auth_methods';

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
            isLoggedIn: false,
            loadingData: false
        };
    }

    componentDidMount() {
        // we use this to trigger a component update on user login
        if (isLoggedIn()) {
            this.setState({isLoggedIn: true});
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.loadingData) {
            return false;
        }
        return true;
    }

    componentDidUpdate(prevProps, prevState) {
        if (isLoggedIn() && !prevState.isLoggedIn) {
            this.setState({loadingData: true});
            getCurrentUser().then((response) => {
                return response.json();
            }).then((respJson) => {
                this.setState({currentUser: respJson, isLoggedIn: true, loadingData: false});
            });
        }
        else if (!isLoggedIn() && prevState.currentUser) {
            this.setState({currentUser: null, isLoggedIn: false, loadingData: false});
        }
    }

    render() {
        let authLink, userGreeting, userListLink, registerLink;

        if (this.state.currentUser) {
            userGreeting = <li><h4><UserGreeting name={this.state.currentUser.first_name} userId={this.state.currentUser.id} /></h4></li>;
            authLink = <li><h4><Link to="/logout">Logout</Link></h4></li>;
            userListLink = <li><h4><Link to="/users">User List</Link></h4></li>;
        } else {
            authLink = <li><h4><Link to="/login">Login</Link></h4></li>;
            registerLink = <li><h4><Link to="/users/new">Register</Link></h4></li>;
        }

        return (
            <div className="App-header">
                <ul className="navbar">
                    <li><h2 className="title"><Link to="/">Skillz 4 All</Link></h2></li>
                    { userListLink }
                    { userGreeting }
                    { authLink }
                    { registerLink }
                </ul>
            </div>
        );
    }
}

