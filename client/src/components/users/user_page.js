import React from 'react';
import PropTypes from 'prop-types';

import NewSkillSection from './skill_form';

import { getUserById } from '../../api/user_api';
import { addVote, removeVote } from '../../api/skill_api';
import { getUserId } from '../../api/auth_methods';

import './user.css';

function hasUserVoted(voterList) {
    let currentUser = getUserId();
    return voterList.find(voter => {
        return voter.voter_id == currentUser
    }) !== undefined;
}

function skillCompareByVotes(a, b) {
    return b.skill_vote_count - a.skill_vote_count;
}

function VotedBadge(props) {
    return (
        <div onClick={props.clickHandler} className="vote-count-badge yes-vote">{props.count}</div>
    );
}

function NotVotedBadge(props) {
    return (
        <div onClick={props.clickHandler} className="vote-count-badge no-vote">{props.count}</div>
    );
}

function UserSkillItemDisplay(props) {
    return (
        <li className="user-skill-item">{props.badge} {props.text}</li>
    );
}

function UserPageHeader(props) {
    return (
        <h2>{props.user.first_name} {props.user.last_name}</h2>
    );
}

class UserSkillItem extends React.Component {
    constructor(props) {
        super(props);

        this.addVoteToSkill = this.addVoteToSkill.bind(this);
        this.removeVoteFromSkill = this.removeVoteFromSkill.bind(this);
    }

    addVoteToSkill() {
        addVote(this.props.skillId, this.props.userId)
            .then(response => {
                return response.json();
            }).then(voteJson => {
                getUserById(this.props.userId)
                    .then((response) => {
                        return response.json();
                    }).then((respJson) => {
                        this.props.updateSkills(respJson.user_skills);
                    });
            });;
    }

    removeVoteFromSkill() {
        removeVote(this.props.skillId, this.props.userId)
            .then(response => {
                if (response.ok) {
                    getUserById(this.props.userId)
                        .then((response) => {
                            return response.json();
                        }).then((respJson) => {
                            this.props.updateSkills(respJson.user_skills);
                        });
                }
            });
    }

    render() {
        let badge;
        if (this.props.userVoted) {
            badge = <VotedBadge clickHandler={this.removeVoteFromSkill} count={this.props.count} />;
        } else {
            badge = <NotVotedBadge clickHandler={this.addVoteToSkill} count={this.props.count} />;
        }

        return (
            <UserSkillItemDisplay badge={badge} text={this.props.text} />
        );
    }
}

UserSkillItem.propTypes = {
    text: PropTypes.string,
    updateSkills: PropTypes.func
};

class UserSkillSection extends React.Component {
    constructor(props) {
        super(props);

        props.userSkills.sort(skillCompareByVotes);

        this.state = {
            userSkills: props.userSkills
        };

        this.updateUserSkills = this.updateUserSkills.bind(this);
    }

    updateUserSkills(newSkills) {
        newSkills.sort(skillCompareByVotes);
        this.setState({userSkills: newSkills});
    }

    render() {
        let userSkillList = null;
        if (this.state.userSkills.length > 0) {
            userSkillList = this.state.userSkills.map((skill) => {
                return <UserSkillItem key={skill.skill_id}
                    skillId={skill.skill_id}
                    text={skill.skill_description}
                    count={skill.skill_vote_count}
                    userId={this.props.userId}
                    updateSkills={this.updateUserSkills}
                    userVoted={hasUserVoted(skill.voter_list)} />;
            });
        }

        return (
            <div className="user-skill-container shadow-section box-section">
                <ul className="user-skill-list">
                    {userSkillList}
                    <NewSkillSection userId={this.props.userId} 
                        updateSkills={this.updateUserSkills} />
                </ul>
            </div>
        )
    }
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
        <div className="user-info shadow-section box-section">
            <h2>User Info</h2>
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
                this.setState({userData});
            });
    }

    render() {
        let userInfo = null, userSkills = null, userPageHeader = null;
        if (this.state.userData) {
            userPageHeader = <UserPageHeader user={this.state.userData} />;
            userInfo = <UserInfo user={this.state.userData} />;

            if (this.state.userData.user_skills) {
                userSkills = <UserSkillSection userSkills={this.state.userData.user_skills} userId={this.state.userData.id} />;
            }
        }

        return (
            <div>
                {userPageHeader}
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
