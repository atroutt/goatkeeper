import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import AgendaItem from './AgendaItem';
import AddAgendaItemForm from './AddAgendaItemForm';
import Goat from './Goat';

import { useState } from 'react';

const AgendaSidebar = ({ agenda, setAgenda, currentItemIndex, handleDelete, estimatedStartTimes }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div className="w-1/3 bg-background p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Agenda 🐐</h2>
      <div className="flex-1 overflow-y-auto">
        <Droppable droppableId="agenda">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="mt-4">
              {agenda.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <Goat />
                  <p className="text-text-muted mt-4">No agenda items for this day.</p>
                </div>
              ) : (
                agenda.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`${
                          snapshot.isDragging ? 'bg-secondary' : ''
                        } ${
                          index === currentItemIndex ? 'border-l-4 border-accent' : ''
                        } ${
                          index === currentItemIndex + 1 ? 'border-l-4 border-primary-light' : ''
                        }`}
                      >
                        <AgendaItem
                          item={item}
                          setAgenda={setAgenda}
                          handleDelete={handleDelete}
                          estimatedStartTime={estimatedStartTimes[item.id]}
                          isCurrent={index === currentItemIndex}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
    </div>
      <div className="mt-4">
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="w-full bg-primary text-white p-2 rounded"
        >
          {isFormVisible ? 'Hide Form' : 'Add New Item'}
        </button>
        {isFormVisible && <AddAgendaItemForm setAgenda={setAgenda} />}
      </div>
    </div>
  );
};

export default AgendaSidebar;
