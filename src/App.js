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
        { id: '1', title: 'Welcome Meow-remarks', presenter: 'Milhouse', duration: 5 },
        { id: '2', title: 'Zoomies Unleashed: Harnessing Your Inner Chaos', presenter: 'Bradley', duration: 30 },
        { id: '3', title: 'Break', presenter: 'ALL', duration: 15 },
        { id: '4', title: 'Purrfect Pitch: Vocal Techniques for Getting What You Want', presenter: 'Felix', duration: 60 },
        { id: '5', title: 'Lunch', presenter: 'ALL - In Kitchen', duration: 30 },
      ];
    }
  });
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(agenda[currentItemIndex]?.duration * 60 || 0);
  const [isActive, setIsActive] = useState(false);
  const [completedItems, setCompletedItems] = useState([]);
  const [estimatedStartTimes, setEstimatedStartTimes] = useState({});

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
      setCompletedItems([...completedItems, agenda[currentItemIndex].id]);
      // Optional: auto-play next item
      // if (currentItemIndex < agenda.length - 1) {
      //   setCurrentItemIndex(currentItemIndex + 1);
      //   setIsActive(true);
      // } else {
      //   setIsActive(false);
      // }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentItemIndex, agenda, completedItems]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newDisplayAgenda = Array.from(displayAgenda);
    const [reorderedItem] = newDisplayAgenda.splice(result.source.index, 1);
    newDisplayAgenda.splice(result.destination.index, 0, reorderedItem);

    const newAgenda = newDisplayAgenda.concat(agenda.filter(item => completedItems.includes(item.id)));
    setAgenda(newAgenda);

    // Adjust currentItemIndex
    const newCurrentItemIndex = newDisplayAgenda.findIndex(item => item.id === displayAgenda[currentItemIndex].id);
    setCurrentItemIndex(newCurrentItemIndex);
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

  const displayAgenda = agenda.filter(
    (item) => !completedItems.includes(item.id)
  );

  return (
      <div className="flex flex-col h-screen">
        <Header setAgenda={setAgenda} agenda={agenda} />
        <div className="flex flex-1 overflow-hidden">
          <DragDropContext onDragEnd={onDragEnd}>
            <AgendaSidebar
              agenda={displayAgenda}
              setAgenda={setAgenda}
              currentItemIndex={currentItemIndex}
              handleDelete={handleDelete}
              estimatedStartTimes={estimatedStartTimes}
            />
          </DragDropContext>
          <main className="flex-1 flex flex-col p-4 overflow-hidden">
            <div className="flex-1 flex flex-col items-center justify-center">
              <TimerDisplay
                item={displayAgenda[currentItemIndex]}
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
                agenda={displayAgenda}
              />
            </div>
          </main>
        </div>
      </div>
  );
}

export default App;
