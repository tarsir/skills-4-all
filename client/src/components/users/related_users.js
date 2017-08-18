import React from 'react';
import PropTypes from 'prop-types';

import { Link} from 'react-router-dom';

function RelatedUserHeader(props) {
    return (
        <h4>Related Users</h4>
    );
}

function RelatedUserItem(props) {
    return (
        <li><Link to={"/users/" + props.userId}>{props.userName}</Link></li>
    )
}

RelatedUserItem.propTypes = {
    userId: PropTypes.number,
    userName: PropTypes.string
}

export default class RelatedUserSection extends React.Component {
    render() {
        let relatedUserList = this.props.users.map((user) => {
            return <RelatedUserItem key={user.id} userId={user.id} userName={user.name} />;
        });

        return (
            <div className="related-user-section box-section shadow-section">
                <RelatedUserHeader />
                <ul>
                    {relatedUserList}
                </ul>
            </div>
        );
    }
}

RelatedUserSection.propTypes = {
    users: PropTypes.array
}