const API_BASE_URL = 'http://localhost:3001/api';

const versionService = {
    async getVersions(documentId) {
        const response = await fetch(`${API_BASE_URL}/documents/${documentId}/versions`, {
            headers: {
                'Authorization': `Bearer ${authService.getToken()}`
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch versions');
        }

        return response.json();
    },

    async restoreVersion(documentId, versionId) {
        const response = await fetch(`${API_BASE_URL}/documents/${documentId}/versions/${versionId}/restore`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authService.getToken()}`
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to restore version');
        }

        return response.json();
    }
};

export default versionService;