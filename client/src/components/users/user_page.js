import React from 'react';
import PropTypes from 'prop-types';

import NewSkillSection from './skill_form';

import { getUserById } from '../../api/user_api';
import { getUserId } from '../../api/auth_methods';

import './user.css';

function hasUserVoted(voterList) {
    let currentUser = getUserId();
    return voterList.find(voter => {
        return voter.voter_id == currentUser
    }) !== undefined;
}

function VotedBadge(props) {
    return (
        <div className="vote-count-badge yes-vote">{props.count}</div>
    );
}

function NotVotedBadge(props) {
    return (
        <div className="vote-count-badge no-vote">{props.count}</div>
    );
}

function UserSkillItem(props) {
    let badge;
    if (props.userVoted) {
        badge = <VotedBadge count={props.count} />;
    } else {
        badge = <NotVotedBadge count={props.count} />;
    }

    return (
        <li className="user-skill-item">{badge} {props.text}</li>
    );
}

UserSkillItem.propTypes = {
    text: PropTypes.string
};

function UserSkillSection(props) {
    let userSkillList = null;
    if (props.userSkills.length > 0) {
        userSkillList = props.userSkills.map((skill) => {
            return <UserSkillItem key={skill.skill_id}
                text={skill.skill_description}
                count={skill.skill_vote_count}
                userVoted={hasUserVoted(skill.voter_list)} />;
        });
    }

    return (
        <div className="user-skill-container">
            <ul className="user-skill-list">
                {userSkillList}
                <NewSkillSection userId={props.userId} />
            </ul>
        </div>
    )
}

UserSkillSection.propTypes = {
    userSkills: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string
        })
    ),
    userId: PropTypes.number
};

function UserInfo(props) {
    return (
        <div className="user-info">
            <h2>{props.user.first_name} {props.user.last_name}</h2>
            <h4>Email: {props.user.email}</h4>
        </div>
    )
}

UserInfo.propTypes = {
    user: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        email: PropTypes.string,
        skills: PropTypes.arrayOf(PropTypes.shape({
            description: PropTypes.string
        }))
    })
};

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
                console.log(userData);
                this.setState({userData});
            });
    }

    render() {
        let userInfo = null, userSkills = null;
        if (this.state.userData) {
            userInfo = <UserInfo user={this.state.userData} />;

            if (this.state.userData.user_skills) {
                userSkills = <UserSkillSection userSkills={this.state.userData.user_skills} userId={this.state.userData.id} />;
            }
        }

        return (
            <div>
                {userInfo}
                {userSkills}
            </div>
        );
    }
}

UserPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    })
};
