import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import authService from '../services/authService';
import styles from '../styles/Auth.module.css';

const ResetPassword = () => {
    const [passwords, setPasswords] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { token } = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await authService.resetPassword(token, passwords.newPassword);
            navigate('/login', { 
                state: { message: 'Password reset successful. Please login with your new password.' }
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.authContainer}>
            <form onSubmit={handleSubmit} className={styles.authForm}>
                <h2>Set New Password</h2>
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.formGroup}>
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwords.newPassword}
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
                        value={passwords.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className={styles.submitButton}
                >
                    {isLoading ? 'Resetting Password...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;