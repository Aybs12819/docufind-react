import React from 'react';
import styles from '../styles/DocumentEditor.module.css';

const EditorToolbar = ({ onFormat, saveStatus }) => {
    const formatOptions = [
        { label: 'Bold', command: 'bold', icon: '𝐁' },
        { label: 'Italic', command: 'italic', icon: '𝑰' },
        { label: 'Underline', command: 'underline', icon: '̲U̲' },
        { label: 'Bullet List', command: 'insertUnorderedList', icon: '•' },
        { label: 'Number List', command: 'insertOrderedList', icon: '1.' }
    ];

    return (
        <div className={styles['editor-toolbar']}>
            <div className={styles['format-tools']}>
                {formatOptions.map(({ label, command, icon }) => (
                    <button
                        key={command}
                        onClick={() => onFormat(command)}
                        className={styles['format-button']}
                        title={label}
                    >
                        {icon}
                    </button>
                ))}
            </div>
            <span className={`${styles['save-status']} ${styles[saveStatus]}`}>
                {saveStatus === 'saving' && 'Saving...'}
                {saveStatus === 'saved' && 'All changes saved'}
                {saveStatus === 'error' && 'Failed to save'}
            </span>
        </div>
    );
};

export default EditorToolbar;