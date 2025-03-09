// src/ForgotPasswordPage.js
import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/forgot-password', { email });
      setMessage('Password reset link has been sent to your email.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setMessage('Failed to send password reset link. Please try again.');
    }
  };

  return (
    <div className="forgot-password-page">
      <h2>Forgot Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleForgotPassword}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
