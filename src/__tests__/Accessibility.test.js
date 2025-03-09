import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import AccessibilityControls from '../components/AccessibilityControls';

expect.extend(toHaveNoViolations);

describe('Accessibility Features', () => {
  test('should not have accessibility violations', async () => {
    const { container } = render(<AccessibilityControls />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('toggles high contrast mode', () => {
    render(<AccessibilityControls />);
    const toggle = screen.getByRole('button', { name: /toggle high contrast/i });
    
    fireEvent.click(toggle);
    expect(document.body).toHaveClass('high-contrast');
  });
});