import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import styles from '../styles/Auth.module.css';

const Register = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData.password !== userData.confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await authService.register(userData);
            navigate('/login');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.authContainer}>
            <form onSubmit={handleSubmit} className={styles.authForm}>
                <h2>Create Account</h2>
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.formGroup}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={userData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className={styles.submitButton}
                >
                    {isLoading ? 'Creating Account...' : 'Register'}
                </button>
                <div className={styles.authLinks}>
                    <span>Already have an account? </span>
                    <Link to="/login">Login here</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;