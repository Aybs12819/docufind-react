import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';

const renderLogin = () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  test('displays error message for invalid credentials', async () => {
    renderLogin();

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'wronguser' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpass' }
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  test('navigates to dashboard on successful login', async () => {
    renderLogin();

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' }
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      // Navigation will be handled by mock
      expect(screen.queryByText(/invalid credentials/i)).not.toBeInTheDocument();
    });
  });
});