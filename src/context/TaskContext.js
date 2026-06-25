import React, { createContext, useContext, useReducer, useEffect } from 'react';

const TaskContext = createContext();

const initialState = {
  tasks: [],
  alarms: [],
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, { ...action.payload, id: Date.now() }],
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_ALARM':
      return {
        ...state,
        alarms: [...state.alarms, { ...action.payload, id: Date.now() }],
      };
    case 'DELETE_ALARM':
      return {
        ...state,
        alarms: state.alarms.filter((alarm) => alarm.id !== action.payload),
      };
    case 'SET_ALARMS':
      return { ...state, alarms: action.payload };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Cargar datos del localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedAlarms = localStorage.getItem('alarms');
    if (savedTasks) dispatch({ type: 'SET_TASKS', payload: JSON.parse(savedTasks) });
    if (savedAlarms) dispatch({ type: 'SET_ALARMS', payload: JSON.parse(savedAlarms) });
  }, []);

  // Guardar tareas en localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  // Guardar alarmas en localStorage
  useEffect(() => {
    localStorage.setItem('alarms', JSON.stringify(state.alarms));
  }, [state.alarms]);

  const value = {
    tasks: state.tasks,
    alarms: state.alarms,
    addTask: (task) => dispatch({ type: 'ADD_TASK', payload: task }),
    updateTask: (task) => dispatch({ type: 'UPDATE_TASK', payload: task }),
    deleteTask: (id) => dispatch({ type: 'DELETE_TASK', payload: id }),
    addAlarm: (alarm) => dispatch({ type: 'ADD_ALARM', payload: alarm }),
    deleteAlarm: (id) => dispatch({ type: 'DELETE_ALARM', payload: id }),
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext debe usarse dentro de TaskProvider');
  }
  return context;
};
