import React from 'react';

import './form-input.styles.scss';

const FormInput = ({ label, handleChange, ...rest }) => {
    return (
        <div className="group">
            {label ? <label className={`${rest.value.length ? 'shrink' : ''} form-input-label`}>{label}</label> : null}
            <input onChange={handleChange} {...rest} />
        </div>
    );
};

export default FormInput;
