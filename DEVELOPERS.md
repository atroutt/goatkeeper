# 🐐 GoatKeeper - Developer Documentation

This document provides information for developers who want to extend, refactor, or maintain the GoatKeeper app.

Primarily this is for Audrey and her AI minions. Although, you are welcome to clone, modify and run this too! 

## 📝 Project Overview

GoatKeeper is a web-based application designed to help manage an event agenda. It provides a large, easy-to-read timer and a simple interface for managing the agenda.

## 🏛️ Architecture

The application is a single-page application (SPA) built with React. It uses local component state for state management and `localStorage` to persist the agenda data.

### Major Components

*   `App.js`: The main component that manages the application state and brings all the other components together.
*   `Header.js`: The header component that contains the import/export buttons, and fullscreen toggle.
*   `AgendaSidebar.js`: The sidebar component that displays the agenda and allows for adding, editing, and reordering of agenda items. The "Add Item" form is also located here and is collapsible.
*   `AgendaItem.js`: The component that displays a single agenda item.
*   `TimerDisplay.js`: The component that displays the countdown timer and visual alerts.
*   `TimerControls.js`: The component that contains the timer controls (start, pause, reset, etc.).

### State Management

The application uses React's `useState` and `useEffect` hooks for state management. The main application state is managed in the `App.js` component and passed down to the child components as props. The agenda data is persisted to the browser's `localStorage` to ensure that it is not lost between sessions.

## 🚀 How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the application:**
    ```bash
    npm start
    ```
4.  **Build the application:**
    ```bash
    npm run build
    ```
  4.  **Deploy to github pages:**
    ```bash
    npm run deploy
    ```
    See it live https://audreytroutt.com/goatkeeper/

## 🛠️ How to Modify or Add Features

### Add New Agenda Fields

1.  Update the `AddAgendaItemForm.js` component to include the new field in the form.
2.  Update the `AgendaItem.js` component to display the new field.
3.  Update the `App.js` component to handle the new field in the `addAgendaItem` and `updateAgendaItem` functions.

### Change Countdown Behavior

The countdown logic is located in the `App.js` component. You can modify the `useEffect` hook that handles the timer to change the countdown behavior.

### Customize Visual Alerts or Theming

The visual alerts are handled in the `TimerDisplay.js` component. You can modify the `getBackgroundColor` and `getFlashAnimation` functions to change the visual alerts. The colors can be customized in the `tailwind.config.js` file.

## 📂 File/Folder Structure

```
.
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── AddAgendaItemForm.js
│   │   ├── AgendaItem.js
│   │   ├── AgendaSidebar.js
│   │   ├── Goat.js
│   │   ├── Header.js
│   │   ├── TimerControls.js
│   │   └── TimerDisplay.js
│   ├── App.js
│   ├── index.css
│   └── index.js
├── .gitignore
├── DEVELOPERS.md
├── package.json
├── postcss.config.js
├── README.md
└── tailwind.config.js
```

## 📦 Dependencies Used

*   `react`: A JavaScript library for building user interfaces.
*   `react-beautiful-dnd`: A library for creating beautiful and accessible drag-and-drop lists.
*   `papaparse`: A fast and powerful CSV parser for the browser.
*   `date-fns`: A modern JavaScript date utility library.
*   `lucide-react`: A simple and beautiful icon set.
*   `tailwindcss`: A utility-first CSS framework for rapidly building custom designs.

## 📜 Licensing and Contribution

This project is licensed under the MIT License. Contributions are welcome! Please open an issue or submit a pull request.
