import React, { useState } from 'react';
import styles from '../styles/DocumentEditor.module.css';
import VersionCompare from './VersionCompare';

const VersionHistory = ({ versions, onRestore, currentVersion }) => {
    const [compareVersions, setCompareVersions] = useState({ old: null, new: null });

    const handleCompare = (version) => {
        if (!compareVersions.old) {
            setCompareVersions({ old: version, new: null });
        } else {
            setCompareVersions(prev => ({ ...prev, new: version }));
        }
    };

    const handleCloseCompare = () => {
        setCompareVersions({ old: null, new: null });
    };

    return (
        <div className={styles['version-history']}>
            <h3>Version History</h3>
            <div className={styles['version-list']}>
                {versions.map((version) => (
                    <div 
                        key={version.id}
                        className={`${styles['version-item']} ${
                            version.id === currentVersion ? styles.current : ''
                        }`}
                    >
                        <div className={styles['version-info']}>
                            <span>Version {version.number}</span>
                            <span>{new Date(version.timestamp).toLocaleString()}</span>
                        </div>
                        <div className={styles['version-actions']}>
                            <button
                                onClick={() => handleCompare(version)}
                                className={styles['compare-button']}
                                disabled={compareVersions.old === version || compareVersions.new === version}
                            >
                                {!compareVersions.old ? 'Compare' : 'Compare with'}
                            </button>
                            <button
                                onClick={() => onRestore(version.id)}
                                className={styles['restore-button']}
                                disabled={version.id === currentVersion}
                            >
                                Restore
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {compareVersions.old && compareVersions.new && (
                <VersionCompare
                    oldContent={compareVersions.old.content}
                    newContent={compareVersions.new.content}
                    onClose={handleCloseCompare}
                />
            )}
        </div>
    );
};

export default VersionHistory;