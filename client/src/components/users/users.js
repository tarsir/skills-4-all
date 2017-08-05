import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link} from 'react-router-dom';

import UserPage from './user_page';
import UserFormWrapper from './user_form';

import { getUsers } from '../../api/user_api';
import '../../assets/lists.css';

function UserListHeader() {
    return (
        <h2><Link to="/users">Users</Link></h2>
    );
}

function UserListItem(props) {
    console.log(props);
    return (
        <li className="user-list-item">
            <Link to={{ pathname: '/users/' + props.user.id }}>{props.user.first_name} {props.user.last_name} ({props.user.skills.length})</Link>
        </li>
    );
}

UserListItem.propTypes = {
    user: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        skills: PropTypes.arrayOf(PropTypes.shape({
            description: PropTypes.string
        }))
    })
};

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

UserList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
};

export default class Users extends React.Component {
    render() {
        return (
            <div>
                <UserListHeader />
                <Switch>
                    <Route exact path="/users" component={UserList} />
                    <Route path="/users/new" render={(props) => {
                        return <UserFormWrapper />;
                    }} />
                    <Route path="/users/edit/:id" render={(props) => {
                        return <UserFormWrapper {...props} />;
                    }} />
                    <Route path="/users/:id" component={UserPage} />
                </Switch>
            </div>
        );
    }
}