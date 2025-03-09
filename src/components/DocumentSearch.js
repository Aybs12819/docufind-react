import React, { useState } from 'react';
import styles from '../styles/DocumentSearch.module.css';

const DocumentSearch = ({ content }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [matches, setMatches] = useState([]);
    const [currentMatch, setCurrentMatch] = useState(0);

    const handleSearch = (term) => {
        setSearchTerm(term);
        if (!term) {
            setMatches([]);
            return;
        }

        const regex = new RegExp(term, 'gi');
        const foundMatches = [];
        let match;
        while ((match = regex.exec(content)) !== null) {
            foundMatches.push(match.index);
        }
        setMatches(foundMatches);
        setCurrentMatch(foundMatches.length > 0 ? 0 : -1);
    };

    const navigateMatch = (direction) => {
        if (matches.length === 0) return;
        setCurrentMatch((prev) => {
            if (direction === 'next') {
                return (prev + 1) % matches.length;
            } else {
                return prev - 1 < 0 ? matches.length - 1 : prev - 1;
            }
        });
    };

    return (
        <div className={styles.searchContainer}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search in document..."
                className={styles.searchInput}
            />
            {matches.length > 0 && (
                <div className={styles.matchInfo}>
                    {currentMatch + 1} of {matches.length} matches
                    <button onClick={() => navigateMatch('prev')} className={styles.navButton}>↑</button>
                    <button onClick={() => navigateMatch('next')} className={styles.navButton}>↓</button>
                </div>
            )}
        </div>
    );
};

export default DocumentSearch;