import React from 'react';
import PropTypes from 'prop-types';

import { Switch, Route, Redirect} from 'react-router-dom';

import { getUserById, updateUser, addNewUser } from '../../api/user_api';
import { FormPassword, FormInput } from '../form/inputs';

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName : "",
            lastName : "",
            email : "",
            password : "",
            password_confirmation : "",
            isNewUser: true
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFNameChange = this.handleFNameChange.bind(this);
        this.handleLNameChange = this.handleLNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this);
    }

    handleFNameChange(event) {
        this.setState({firstName: event.target.value});
    }

    handleLNameChange(event) {
        this.setState({lastName: event.target.value});
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handlePasswordConfirmChange(event) {
        this.setState({password_confirmation: event.target.value});
    }

    componentDidMount() {
        const userId = this.props.userId;
        if (userId) {
            getUserById(userId)
                .then((user) => {
                    return user.json();
                }).then((userData) => {
                    this.setState({
                        firstName: userData.first_name,
                        lastName: userData.last_name,
                        email: userData.email,
                        isNewUser: false
                    });
                });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        let apiCall = addNewUser({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
        });
        if (!this.state.isNewUser) {
            apiCall = updateUser(
                this.props.userId, 
                {
                    first_name: this.state.firstName || undefined,
                    last_name: this.state.lastName || undefined,
                    email: this.state.email || undefined,
                    password: this.state.password || undefined,
                    password_confirmation: this.state.password_confirmation || undefined,
                }
            );
        }

        apiCall
            .then((response) => {
                return response.json();
            }).then((respJson) => {
                console.log(respJson);
                this.props.successHandler();
            });
    }

    render() {
        let headerText = "New User";
        if (!this.state.isNewUser) {
            headerText = "Edit User";
        }

        return (
            <fieldset>
                <legend>{headerText}</legend>
                <form onSubmit={this.handleSubmit}>
                    <FormInput labelText="First name" value={this.state.firstName} changeHandler={this.handleFNameChange} />
                    <FormInput labelText="Last name" value={this.state.lastName} changeHandler={this.handleLNameChange} />
                    <FormInput labelText="Email address" value={this.state.email} changeHandler={this.handleEmailChange} />
                    <FormPassword labelText="Password" value={this.state.password} changeHandler={this.handlePasswordChange} />
                    <FormPassword labelText="Password confirmation" value={this.state.password_confirmation} changeHandler={this.handlePasswordConfirmChange} />
                    <div className="form-item">
                        <input type="submit" className="button" value="Submit" />
                    </div>
                </form>
            </fieldset>
        )
    }
}

UserForm.propTypes = {
    userId: PropTypes.number
};

export default class UserFormWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            creationSuccessful: false
        };

        this.redirectToUserList = this.redirectToUserList.bind(this);
    }

    redirectToUserList() {
        this.setState({creationSuccessful: true});
    }

    render() {
        let redirect;
        if (this.state.creationSuccessful) {
            redirect = <Redirect to="/users" />;
        }

        let userId;
        if (this.props.match) {
            userId = this.props.match.params.id;
        }

        return (
            <Switch>
                {redirect}
                <Route path='*' render={(props) => {
                    return <UserForm userId={userId} successHandler={this.redirectToUserList} />;
                }} />
            </Switch>
        )
    }
}

UserFormWrapper.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.number
        })
    })
};
