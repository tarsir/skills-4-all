import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link} from 'react-router-dom';

import UserPage from './user_page';
import UserFormWrapper from './user_form';

import { getUsers } from '../../api/user_api';
import '../../assets/lists.css';

function userCompareByVotes(a, b) {
    return b.total_votes - a.total_votes;
}

function UserListHeader() {
    return (
        <h2>Users</h2>
    );
}

function UserListItem(props) {
    return (
            <tr>
                <td>
                    <Link to={{ pathname: '/users/' + props.user.id }}> 
                        {props.user.first_name} {props.user.last_name}
                    </Link>
                </td>
                <td>{props.user.total_votes}</td>
            </tr>
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
            respJson.sort(userCompareByVotes);
            this.setState({users: respJson});
        });
    }

    render() {
        const userList = this.state.users.map((user) => {
            return <UserListItem key={user.id}
                user={user} />
        });

        return (
            <div>
                <UserListHeader />
                <table className="bordered">
                    <thead>
                        <tr>
                            <th className="text-center">User Name</th>
                            <th className="text-center">Total Endorsements</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList}
                    </tbody>
                </table>
            </div>
        );
    }
}

UserList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
};

export default class Users extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/users" component={UserList} />
                    <Route path="/users/new" render={(props) => {
                        return <UserFormWrapper />;
                    }} />
                    <Route path="/users/edit/:id" render={(props) => {
                        return <UserFormWrapper {...props} />;
                    }} />
                    <Route path="/users/null" component={UserList} />
                    <Route path="/users/:id" component={UserPage} />
                </Switch>
            </div>
        );
    }
}
