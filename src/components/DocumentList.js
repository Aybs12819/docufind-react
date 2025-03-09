import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import documentService from '../services/documentService';
import LoadingSpinner from './LoadingSpinner';
import styles from '../styles/DocumentList.module.css';

const DocumentList = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadDocuments();
    }, []);

    const loadDocuments = async () => {
        try {
            const data = await documentService.getAllDocuments();
            setDocuments(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateDocument = async () => {
        try {
            const newDoc = await documentService.createDocument({
                title: 'Untitled Document',
                content: '',
                createdAt: new Date()
            });
            navigate(`/documents/${newDoc.id}`);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteDocument = async (id) => {
        if (!window.confirm('Are you sure you want to delete this document?')) {
            return;
        }

        try {
            await documentService.deleteDocument(id);
            setDocuments(docs => docs.filter(doc => doc.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className={styles.documentList}>
            <div className={styles.header}>
                <h1>My Documents</h1>
                <button 
                    onClick={handleCreateDocument}
                    className={styles.createButton}
                >
                    New Document
                </button>
            </div>

            {error && (
                <div className={styles.error}>
                    {error}
                    <button onClick={() => setError(null)}>✕</button>
                </div>
            )}

            {documents.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No documents yet. Create your first document!</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {documents.map(doc => (
                        <div key={doc.id} className={styles.documentCard}>
                            <div className={styles.documentInfo}>
                                <h3>{doc.title}</h3>
                                <p>Last modified: {new Date(doc.updatedAt).toLocaleDateString()}</p>
                            </div>
                            <div className={styles.documentActions}>
                                <button 
                                    onClick={() => navigate(`/documents/${doc.id}`)}
                                    className={styles.editButton}
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDeleteDocument(doc.id)}
                                    className={styles.deleteButton}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DocumentList;