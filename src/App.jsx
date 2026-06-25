import React from 'react';
import { TaskProvider } from './context/TaskContext';
import Navigation from './components/Navigation';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Calendar from './components/Calendar';
import Alarms from './components/Alarms';
import './styles/components.css';

function App() {
  const [activeView, setActiveView] = React.useState('tasks');

  return (
    <TaskProvider>
      <div className="app-container">
        <Navigation activeView={activeView} setActiveView={setActiveView} />
        <main className="main-content">
          {activeView === 'tasks' && (
            <>
              <TaskForm />
              <TaskList />
            </>
          )}
          {activeView === 'calendar' && <Calendar />}
          {activeView === 'alarms' && <Alarms />}
        </main>
      </div>
    </TaskProvider>
  );
}

export default App;
