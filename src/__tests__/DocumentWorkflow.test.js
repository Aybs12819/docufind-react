import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DocumentWorkflow from '../components/DocumentWorkflow';

describe('Document Workflow Integration', () => {
    it('handles document rejection flow', () => {
        render(<DocumentWorkflow />);

        // Create a new document
        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Doc' } });
        fireEvent.click(screen.getByText(/create document/i));

        // Submit the document for review
        fireEvent.click(screen.getByText(/submit for review/i));

        // Reject the document
        fireEvent.click(screen.getByText(/reject/i));

        // Verify the document is rejected
        expect(screen.getByText(/rejected/i)).toBeInTheDocument();
    });

    it('handles document versioning', async () => {
        render(<DocumentWorkflow />);

        // Create a new document
        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Doc' } });
        fireEvent.click(screen.getByText(/create document/i));
        
        screen.debug(); // Check DOM after creating document

        // Submit the document for review
        fireEvent.click(screen.getByText(/submit for review/i));
        
        screen.debug(); // Check DOM after submitting for review

        // Approve the document
        fireEvent.click(screen.getByText(/approve/i));
        
        screen.debug(); // Check DOM after approving

        // Wait for "Create new version" button to appear
        await waitFor(() => {
            expect(screen.getByText(/create new version/i)).toBeInTheDocument();
        });

        // Create a new version
        fireEvent.click(screen.getByText(/create new version/i));

        // Wait for the version notes input to appear
        const versionNotes = await screen.findByLabelText(/version notes/i);

        // Enter version notes and save
        fireEvent.change(versionNotes, { target: { value: 'Updated content' } });
        fireEvent.click(screen.getByText(/save version/i));

        // Wait for "Version 2.0" to be displayed using data-testid
        const versionContainer = await screen.findByTestId('version-container');
        
         screen.debug(); // Check DOM after saving the version

         expect(versionContainer.textContent).toBe('Version 2.0');
        
    });
});
