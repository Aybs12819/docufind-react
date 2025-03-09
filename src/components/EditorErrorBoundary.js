import React from 'react';
import styles from '../styles/DocumentEditor.module.css';

class EditorErrorBoundary extends React.Component {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Editor Error:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
        this.props.onReset?.();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className={styles['editor-error-boundary']}>
                    <h3>Something went wrong with the editor</h3>
                    <p>{this.state.error?.message}</p>
                    <button 
                        onClick={this.handleReset}
                        className={styles.button}
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default EditorErrorBoundary;