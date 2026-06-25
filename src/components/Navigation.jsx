import React from 'react';

const Navigation = ({ activeView, setActiveView }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>📅 Organiza Tu Día</h1>
        </div>
        <ul className="nav-menu">
          <li>
            <button
              className={`nav-link ${activeView === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveView('tasks')}
            >
              📝 Tareas
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeView === 'calendar' ? 'active' : ''}`}
              onClick={() => setActiveView('calendar')}
            >
              📆 Calendario
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeView === 'alarms' ? 'active' : ''}`}
              onClick={() => setActiveView('alarms')}
            >
              🔔 Alarmas
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
