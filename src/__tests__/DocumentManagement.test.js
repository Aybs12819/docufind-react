import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DocumentManagement from '../components/DocumentManagement';
import { documentsAPI } from '../services/api';

jest.mock('../services/api');

describe('Document Management', () => {
  const mockDocuments = [
    {
      id: 1,
      title: 'Test Document',
      status: 'published',
      version: '1.0',
      author: 'John Doe'
    }
  ];

  beforeEach(() => {
    documentsAPI.getAll.mockResolvedValue({ data: { documents: mockDocuments } });
  });

  test('renders document list', async () => {
    render(<DocumentManagement />);

    await waitFor(() => {
      expect(screen.getByText('Test Document')).toBeInTheDocument();
      expect(screen.getByText('1.0')).toBeInTheDocument();
      expect(screen.getByText('published')).toBeInTheDocument();
    });
  });

  test('handles document search', async () => {
    render(<DocumentManagement />);

    const searchInput = screen.getByPlaceholderText(/search documents/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });

    await waitFor(() => {
      expect(documentsAPI.getAll).toHaveBeenCalledWith(
        expect.objectContaining({ search: 'test' })
      );
    });
  });

  test('handles document filtering', async () => {
    render(<DocumentManagement />);

    const statusFilter = screen.getByLabelText(/status/i);
    fireEvent.change(statusFilter, { target: { value: 'published' } });

    await waitFor(() => {
      expect(documentsAPI.getAll).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'published' })
      );
    });
  });
});