// src/LoginPage.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { Form, Button, Alert, Image } from 'react-bootstrap';
import Container from './components/Container';
import PSUImage from './PSU.png'; // Import the image

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        email,
        password,
      });

      const userData = response.data;
      setUser(userData);
      localStorage.setItem('token', userData.token); // Use userData.token here

      if (userData.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (userData.role === 'process-owner') {
        navigate('/process-owner-dashboard');
      } else if (userData.role === 'dcc') {
        navigate('/dcc-dashboard');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Invalid email or password.');
    }
  };

  return (
    <Container className="mt-5">
      <div className="text-center">
        <Image
          src={PSUImage} // Use the imported image
          alt="PSU Lingayen Campus Logo"
          fluid
          style={{ maxWidth: '400px', height: 'auto' }}
          className="img-fluid"
        />
        <h2 className="mt-3">Login</h2>
      </div>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <div className="mx-auto" style={{ maxWidth: '400px' }}>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>
        <p className="mt-3 text-center">
          Forgot your password? <a href="/forgot-password">Click here</a>
        </p>
      </div>
    </Container>
  );
};

// Temporary mock function - replace with actual API call
const loginUser = async (email, password) => {
  // This is a mock implementation
  // Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock user data
      if (email === 'admin@psu.edu.ph') {
        resolve({
          success: true,
          user: {
            id: 1,
            email,
            role: 'admin',
            name: 'Admin User'
          }
        });
      } else if (email === 'dcc@psu.edu.ph') {
        resolve({
          success: true,
          user: {
            id: 2,
            email,
            role: 'dcc',
            name: 'DCC User'
          }
        });
      } else if (email === 'process@psu.edu.ph') {
        resolve({
          success: true,
          user: {
            id: 3,
            email,
            role: 'process-owner',
            name: 'Process Owner'
          }
        });
      } else {
        resolve({ success: false });
      }
    }, 1000);
  });
};

export default LoginPage;
