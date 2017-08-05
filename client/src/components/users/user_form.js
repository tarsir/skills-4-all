import React from 'react';

import { getUserById } from '../../api/user_api';

export default class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData : {}
        }
    }

    componentDidMount() {
        const userId = this.props.match.params.id;
        if (userId) {
            getUserById(userId)
                .then((user) => {
                    return user.json();
                }).then((userData) => {
                    console.log(userData);
                    this.setState({userData})
                });
        }
    }

    render() {
        return (
            <div className="user-edit-form">
                hi
            </div>
        )
    }
}