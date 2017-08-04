import React from 'react';
import { Switch, Route, Link} from 'react-router-dom';

import UserPage from './user_page';

import { getUsers } from '../../api/user_api';
import '../../assets/lists.css';

function UserListHeader(props) {
    return (
        <h2>User Listing</h2>
    );
}

function UserListItem(props) {
    console.log(props);
    return (
        <li className="user-list-item">
            <Link to={{ pathname: '/users/' + props.user.id }}>{props.user.first_name}</Link>
        </li>
    );
}

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        getUsers().then((response) => {
            return response.json();
        }).then((respJson) => {
            this.setState({users: respJson});
        });
    }

    render() {
        const userList = this.state.users.map((user) => {
            return <UserListItem key={user.first_name.toString()}
                user={user} />
        });

        return <ul className="user-list">
            {userList}
        </ul>;
    }
}

export default class Users extends React.Component {
    render() {
        return (
            <div>
                <UserListHeader />
                <Switch>
                    <Route exact path="/users" component={UserList} />
                    <Route path="/users/:id" component={UserPage} />
                </Switch>
            </div>
        );
    }
}