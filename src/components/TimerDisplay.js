import React from 'react';

const TimerDisplay = ({ item, timeLeft }) => {
  const formatTime = (seconds) => {
    const isNegative = seconds < 0;
    if (isNegative) {
      seconds = -seconds;
    }

    if (seconds < 3600) { // Less than an hour
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      const timeString = `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
      return isNegative ? `-${timeString}` : timeString;
    }

    const years = Math.floor(seconds / (365 * 24 * 3600));
    seconds %= (365 * 24 * 3600);
    const weeks = Math.floor(seconds / (7 * 24 * 3600));
    seconds %= (7 * 24 * 3600);
    const days = Math.floor(seconds / (24 * 3600));
    seconds %= (24 * 3600);
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    let timeString = '';
    if (years > 0) timeString += `${years}y `;
    if (weeks > 0) timeString += `${weeks}w `;
    if (days > 0) timeString += `${days}d `;
    if (hours > 0) timeString += `${hours}h `;
    if (minutes > 0) timeString += `${minutes}m `;
    timeString += `${secs < 10 ? '0' : ''}${secs}s`;

    return isNegative ? `-${timeString.trim()}` : timeString.trim();
  };

  const getBackgroundColor = () => {
    if (timeLeft < 0) return 'bg-error';
    if (timeLeft <= 120 && timeLeft > 0) return 'bg-accent'; // 2 minutes
    if (timeLeft <= 300 && timeLeft > 0) return 'bg-primary-light'; // 5 minutes
    return 'bg-background';
  };

  const getFlashAnimation = () => {
    if (timeLeft === 120 || timeLeft === 300) {
      return 'animate-flash';
    }
    return '';
  };

  return (
    <div className={`flex-1 flex flex-col items-center justify-center w-full ${getBackgroundColor()} ${getFlashAnimation()}`}>
      <h1 className={`text-9xl font-bold ${timeLeft < 0 ? 'text-white' : 'text-text'}`}>{formatTime(timeLeft)}</h1>
      <h2 className={`text-5xl ${timeLeft < 0 ? 'text-white' : 'text-text'}`}>{item?.title}</h2>
      <p className={`text-3xl ${timeLeft < 0 ? 'text-white' : 'text-text-muted'}`}>{item?.presenter}</p>
    </div>
  );
};

export default TimerDisplay;
