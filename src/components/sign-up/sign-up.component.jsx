import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

const SignUp = () => {
    const [fields, setFields] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword } = fields;

        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { displayName });

            // Clear form
            setFields({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });
    };

    return (
        <div className="sign-up">
            <h2 className="title"></h2>
            <span>Sign up with your email´</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput
                    className="form-input"
                    onChange={handleChange}
                    label="Display Name"
                    required
                    type="text"
                    name="displayName"
                    value={fields.displayName}
                />
                <FormInput
                    className="form-input"
                    onChange={handleChange}
                    label="Email"
                    required
                    type="text"
                    name="email"
                    value={fields.email}
                />
                <FormInput
                    className="form-input"
                    onChange={handleChange}
                    label="Password"
                    required
                    type="text"
                    name="password"
                    value={fields.password}
                />
                <FormInput
                    className="form-input"
                    onChange={handleChange}
                    label="Confirm Password"
                    required
                    type="text"
                    name="confirmPassword"
                    value={fields.confirmPassword}
                />
                <CustomButton type="submit">SIGN UP</CustomButton>
            </form>
        </div>
    );
};

export default SignUp;
