import React from 'react';
import { render, screen, fireEvent, within, act } from '@testing-library/react';
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
    expect(screen.getAllByText('Welcome')[0]).toBeInTheDocument();
  });

  it('adds a new agenda item', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Add New Item'));
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
    expect(screen.getAllByText('Session 1')[0]).toBeInTheDocument();
    fireEvent.click(screen.getByText('Prev'));
    expect(screen.getAllByText('Welcome')[0]).toBeInTheDocument();
  });

  it('reorders the agenda on drag and drop', () => {
    const { container } = render(<App />);
    const agendaSidebar = screen.getByTestId('agenda-sidebar');
    const firstItem = within(agendaSidebar).getByText('Welcome');
    const secondItem = within(agendaSidebar).getByText('Session 1');

    // Simulate a drag and drop
    fireEvent.dragStart(firstItem);
    fireEvent.dragEnter(secondItem);
    fireEvent.dragOver(secondItem);
    fireEvent.drop(secondItem);

    const agendaItems = container.querySelectorAll('.p-2.border-b.border-text-muted');
    expect(agendaItems[0]).toHaveTextContent('Session 1');
    expect(agendaItems[1]).toHaveTextContent('Welcome');
  });

  it('timer turns red when it expires', () => {
    jest.useFakeTimers();
    const { container } = render(<App />);
    fireEvent.click(screen.getByText('Start'));
    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(5 * 60 * 1000);
    });
    expect(screen.getByText('0:00')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    const timerDisplay = screen.getByText('-0:01').parentElement;
    expect(timerDisplay).toHaveClass('bg-error');
    jest.useRealTimers();
  });

  it('completed items disappear from the agenda', () => {
    jest.useFakeTimers();
    render(<App />);
    fireEvent.click(screen.getByText('Start'));
    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(5 * 60 * 1000 + 2000);
    });
    const agenda = screen.getByTestId('agenda-sidebar');
    expect(within(agenda).queryByText('Welcome')).toBeNull();
    jest.useRealTimers();
  });
});
