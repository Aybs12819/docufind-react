import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const LoginPage = () => {
    const { users, setLoggedInUser } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Users Array:', users); // Log the users array
        console.log('Login Credentials:', username, password);
        const userFound = users.find((user) => user.username === username && user.password === password);
        console.log('User Found:', userFound);
        if (userFound) {
            setLoggedInUser(userFound);
            console.log('Logged In User:', userFound); // Log the logged-in user
            navigate('/dashboard'); // Redirect to dashboard on successful login
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div>
            <h2>Login Page</h2>
            <form onSubmit={handleLogin}>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <br />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button type="submit">Login</button>
                <br />
                <p>
                    Don't have an account?{' '}
                    <a href="/register" style={{ cursor: 'pointer', color: 'blue' }}>
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
