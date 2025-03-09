// src/MainDashboard.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MainDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div>
            <h2>Main Dashboard</h2>
            <p>Welcome to the main dashboard.</p>
            {isAuthenticated ? (
                <Link to="/documents">Go to Document Management</Link>
            ) : (
                <p>Please log in to access Document Management.</p>
            )}
        </div>
    );
};

export default MainDashboard;
