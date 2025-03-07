import React, { useContext } from 'react';
import { UserContext } from './UserContext';

const AdminDashboard = () => {
    const { users } = useContext(UserContext);

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <h3>Manage Users</h3>
            <ul>
                {users.map((user) => (
                    <li key={user.username}>{user.username} ({user.role})</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
