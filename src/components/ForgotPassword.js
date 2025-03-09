import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import styles from '../styles/Auth.module.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await authService.requestPasswordReset(email);
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.authContainer}>
            <form onSubmit={handleSubmit} className={styles.authForm}>
                <h2>Reset Password</h2>
                {error && <div className={styles.error}>{error}</div>}
                {success ? (
                    <div className={styles.success}>
                        <p>Password reset instructions have been sent to your email.</p>
                        <Link to="/login" className={styles.backToLogin}>
                            Back to Login
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className={styles.submitButton}
                        >
                            {isLoading ? 'Sending...' : 'Reset Password'}
                        </button>
                        <div className={styles.authLinks}>
                            <Link to="/login">Back to Login</Link>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};

export default ForgotPassword;