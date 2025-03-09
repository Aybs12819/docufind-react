// src/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Image } from 'react-bootstrap';
import Container from './components/Container';
import PSUImage from './PSU.png'; // Import the image

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/register', {
        username,
        email,
        password,
        role,
      });

      console.log(response.data);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
      setErrorMessage('Registration failed. Please try again.');
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
        <h2 className="mt-3">Register</h2>
      </div>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <div className="mx-auto" style={{ maxWidth: '400px' }}>
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

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

          <Form.Group className="mb-3" controlId="formBasicRole">
            <Form.Label>Role:</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="process-owner">Process Owner</option>
              <option value="dcc">DCC</option>
            </Form.Control>
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit">
              Register
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default RegisterPage;
