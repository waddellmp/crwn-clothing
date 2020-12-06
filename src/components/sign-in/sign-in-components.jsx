import React, { useState } from 'react';
import './sign-in-components';

const SignIn = () => {
    const [emailAndPassword, setEmailAndPassword] = useState({ email: '', password: '' });
    const handleSubmit = (event) => {
        event.preventDefault();
        setEmailAndPassword({ email: '', password: '' });
    };
    const handleChange = (event) => {
        const { value, name } = event.target;
        setEmailAndPassword({ [name]: value });
    };

    return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <input name="email" value={emailAndPassword.email} onChange={handleChange} type="email" required />
                <label for="email">Email</label>
                <input
                    name="password"
                    value={emailAndPassword.password}
                    onChange={handleChange}
                    type="password"
                    required
                />
                <label for="passowrd">Password</label>

                <input type="submit" value="Submit Form" />
            </form>
        </div>
    );
};

export default SignIn;
