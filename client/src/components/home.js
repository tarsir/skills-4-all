import React from 'react';

import {Link} from 'react-router-dom';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Welcome to Skillz 4 All!</h1>
                <p>
                    Make an <Link to="/users/new">account</Link> or 
                    <Link to="/users">take a look at who's already here!</Link>
                </p>
            </div>
        );
    }
}