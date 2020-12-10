import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-in-components';
import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in-styles.scss';

const SignIn = () => {
    const [emailAndPassword, setEmailAndPassword] = useState({ email: '', password: '' });

    const handleSubmit = (event) => {
        event.preventDefault();
        setEmailAndPassword({ email: '', password: '' });
    };

    const handleChange = (event) => {
        const { value, name } = event.target;
        setEmailAndPassword({ ...emailAndPassword, [name]: value });
    };

    return (
        <div className="sign-in">
            <h2 className="title">I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form className="sign-in-form" onSubmit={handleSubmit}>
                <FormInput
                    className="form-input"
                    name="email"
                    value={emailAndPassword.email}
                    onChange={handleChange}
                    type="email"
                    required
                    label="Email"
                />
                <FormInput
                    className="form-input"
                    name="password"
                    value={emailAndPassword.password}
                    onChange={handleChange}
                    type="password"
                    required
                    label="Password"
                />
                <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton className="google-sign-in" type="submit" onClick={signInWithGoogle}>
                        Sign in with Google
                    </CustomButton>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
