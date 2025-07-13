import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock react-beautiful-dnd
jest.mock('react-beautiful-dnd', () => ({
  Droppable: ({ children }) => children({
    draggableProps: {
      style: {},
    },
    innerRef: jest.fn(),
  }, {}),
  Draggable: ({ children }) => children({
    draggableProps: {
      style: {},
    },
    innerRef: jest.fn(),
    dragHandleProps: {},
  }, {}),
  DragDropContext: ({ children }) => children,
}));

describe('App', () => {
  it('renders the application', () => {
    render(<App />);
    expect(screen.getByText('Agenda 🐐')).toBeInTheDocument();
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });

  it('adds a new agenda item', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Test Item' } });
    fireEvent.change(screen.getByPlaceholderText('Duration (minutes)'), { target: { value: '3' } });
    fireEvent.click(screen.getByText('Add Item'));
    expect(screen.getByText('New Test Item')).toBeInTheDocument();
  });

  it('starts and pauses the timer', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Start'));
    expect(screen.getByText('Pause')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Pause'));
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  it('resets the timer', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  it('goes to the next and previous items', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Session 1')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Prev'));
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });

  it('timer turns red when it expires', async () => {
    jest.useFakeTimers();
    render(<App />);
    fireEvent.click(screen.getByText('Start'));
    // Fast-forward time
    jest.advanceTimersByTime(5 * 60 * 1000);
    expect(screen.getByText('-0:01')).toBeInTheDocument();
    const timerDisplay = screen.getByText('-0:01').parentElement.parentElement;
    expect(timerDisplay).toHaveClass('bg-red-500');
    jest.useRealTimers();
  });

  it('completed items disappear from the agenda', async () => {
    jest.useFakeTimers();
    render(<App />);
    fireEvent.click(screen.getByText('Start'));
    // Fast-forward time
    jest.advanceTimersByTime(5 * 60 * 1000 + 1000);
    expect(screen.queryByText('Welcome')).not.toBeInTheDocument();
    jest.useRealTimers();
  });
});
