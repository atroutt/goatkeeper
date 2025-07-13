import React from 'react';

const TimerControls = ({
  isActive,
  setIsActive,
  setTimeLeft,
  setCurrentItemIndex,
  currentItemIndex,
  agenda,
}) => {
  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(agenda[currentItemIndex]?.duration * 60 || 0);
  };

  const handleNext = () => {
    if (currentItemIndex < agenda.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
      setIsActive(false);
    }
  };

  const handlePrev = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(currentItemIndex - 1);
      setIsActive(false);
    }
  };

  const handleAddTime = () => {
    setTimeLeft((prevTime) => prevTime + 60);
  };

  return (
    <div className="flex gap-4 mt-4">
      <button onClick={handlePrev} className="bg-primary-light text-black px-4 py-2 rounded">
        Prev
      </button>
      <button onClick={handleStartPause} className="bg-accent text-white px-4 py-2 rounded">
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button onClick={handleReset} className="bg-primary-light text-black px-4 py-2 rounded">
        Reset
      </button>
      <button onClick={handleAddTime} className="bg-primary-light text-black px-4 py-2 rounded">
        +1 min
      </button>
      <button onClick={handleNext} className="bg-primary-light text-black px-4 py-2 rounded">
        Next
      </button>
    </div>
  );
};

export default TimerControls;
