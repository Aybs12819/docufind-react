import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import documentService from '../services/documentService';
import LoadingSpinner from './LoadingSpinner';
import styles from '../styles/DocumentEditor.module.css';
import versionService from '../services/versionService';
import DocumentSearch from './DocumentSearch';
import ShareIcon from '@mui/icons-material/Share';
import GetAppIcon from '@mui/icons-material/GetApp';
import TemplateIcon from '@mui/icons-material/Description';

const DocumentEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [document, setDocument] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'unsaved'
    const [versions, setVersions] = useState([]);
    const [showVersions, setShowVersions] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const editorRef = useRef(null);

    // Load versions along with document
    useEffect(() => {
        const loadData = async () => {
            try {
                const [doc, docVersions] = await Promise.all([
                    documentService.getDocument(id),
                    versionService.getVersions(id)
                ]);
                setDocument(doc);
                setTitle(doc.title);
                setContent(doc.content);
                setVersions(docVersions);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyboard = (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 's':
                        e.preventDefault();
                        handleSave();
                        break;
                    case 'h':
                        e.preventDefault();
                        setShowVersions(prev => !prev);
                        break;
                    case 'f':
                        e.preventDefault();
                        setShowSearch(prev => !prev);
                        break;
                    default:
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyboard);
        return () => window.removeEventListener('keydown', handleKeyboard);
    }, [handleSave]);

    const handleRestoreVersion = async (versionId) => {
        try {
            const restoredDoc = await versionService.restoreVersion(id, versionId);
            setTitle(restoredDoc.title);
            setContent(restoredDoc.content);
            setSaveStatus('saved');
            setShowVersions(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const [showShareModal, setShowShareModal] = useState(false);
    const [showTemplates, setShowTemplates] = useState(false);
    const [templates, setTemplates] = useState([]);
    const [shareEmail, setShareEmail] = useState('');
    const [sharePermission, setSharePermission] = useState('read');

    // Load templates
    useEffect(() => {
        const loadTemplates = async () => {
            try {
                const templateList = await documentService.getTemplates();
                setTemplates(templateList);
            } catch (err) {
                setError(err.message);
            }
        };
        loadTemplates();
    }, []);

    const handleShare = async () => {
        try {
            await documentService.shareDocument(id, shareEmail, sharePermission);
            setShowShareModal(false);
            setShareEmail('');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleExport = async (format) => {
        try {
            const blob = await documentService.exportDocument(id, format);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${title}.${format}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles.editorContainer}>
            <div className={styles.toolbar}>
                <button onClick={handleBack} className={styles.backButton}>
                    ← Back to Documents
                </button>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    className={styles.titleInput}
                    placeholder="Document Title"
                />
                <span className={styles.saveStatus}>
                    {saveStatus === 'saved' && '✓ Saved'}
                    {saveStatus === 'saving' && 'Saving...'}
                    {saveStatus === 'unsaved' && 'Unsaved'}
                </span>
            </div>

            {error && (
                <div className={styles.error}>
                    {error}
                    <button onClick={() => setError(null)}>✕</button>
                </div>
            )}

            <ReactQuill
                theme="snow"
                value={content}
                onChange={handleContentChange}
                className={styles.editor}
                modules={{
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['link', 'image'],
                        ['clean']
                    ]
                }}
            />
            <button 
                onClick={() => setShowVersions(!showVersions)}
                className={styles.versionButton}
            >
                Version History
            </button>

            {showVersions && (
                <div className={styles.versionPanel}>
                    <h3>Version History</h3>
                    <div className={styles.versionList}>
                        {versions.map(version => (
                            <div key={version.id} className={styles.versionItem}>
                                <span>{new Date(version.createdAt).toLocaleString()}</span>
                                <button 
                                    onClick={() => handleRestoreVersion(version.id)}
                                    className={styles.restoreButton}
                                >
                                    Restore
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {showSearch && <DocumentSearch content={content} />}

            <div className={styles.editorActions}>
                <button 
                    onClick={() => setShowSearch(!showSearch)}
                    className={styles.searchButton}
                    title="Search (Ctrl+F)"
                >
                    🔍
                </button>
                <button 
                    onClick={() => setShowVersions(!showVersions)}
                    className={styles.versionButton}
                    title="Version History (Ctrl+H)"
                >
                    History
                </button>
                <button 
                    onClick={() => setShowShareModal(true)}
                    className={styles.actionButton}
                    title="Share Document"
                >
                    <ShareIcon />
                </button>
                <button 
                    onClick={() => handleExport('pdf')}
                    className={styles.actionButton}
                    title="Export as PDF"
                >
                    <GetAppIcon />
                </button>
                <button 
                    onClick={() => setShowTemplates(true)}
                    className={styles.actionButton}
                    title="Templates"
                >
                    <TemplateIcon />
                </button>
            </div>
        </div>
    );
};

// Debounce utility function
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

export default DocumentEditor;