import { fireEvent, render, screen } from '@testing-library/react';
import { it, describe, expect, test } from 'vitest';
import CountButton from './CountButton';

describe.skip('CountButton', () => {
  it('should render', { timeout: 1000 }, () => {
    render(<CountButton />);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });
  test('should increment count when button is clicked', () => {
    render(<CountButton />);
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    expect(screen.getByText('Count: 2')).toBeInTheDocument();
  });
});