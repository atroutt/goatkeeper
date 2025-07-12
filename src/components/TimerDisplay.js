import React from 'react';

const TimerDisplay = ({ item, timeLeft }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getBackgroundColor = () => {
    if (timeLeft <= 120 && timeLeft > 0) return 'bg-coral'; // 2 minutes
    if (timeLeft <= 300 && timeLeft > 0) return 'bg-teal'; // 5 minutes
    return 'bg-gray-200';
  };

  const getFlashAnimation = () => {
    if (timeLeft === 120 || timeLeft === 300) {
      return 'animate-flash';
    }
    return '';
  };

  return (
    <div className={`flex-1 flex flex-col items-center justify-center w-full ${getBackgroundColor()} ${getFlashAnimation()}`}>
      <h1 className="text-9xl font-bold">{formatTime(timeLeft)}</h1>
      <h2 className="text-5xl">{item?.title}</h2>
      <p className="text-3xl">{item?.presenter}</p>
    </div>
  );
};

export default TimerDisplay;
