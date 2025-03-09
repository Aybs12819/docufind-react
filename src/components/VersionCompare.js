import React from 'react';
import styles from '../styles/DocumentEditor.module.css';
import { diffWords } from 'diff';

const VersionCompare = ({ oldContent, newContent, onClose }) => {
    const differences = diffWords(oldContent, newContent);

    return (
        <div className={styles['version-compare']}>
            <div className={styles['compare-header']}>
                <h3>Version Comparison</h3>
                <button onClick={onClose} className={styles['close-button']}>×</button>
            </div>
            <div className={styles['compare-content']}>
                {differences.map((part, index) => (
                    <span
                        key={index}
                        className={`${styles['diff-part']} ${
                            part.added ? styles.added :
                            part.removed ? styles.removed :
                            ''
                        }`}
                    >
                        {part.value}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default VersionCompare;