import React from 'react';
import { Switch, Route, Link} from 'react-router-dom';

function UserListItem(props) {
    return <Link to={{ pathname: '/users/' + props.id}}>{props.name}</Link>;
}

function UserList(props) {
    const users = props.users;
    const userList = users.map((user) => {
        <UserListItem key={user.first_name.toString()}
            user={user} />
});
    return <ul>
        {userList}
    </ul>;
}

export default class Users extends React.Component {
    render() {
        return (
            <div>
                <h1>Users</h1>
            </div>
        );
    }
}