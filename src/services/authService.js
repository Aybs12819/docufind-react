const API_BASE_URL = 'http://localhost:3001/api';

const authService = {
    async login(credentials) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }
        
        const data = await response.json();
        localStorage.setItem('token', data.token);
        return data;
    },

    async register(userData) {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Registration failed');
        }

        return response.json();
    },

    logout() {
        localStorage.removeItem('token');
    },

    isAuthenticated() {
        return !!localStorage.getItem('token');
    },

    getToken() {
        return localStorage.getItem('token');
    },

    async requestPasswordReset(email) {
        const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to request password reset');
        }

        return response.json();
    },

    async resetPassword(token, newPassword) {
        const response = await fetch(`${API_BASE_URL}/auth/reset-password/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: newPassword })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to reset password');
        }

        return response.json();
    }
};

export default authService;