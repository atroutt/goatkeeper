import React, { useState } from 'react';

const AgendaItem = ({ item, setAgenda }) => {
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

  const handleDelete = () => {
    setAgenda((prevAgenda) => prevAgenda.filter((prevItem) => prevItem.id !== item.id));
  };

  return (
    <div className="p-2 border-b">
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
          <button type="submit" className="bg-green-500 text-white p-1 rounded mr-1">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-1 rounded">
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <h3 className="font-bold">{item.title}</h3>
          <p className="text-sm">{item.presenter}</p>
          <p className="text-sm">{item.duration} minutes</p>
          <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white p-1 rounded mr-1">
            Edit
          </button>
          <button onClick={handleDelete} className="bg-red-500 text-white p-1 rounded">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default AgendaItem;
