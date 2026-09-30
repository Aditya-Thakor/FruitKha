import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loginMessage, setLoginMessage] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        const tempErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            tempErrors.email = 'Email address is required';
        } else if (!emailRegex.test(email)) {
            tempErrors.email = 'Please enter a valid email address';
        }

        if (!password) {
            tempErrors.password = 'Password is required';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Fetch users from localStorage
        // const users = JSON.parse(localStorage.getItem('fruitkha_users')) || [];

        // // Find registered user
        // const matchedUser = users.find(
        //     u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        // );

        // if (matchedUser) {
        //     setLoginMessage('Login successful! Redirecting...');

        //     // Set active user session
        //     localStorage.setItem('fruitkha_active_user', JSON.stringify({
        //         name: matchedUser.name,
        //         email: matchedUser.email
        //     }));

        // const login = fetch('http://localhost:4040/login', {
        const login = await fetch('http://localhost:4040/login/user', {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email, password })
        }).then(res => res.json()).then(data => {
            console.log(data);

            if (data.status === 200) {

                // const navigate = useNavigate()
                navigate('/')
            }

        })



        // Clear inputs
        setEmail('');
        setPassword('');
        setErrors({});

        // Dispatch global storage event so Navbar updates immediately
        // window.dispatchEvent(new Event('storage'));

        // // Redirect to home after 1.5s
        // setTimeout(() => {
        //     navigate('/');
        // }, 1500);
        // } else {
        //     setErrors({ form: 'Invalid email address or password.' });
        // }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Login<span>.</span></h2>

                {loginMessage && (
                    <div className="alert alert-success text-center mb-4" role="alert" style={{ borderRadius: '10px' }}>
                        <i className="fa-solid fa-circle-check me-2"></i>
                        {loginMessage}
                    </div>
                )}

                {errors.form && (
                    <div className="alert alert-danger text-center mb-4" role="alert" style={{ borderRadius: '10px' }}>
                        <i className="fa-solid fa-triangle-exclamation me-2"></i>
                        {errors.form}
                    </div>
                )}

                <form onSubmit={handleLogin} noValidate>
                    {/* Email */}
                    <div className="auth-group">
                        <div className="auth-input-wrapper">
                            <span className="auth-input-icon">
                                <i className="fa-solid fa-envelope"></i>
                            </span>
                            <input
                                type="email"
                                className="auth-input"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {errors.email && (
                            <span className="auth-error">
                                <i className="fa-solid fa-triangle-exclamation"></i>
                                {errors.email}
                            </span>
                        )}
                    </div>

                    {/* Password */}
                    <div className="auth-group">
                        <div className="auth-input-wrapper">
                            <span className="auth-input-icon">
                                <i className="fa-solid fa-lock"></i>
                            </span>
                            <input
                                type="password"
                                className="auth-input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {errors.password && (
                            <span className="auth-error">
                                <i className="fa-solid fa-triangle-exclamation"></i>
                                {errors.password}
                            </span>
                        )}
                    </div>

                    <button type="submit" className="auth-submit-btn">
                        Login
                    </button>
                </form>

                <p className="auth-footer-text">
                    Don't have an account yet?
                    <Link to="/register" className="auth-link">Register here</Link>
                </p>
            </div>
        </div>
    );
}
