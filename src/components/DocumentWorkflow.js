import React from 'react';
import DocumentEditor from './DocumentEditor';
import EditorErrorBoundary from './EditorErrorBoundary';

const DocumentWorkflow = () => {
    const handleEditorReset = () => {
        // Reset editor state if needed
        window.location.reload();
    };

    return (
        <EditorErrorBoundary onReset={handleEditorReset}>
            <DocumentEditor />
        </EditorErrorBoundary>
    );
};

export default DocumentWorkflow;
