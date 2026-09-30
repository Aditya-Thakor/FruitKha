import React, { useState } from 'react';
import { data, Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        const tempErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name.trim()) tempErrors.name = 'Full name is required';

        if (!email.trim()) {
            tempErrors.email = 'Email address is required';
        } else if (!emailRegex.test(email)) {
            tempErrors.email = 'Please enter a valid email address';
        }

        if (!password) {
            tempErrors.password = 'Password is required';
        } else if (password.length < 6) {
            tempErrors.password = 'Password must be at least 6 characters long';
        }

        if (!confirmPassword) {
            tempErrors.confirmPassword = 'Please confirm your password';
        } else if (password !== confirmPassword) {
            tempErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const data = fetch("http://localhost:4040/add/user", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        }).then(res => res.json()).then(data => {
            console.log(data)
            localStorage.setItem('fruitkha_users', JSON.stringify(data))

            navigate('/')
        })

        console.log(data);



        // Save new user

        // ;

        setSuccessMessage('Account registered successfully! Redirecting to login...');

        // Clear form
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors({});

        // Redirect after 2 seconds
        // setTimeout(() => {
        //     navigate('/login');
        // }, 2000);
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Register<span>.</span></h2>

                {successMessage && (
                    <div className="alert alert-success text-center mb-4" role="alert" style={{ borderRadius: '10px' }}>
                        <i className="fa-solid fa-circle-check me-2"></i>
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleRegister} noValidate>
                    {/* Full Name */}
                    <div className="auth-group">
                        <div className="auth-input-wrapper">
                            <span className="auth-input-icon">
                                <i className="fa-solid fa-user"></i>
                            </span>
                            <input
                                type="text"
                                className="auth-input"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        {errors.name && (
                            <span className="auth-error">
                                <i className="fa-solid fa-triangle-exclamation"></i>
                                {errors.name}
                            </span>
                        )}
                    </div>

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

                    {/* Confirm Password */}
                    <div className="auth-group">
                        <div className="auth-input-wrapper">
                            <span className="auth-input-icon">
                                <i className="fa-solid fa-shield-halved"></i>
                            </span>
                            <input
                                type="password"
                                className="auth-input"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {errors.confirmPassword && (
                            <span className="auth-error">
                                <i className="fa-solid fa-triangle-exclamation"></i>
                                {errors.confirmPassword}
                            </span>
                        )}
                    </div>

                    <button type="submit" className="auth-submit-btn">
                        Register
                    </button>
                </form>

                <p className="auth-footer-text">
                    Already have an account?
                    <Link to="/login" className="auth-link">Login here</Link>
                </p>
            </div>
        </div>
    );
}
