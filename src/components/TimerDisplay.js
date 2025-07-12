import React from 'react';

const TimerDisplay = ({ item, timeLeft }) => {
  const formatTime = (seconds) => {
    const isNegative = seconds < 0;
    if (isNegative) {
      seconds = -seconds;
    }
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const timeString = `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    return isNegative ? `-${timeString}` : timeString;
  };

  const getBackgroundColor = () => {
    if (timeLeft < 0) return 'bg-red-500';
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
      <h1 className={`text-9xl font-bold ${timeLeft < 0 ? 'text-white' : ''}`}>{formatTime(timeLeft)}</h1>
      <h2 className={`text-5xl ${timeLeft < 0 ? 'text-white' : ''}`}>{item?.title}</h2>
      <p className={`text-3xl ${timeLeft < 0 ? 'text-white' : ''}`}>{item?.presenter}</p>
    </div>
  );
};

export default TimerDisplay;
