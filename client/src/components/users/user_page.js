import React from 'react';

import { getUserById } from '../../api/user_api';

import './user.css';

function UserInfo(props) {
    console.log(props);
    return (
        <div className="user-info">
            <h2>{props.user.first_name} {props.user.last_name}</h2>
            <h4>Email: {props.user.email}</h4>
        </div>
    )
}

export default class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null
        };
    }

    componentDidMount() {
        getUserById(this.props.match.params.id)
            .then((user) => {
                return user.json();
            }).then((userData) => {
                this.setState({userData});
            });
    }

    render() {
        let userInfo = null;
        if (this.state.userData) {
            userInfo = <UserInfo user={this.state.userData} />;
        }
        return (
            <div>
                {userInfo}
            </div>
        );
    }
}