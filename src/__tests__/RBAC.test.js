import React from 'react';
import { render, screen } from '@testing-library/react';
import { RBACProvider, useRBAC } from '../components/auth/RBACProvider';

const TestComponent = () => {
  const { hasPermission } = useRBAC();
  return (
    <div>
      {hasPermission('manage_documents') && <button>Manage Documents</button>}
      {hasPermission('view_documents') && <button>View Documents</button>}
    </div>
  );
};

describe('RBAC System', () => {
  test('renders components based on user permissions', () => {
    render(
      <RBACProvider initialRoles={['user']}>
        <TestComponent />
      </RBACProvider>
    );

    expect(screen.getByText('View Documents')).toBeInTheDocument();
    expect(screen.queryByText('Manage Documents')).not.toBeInTheDocument();
  });

  test('updates permissions when role changes', () => {
    const { rerender } = render(
      <RBACProvider initialRoles={['user']}>
        <TestComponent />
      </RBACProvider>
    );

    expect(screen.queryByText('Manage Documents')).not.toBeInTheDocument();

    rerender(
      <RBACProvider initialRoles={['admin']}>
        <TestComponent />
      </RBACProvider>
    );

    expect(screen.getByText('Manage Documents')).toBeInTheDocument();
  });

  test('handles multiple roles', () => {
    render(
      <RBACProvider initialRoles={['user', 'editor']}>
        <TestComponent />
      </RBACProvider>
    );

    expect(screen.getByText('View Documents')).toBeInTheDocument();
  });
});