import React from 'react';
import Papa from 'papaparse';

const Header = ({ setAgenda, agenda, currentDay, setCurrentDay }) => {
  const dates = [...new Set(agenda.map((item) => item.date))].sort();

  const handleImport = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const importedAgenda = results.data.map(item => ({
          ...item,
          duration: parseInt(item.duration, 10)
        }));
        setAgenda(importedAgenda);
      },
    });
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-bold">Onsite Agenda Timer</h1>
        <div className="flex gap-2 mt-2">
          {dates.map((date) => (
            <button
              key={date}
              onClick={() => setCurrentDay(date)}
              className={`${
                currentDay === date ? 'bg-teal' : 'bg-gray-600'
              } px-3 py-1 rounded`}
            >
              {date}
            </button>
          ))}
        </div>
      </div>
      <div>
        <button className="bg-red-500 px-4 py-2 rounded mr-2" onClick={() => setAgenda([])}>Clear Agenda</button>
        <label className="bg-green-500 px-4 py-2 rounded mr-2 cursor-pointer">
          Import CSV
          <input type="file" accept=".csv" onChange={handleImport} className="hidden" />
        </label>
        <button onClick={() => handleExport(agenda)} className="bg-green-500 px-4 py-2 rounded">Export CSV</button>
        <button onClick={toggleFullScreen} className="bg-purple-500 px-4 py-2 rounded ml-2">Fullscreen</button>
      </div>
    </header>
  );
};

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

const handleExport = (agenda) => {
  const csv = Papa.unparse(agenda);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'agenda.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default Header;
