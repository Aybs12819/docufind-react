import authService from './authService';

const API_BASE_URL = 'http://localhost:3001/api';

const documentService = {
    async getAllDocuments() {
        const response = await fetch(`${API_BASE_URL}/documents`, {
            headers: {
                'Authorization': `Bearer ${authService.getToken()}`
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch documents');
        }

        return response.json();
    },

    async getDocument(id) {
        const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
            headers: {
                'Authorization': `Bearer ${authService.getToken()}`
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch document');
        }

        return response.json();
    },

    async createDocument(documentData) {
        const response = await fetch(`${API_BASE_URL}/documents`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authService.getToken()}`
            },
            body: JSON.stringify(documentData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create document');
        }

        return response.json();
    },

    async updateDocument(id, documentData) {
        const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authService.getToken()}`
            },
            body: JSON.stringify(documentData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update document');
        }

        return response.json();
    },

    async deleteDocument(id) {
        const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authService.getToken()}`
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete document');
        }

        return response.json();
    },

    async shareDocument(documentId, email, permission = 'read') {
        const response = await fetch(`${API_BASE_URL}/documents/${documentId}/share`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authService.getToken()}`
            },
            body: JSON.stringify({ email, permission })
        });
        if (!response.ok) throw new Error('Failed to share document');
        return response.json();
    },

    async exportDocument(documentId, format) {
        const response = await fetch(`${API_BASE_URL}/documents/${documentId}/export/${format}`, {
            headers: {
                'Authorization': `Bearer ${authService.getToken()}`
            }
        });
        if (!response.ok) throw new Error('Failed to export document');
        return response.blob();
    },

    async getTemplates() {
        const response = await fetch(`${API_BASE_URL}/templates`, {
            headers: {
                'Authorization': `Bearer ${authService.getToken()}`
            }
        });
        if (!response.ok) throw new Error('Failed to fetch templates');
        return response.json();
    },

    async createFromTemplate(templateId) {
        const response = await fetch(`${API_BASE_URL}/documents/template/${templateId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authService.getToken()}`
            }
        });
        if (!response.ok) throw new Error('Failed to create document from template');
        return response.json();
    }
};

export default documentService;