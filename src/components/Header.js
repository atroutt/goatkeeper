import React from 'react';
import Papa from 'papaparse';

const Header = ({ setAgenda, agenda }) => {
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
    <header className="bg-primary text-white p-2 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/GoatKeeper-Logo.png" alt="Logo" className="h-20 mr-0" />
      </div>
      <div>
        <label className="bg-accent px-4 py-2 rounded mr-2 cursor-pointer inline-block">
          Import CSV
          <input type="file" accept=".csv" onChange={handleImport} className="hidden" />
        </label>
        <button onClick={() => handleExport(agenda)} className="bg-accent px-4 py-2 rounded">Export CSV</button>
        <button onClick={toggleFullScreen} className="bg-accent px-4 py-2 rounded ml-2">Fullscreen</button>
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
  if (!agenda) return;
  const exportableAgenda = agenda.map(({ id, title, presenter, duration }) => ({
    id,
    title,
    presenter,
    duration,
  }));
  const csv = Papa.unparse(exportableAgenda);
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
