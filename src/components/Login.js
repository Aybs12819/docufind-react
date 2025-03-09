import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Auth.module.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await login(credentials);
            const redirectTo = location.state?.from?.pathname || '/documents';
            navigate(redirectTo);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.authContainer}>
            <form onSubmit={handleSubmit} className={styles.authForm}>
                <h2>Login</h2>
                {location.state?.message && (
                    <div className={styles.success}>{location.state.message}</div>
                )}
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.formGroup}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={credentials.username}
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
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formActions}>
                    <Link to="/forgot-password" className={styles.forgotPassword}>
                        Forgot Password?
                    </Link>
                </div>
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className={styles.submitButton}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <div className={styles.authLinks}>
                    <span>Don't have an account? </span>
                    <Link to="/register">Register here</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;