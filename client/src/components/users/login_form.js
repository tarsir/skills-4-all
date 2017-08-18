import React from 'react';

import { Switch, Redirect} from 'react-router-dom';

import { login } from '../../api/user_api';
import { saveAuthToken } from '../../api/auth_methods';

import { FormInput, FormPassword } from '../form/inputs';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        login(this.state).then((resp) => {
            return resp.json();
        }).catch((error) => {
            console.log(error);
        }).then((respJson) => {
            console.log(respJson);
            if (!respJson.error) {
                saveAuthToken(respJson);
                this.props.successHandler();
            } else {
                alert("Password incorrect, please try again.");
            }
        });
    }

    onPasswordChange(event) {
        this.setState({password: event.target.value });
    }

    onEmailChange(event) {
        this.setState({email: event.target.value });
    }

    render() {
        return (
            <div className="login-form-container">
                <fieldset>
                    <legend>Login</legend>
                    <form onSubmit={this.handleSubmit}>
                        <FormInput labelText="Email" value={this.state.email} changeHandler={this.onEmailChange} />
                        <FormPassword labelText="Password" value={this.state.password} changeHandler={this.onPasswordChange} />
                        <div className="form-item">
                            <input type="submit" className="button" value="Login" />
                        </div>
                    </form>
                </fieldset>
            </div>
        );
    }
}

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginSuccessful: false
        };

        this.redirectToUserList = this.redirectToUserList.bind(this);
    }

    redirectToUserList() {
        this.setState({ loginSuccessful: true });
    }

    render() {
        let redirect;
        if (this.state.loginSuccessful) {
            redirect = <Redirect to="/users" />;
        }

        return (
            <Switch>
                {redirect}
                <LoginForm successHandler={this.redirectToUserList} />
            </Switch>
        );
    }
}
