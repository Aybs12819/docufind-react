import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const RegisterPage = () => {
    const { setUsers } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // Simulate creating a new user account
        const newUser = { username, password, email, role: 'user' };
        setUsers((prevUsers) => {
            const updatedUsers = [...prevUsers, newUser];
            console.log('Updated Users:', updatedUsers); // Log the updated users
            return updatedUsers;
        });
        alert('Account created successfully!');
        navigate('/login'); // Redirect to login page after registration
    };
    
    

    return (
        <div>
            <h2>Register Page</h2>
            <form onSubmit={handleRegister}>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <br />
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
