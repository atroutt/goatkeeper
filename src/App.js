import React, { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Header from './components/Header';
import AgendaSidebar from './components/AgendaSidebar';
import TimerDisplay from './components/TimerDisplay';
import TimerControls from './components/TimerControls';

function App() {

  const defaultAgenda = [
    { id: '1', title: 'Welcome', presenter: 'Milhouse', duration: 5 },
    { id: '2', title: 'Zoomies Unleashed: Harnessing Your Inner Chaos', presenter: 'Bradley', duration: 30 },
    { id: '3', title: 'Break', presenter: 'ALL', duration: 15 },
    { id: '4', title: 'Purrfect Pitch: Vocal Techniques for Getting What You Want', presenter: 'Felix', duration: 60 },
  ];

  const [agenda, setAgenda] = useState(() => {
    const savedAgenda = localStorage.getItem('agenda');
    return savedAgenda ? JSON.parse(savedAgenda) : defaultAgenda;
  });

  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(agenda[currentItemIndex]?.duration * 60 || 0);
  const [isActive, setIsActive] = useState(false);
  const [estimatedStartTimes, setEstimatedStartTimes] = useState({});

  useEffect(() => {
    localStorage.setItem('agenda', JSON.stringify(agenda));
  }, [agenda]);

  useEffect(() => {
    setTimeLeft(agenda[currentItemIndex]?.duration * 60 || 0);
  }, [currentItemIndex]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
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
    const { destination, source } = result;

    if (!destination || destination.index === source.index) return;

    const reordered = Array.from(agenda);
    const [movedItem] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, movedItem);

    setAgenda(reordered);
  };

  const handleDelete = (id) => {
    const newAgenda = agenda.filter((item) => item.id !== id);
    const deletedItemIndex = agenda.findIndex((item) => item.id === id);

    if (deletedItemIndex < currentItemIndex) {
      setCurrentItemIndex(currentItemIndex - 1);
    }

    setAgenda(newAgenda);
  };

  useEffect(() => {
    const calculateStartTimes = () => {
      const now = new Date();
      let cumulativeTime = now.getTime() + (timeLeft * 1000);
      const newStartTimes = {};

      agenda.forEach((item, index) => {
        if (index > currentItemIndex) {
          newStartTimes[item.id] = new Date(cumulativeTime);
          cumulativeTime += item.duration * 60 * 1000;
        }
      });
      setEstimatedStartTimes(newStartTimes);
    };

    calculateStartTimes();
  }, [agenda, currentItemIndex, timeLeft]);

  return (
      <div className="flex flex-col h-screen">
        <Header setAgenda={setAgenda} agenda={agenda} />
        <div className="flex flex-1 overflow-hidden">
          <DragDropContext onDragEnd={onDragEnd}>
            <AgendaSidebar
              agenda={agenda}
              setAgenda={setAgenda}
              currentItemIndex={currentItemIndex}
              handleDelete={handleDelete}
              estimatedStartTimes={estimatedStartTimes}
            />
          </DragDropContext>
          <main className="flex-1 flex flex-col p-4 overflow-hidden">
            <div className="flex-1 flex flex-col items-center justify-center">
              <TimerDisplay
                item={agenda[currentItemIndex]}
                timeLeft={timeLeft}
              />
            </div>
            <div className="sticky bottom-0 bg-white p-4">
              <TimerControls
                isActive={isActive}
                setIsActive={setIsActive}
                setTimeLeft={setTimeLeft}
                setCurrentItemIndex={setCurrentItemIndex}
                currentItemIndex={currentItemIndex}
                agenda={agenda}
              />
            </div>
          </main>
        </div>
      </div>
  );
}

export default App;
