import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';

const documents = [
    { id: 1, name: 'Document 1', content: 'This is document 1' },
    { id: 2, name: 'Document 2', content: 'This is document 2' },
    // Add more documents as needed
];

const DocumentManagement = () => {
    const { loggedInUser } = useContext(UserContext);
    const [newDocumentName, setNewDocumentName] = useState('');
    const [newDocumentContent, setNewDocumentContent] = useState('');

    const handleCreateDocument = (e) => {
        e.preventDefault();
        // Simulate creating a new document
        const newDocument = { id: documents.length + 1, name: newDocumentName, content: newDocumentContent };
        documents.push(newDocument);
        alert('Document created successfully!');
    };

    return (
        <div>
            <h2>Document Management</h2>
            <ul>
                {documents.map((document) => (
                    <li key={document.id}>
                        {document.name}
                        {loggedInUser.role === 'admin' && (
                            <button>Edit</button>
                        )}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleCreateDocument}>
                <label>Document Name:</label>
                <input type="text" value={newDocumentName} onChange={(e) => setNewDocumentName(e.target.value)} />
                <br />
                <label>Document Content:</label>
                <textarea value={newDocumentContent} onChange={(e) => setNewDocumentContent(e.target.value)} />
                <br />
                <button type="submit">Create Document</button>
            </form>
        </div>
    );
};

export default DocumentManagement;
