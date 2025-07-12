import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Header from './components/Header';
import AgendaSidebar from './components/AgendaSidebar';
import TimerDisplay from './components/TimerDisplay';
import TimerControls from './components/TimerControls';

function App() {
  const [agenda, setAgenda] = useState(() => {
    const savedAgenda = localStorage.getItem('agenda');
    if (savedAgenda) {
      return JSON.parse(savedAgenda);
    } else {
      return [
        { id: '1', title: 'Welcome', presenter: 'Jules', duration: 5 },
        { id: '2', title: 'Session 1', presenter: 'Goat', duration: 30 },
        { id: '3', title: 'Break', presenter: '', duration: 15 },
      ];
    }
  });
  const [currentDay, setCurrentDay] = useState('2024-07-12');
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(agenda[currentItemIndex]?.duration * 60 || 0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const savedAgenda = localStorage.getItem('agenda');
    if (savedAgenda) {
      setAgenda(JSON.parse(savedAgenda));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('agenda', JSON.stringify(agenda));
  }, [agenda]);

  useEffect(() => {
    setTimeLeft(agenda[currentItemIndex]?.duration * 60 || 0);
  }, [currentItemIndex, agenda]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (!isActive && timeLeft !== 0) {
      clearInterval(interval);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      // Optional: auto-play next item
      // if (currentItemIndex < agenda.length - 1) {
      //   setCurrentItemIndex(currentItemIndex + 1);
      //   setIsActive(true);
      // } else {
      //   setIsActive(false);
      // }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentItemIndex, agenda]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(agenda);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setAgenda(items);
  };

  const dailyAgenda = agenda.filter((item) => item.date === currentDay);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col h-screen">
        <Header
          setAgenda={setAgenda}
          agenda={agenda}
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
        />
        <div className="flex flex-1">
          <AgendaSidebar
            agenda={dailyAgenda}
            setAgenda={setAgenda}
            currentItemIndex={currentItemIndex}
          />
          <main className="flex-1 flex flex-col items-center justify-center p-4">
            <TimerDisplay
              item={dailyAgenda[currentItemIndex]}
              timeLeft={timeLeft}
            />
            <TimerControls
              isActive={isActive}
              setIsActive={setIsActive}
              setTimeLeft={setTimeLeft}
              setCurrentItemIndex={setCurrentItemIndex}
              currentItemIndex={currentItemIndex}
              agenda={dailyAgenda}
            />
          </main>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
