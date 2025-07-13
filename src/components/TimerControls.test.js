import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TimerControls from './TimerControls';

describe('TimerControls', () => {
  it('renders all the buttons', () => {
    render(<TimerControls />);
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
    expect(screen.getByText('+1 min')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('calls the correct functions on button click', () => {
    const setIsActive = jest.fn();
    const setTimeLeft = jest.fn();
    const setCurrentItemIndex = jest.fn();

    render(
      <TimerControls
        setIsActive={setIsActive}
        setTimeLeft={setTimeLeft}
        setCurrentItemIndex={setCurrentItemIndex}
        agenda={[{ duration: 5 }, { duration: 10 }]}
        currentItemIndex={0}
      />
    );

    fireEvent.click(screen.getByText('Start'));
    expect(setIsActive).toHaveBeenCalledWith(true);

    fireEvent.click(screen.getByText('Reset'));
    expect(setIsActive).toHaveBeenCalledWith(false);
    expect(setTimeLeft).toHaveBeenCalledWith(300);

    fireEvent.click(screen.getByText('+1 min'));
    expect(setTimeLeft).toHaveBeenCalledWith(expect.any(Function));

    fireEvent.click(screen.getByText('Next'));
    expect(setCurrentItemIndex).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText('Prev'));
    expect(setCurrentItemIndex).toHaveBeenCalledWith(0);

    // Clicking "Prev" at the beginning of the list should not change the index
    fireEvent.click(screen.getByText('Prev'));
    expect(setCurrentItemIndex).toHaveBeenCalledTimes(2);
  });
});
