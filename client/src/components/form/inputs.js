import React from 'react';
import PropTypes from 'prop-types';

function FormPassword(props) {
    return (
        <div className="form-item">
            <label>{props.labelText}</label>
            <input className="w50" type="password" value={props.value} onChange={props.changeHandler} />
        </div>
    )
}

FormPassword.propTypes = {
    labelText: PropTypes.string,
    value: PropTypes.string,
    changeHandler: PropTypes.func
};

function FormInput(props) {
    return (
        <div className="form-item">
            <label>{props.labelText}</label>
            <input className="w50" type="input" value={props.value} onChange={props.changeHandler} />
        </div>
    )
}

FormInput.propTypes = {
    labelText: PropTypes.string,
    value: PropTypes.string,
    changeHandler: PropTypes.func
};

export {
    FormPassword,
    FormInput
};
