import React from 'react';

import { addNewSkill } from '../../api/skill_api';
import { getUserById } from '../../api/user_api';

import './user.css';

function AddSkillButton() {
    function addSkill(e) {
        addNewSkill("java").then((response) => {
            return response.json();
        }).then((respJson) => {
            // TODO: make this some kind of notification
            console.log(respJson);
        });
    }

    return (<button onClick={addSkill}>Add Skill</button>);
}

function UserSkillItem(props) {
    return (
        <li className="user-skill-item">{props.text}</li>
    );
}

function UserSkillSection(props) {
    let userSkillList = null;
    if (props.userSkills.length > 0) {
        userSkillList = props.userSkills.map((skill) => {
            return <UserSkillItem key={skill.description}
                text={skill.description} />;
        });
    }

    return (
        <div className="user-skill-container">
            <ul>
                {userSkillList}
                <AddSkillButton />
            </ul>
        </div>
    )
}

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
        let userInfo = null, userSkills = null;
        if (this.state.userData) {
            userInfo = <UserInfo user={this.state.userData} />;

            if (this.state.userData.skills) {
                userSkills = <UserSkillSection userSkills={this.state.userData.skills} />;
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