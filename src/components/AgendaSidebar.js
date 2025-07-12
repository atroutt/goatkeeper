import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import AgendaItem from './AgendaItem';
import AddAgendaItemForm from './AddAgendaItemForm';
import Goat from './Goat';

const AgendaSidebar = ({ agenda, setAgenda, currentItemIndex }) => {
  return (
    <div className="w-1/3 bg-gray-100 p-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Agenda 🐐</h2>
      <AddAgendaItemForm setAgenda={setAgenda} />
      {agenda.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <Goat />
          <p className="text-gray-500 mt-4">No agenda items for this day.</p>
        </div>
      ) : (
        <Droppable droppableId="agenda">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="mt-4">
              {agenda.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`${
                        snapshot.isDragging ? 'bg-gray-200' : ''
                      } ${
                        index === currentItemIndex ? 'border-l-4 border-coral' : ''
                      } ${
                        index === currentItemIndex + 1 ? 'border-l-4 border-teal' : ''
                      }`}
                    >
                      <AgendaItem item={item} setAgenda={setAgenda} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </div>
  );
};

export default AgendaSidebar;
