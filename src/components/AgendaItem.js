import React, { useState } from 'react';

const AgendaItem = ({ item, setAgenda, handleDelete, estimatedStartTime, isCurrent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [presenter, setPresenter] = useState(item.presenter);
  const [duration, setDuration] = useState(item.duration);

  const handleUpdate = (e) => {
    e.preventDefault();
    setAgenda((prevAgenda) =>
      prevAgenda.map((prevItem) =>
        prevItem.id === item.id ? { ...prevItem, title, presenter, duration: parseInt(duration, 10) } : prevItem
      )
    );
    setIsEditing(false);
  };

  return (
    <div className="p-2 border-b border-text-muted">
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-1 border rounded w-full mb-1"
          />
          <input
            type="text"
            value={presenter}
            onChange={(e) => setPresenter(e.target.value)}
            className="p-1 border rounded w-full mb-1"
          />
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="p-1 border rounded w-full mb-1"
          />
          <button type="submit" className="bg-primary text-white p-1 rounded mr-1">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-secondary text-white p-1 rounded">
            Cancel
          </button>
        </form>
      ) : (
        <div className="flex justify-between">
          <div>
            <h3 className="font-bold">{item.title}</h3>
            <p className="text-sm">{item.presenter}</p>
            <p className="text-sm">{item.duration} minutes</p>
          </div>
          <div className="flex flex-col justify-between items-end">
            {estimatedStartTime && !isCurrent && (
              <p className="text-sm text-text-muted">
                Estimated start: {estimatedStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            )}
            <div>
              <button onClick={() => setIsEditing(true)} className="text-xl mr-2">
                ✏️
              </button>
              <button onClick={() => handleDelete(item.id)} className="text-xl">
                ❌
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendaItem;
