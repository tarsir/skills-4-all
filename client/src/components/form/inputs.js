import React from 'react';
import PropTypes from 'prop-types';

function FormPassword(props) {
    return (
        <div className="form-group">
            <label className="form-label">{props.labelText}</label>
            <input type="password" className="form-input" value={props.value} onChange={props.changeHandler} />
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
        <div className="form-group">
            <label className="form-label">{props.labelText}</label>
            <input type="input" className="form-input" value={props.value} onChange={props.changeHandler} />
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
