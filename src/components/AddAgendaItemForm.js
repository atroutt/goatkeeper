import React, { useState } from 'react';

const AddAgendaItemForm = ({ setAgenda }) => {
  const [title, setTitle] = useState('');
  const [presenter, setPresenter] = useState('');
  const [duration, setDuration] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !duration) return;
    const newItem = {
      id: new Date().getTime().toString(),
      title,
      presenter,
      duration: parseInt(duration, 10),
    };
    setAgenda((prevAgenda) => [...prevAgenda, newItem]);
    setTitle('');
    setPresenter('');
    setDuration(0);
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 border-t">
      <h3 className="font-bold mb-2">Add New Item</h3>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Presenter"
          value={presenter}
          onChange={(e) => setPresenter(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Item
        </button>
      </div>
    </form>
  );
};

export default AddAgendaItemForm;
