import React from 'react';
import { render, screen } from '@testing-library/react';
import TimerDisplay from './TimerDisplay';

describe('TimerDisplay', () => {
  it('renders the time, title, and presenter', () => {
    const item = { title: 'Test Title', presenter: 'Test Presenter' };
    render(<TimerDisplay item={item} timeLeft={120} />);

    expect(screen.getByText('2:00')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Presenter')).toBeInTheDocument();
  });

  it('formats time correctly', () => {
    const item = { title: 'Test Title', presenter: 'Test Presenter' };
    render(<TimerDisplay item={item} timeLeft={59} />);
    expect(screen.getByText('0:59')).toBeInTheDocument();
  });

  it('shows negative time correctly', () => {
    const item = { title: 'Test Title', presenter: 'Test Presenter' };
    render(<TimerDisplay item={item} timeLeft={-30} />);
    expect(screen.getByText('-0:30')).toBeInTheDocument();
  });

  it('applies the correct background color', () => {
    const item = { title: 'Test Title', presenter: 'Test Presenter' };
    const { container } = render(<TimerDisplay item={item} timeLeft={120} />);
    expect(container.firstChild).toHaveClass('bg-primary-light');
  });

  it('applies the red background for negative time', () => {
    const item = { title: 'Test Title', presenter: 'Test Presenter' };
    const { container } = render(<TimerDisplay item={item} timeLeft={-10} />);
    expect(container.firstChild).toHaveClass('bg-error');
  });
});
