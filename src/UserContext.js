import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const initialUsers = [
        { username: 'admin', password: 'password', email: 'admin@example.com', role: 'admin' },
        // Add more users as needed
    ];

    const [users, setUsers] = useState(initialUsers);
    const [loggedInUser, setLoggedInUser] = useState(null);

    return (
        <UserContext.Provider value={{ users, setUsers, loggedInUser, setLoggedInUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };
