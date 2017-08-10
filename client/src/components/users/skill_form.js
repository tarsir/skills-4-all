import React from 'react';
import PropTypes from 'prop-types';

import { addNewSkill } from '../../api/skill_api';

class AddSkillForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newSkill : ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({newSkill: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        addNewSkill(this.state.newSkill, this.props.userId).then((response) => {
            return response.json();
        }).catch((errorJson) => {
            console.log(errorJson);
        }).then((respJson) => {
            // TODO: make this some kind of notification
            console.log(respJson);
            this.props.showButton();
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.newSkill} onChange={this.handleChange} />
                <input type="submit" value="Add" />
            </form>
        )
    }
}

AddSkillForm.propTypes = {
    userId: PropTypes.number
};

export default class NewSkillSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addingSkill : false
        };

        this.switchToForm = this.switchToForm.bind(this);
        this.switchToButton = this.switchToButton.bind(this);
    }

    switchToButton() {
        this.setState({addingSkill: false});
    }

    switchToForm() {
        this.setState({addingSkill: true});
    }

    render() {
        let addSkillButton, addSkillForm;
        if (this.state.addingSkill) {
            addSkillForm = <AddSkillForm userId={this.props.userId}
                                showButton={this.switchToButton} />;
        } else {
            addSkillButton = <button onClick={this.switchToForm}>Add Skill</button>;
        }

        return (
            <div>
                {addSkillButton}
                {addSkillForm}
            </div>
        );
    }
}

NewSkillSection.propTypes = {
    userId: PropTypes.number
};
