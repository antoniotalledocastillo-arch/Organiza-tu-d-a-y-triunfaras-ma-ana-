import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const TaskList = () => {
  const { tasks, updateTask, deleteTask } = useTaskContext();
  const [filter, setFilter] = useState('Todos');
  const [sortBy, setSortBy] = useState('dueDate');

  const filteredTasks = filter === 'Todos'
    ? tasks
    : tasks.filter((task) => task.category === filter);

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortBy === 'priority') {
      const priorityOrder = { Alta: 1, Media: 2, Baja: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  const getCategoryEmoji = (category) => {
    const emojis = { Personal: '✨', Trabajo: '💼', Universidad: '🎓' };
    return emojis[category] || '📌';
  };

  const getPriorityColor = (priority) => {
    const colors = { Alta: '#ff6b6b', Media: '#ffd93d', Baja: '#6bcf7f' };
    return colors[priority];
  };

  return (
    <div className="task-list-container">
      <h2>Mis Tareas</h2>

      <div className="task-controls">
        <div className="filter-group">
          <label>Filtrar por:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="Todos">Todos</option>
            <option value="Personal">Personal</option>
            <option value="Trabajo">Trabajo</option>
            <option value="Universidad">Universidad</option>
          </select>
        </div>

        <div className="sort-group">
          <label>Ordenar por:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="dueDate">Fecha de vencimiento</option>
            <option value="priority">Prioridad</option>
          </select>
        </div>
      </div>

      {sortedTasks.length === 0 ? (
        <p className="no-tasks">📋 No hay tareas. ¡Crea una nueva!</p>
      ) : (
        <div className="tasks-grid">
          {sortedTasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="task-header">
                <h3>{task.title}</h3>
                <span className="task-category">
                  {getCategoryEmoji(task.category)} {task.category}
                </span>
              </div>

              {task.description && (
                <p className="task-description">{task.description}</p>
              )}

              <div className="task-meta">
                <span
                  className="priority-badge"
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                >
                  {task.priority}
                </span>
                <span className="status-badge">{task.status}</span>
                {task.dueDate && (
                  <span className="due-date">📅 {task.dueDate}</span>
                )}
              </div>

              <div className="task-actions">
                <select
                  value={task.status}
                  onChange={(e) =>
                    updateTask({ ...task, status: e.target.value })
                  }
                  className="status-select"
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En Progreso">En Progreso</option>
                  <option value="Completada">Completada</option>
                </select>
                <button
                  className="btn-delete"
                  onClick={() => deleteTask(task.id)}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
