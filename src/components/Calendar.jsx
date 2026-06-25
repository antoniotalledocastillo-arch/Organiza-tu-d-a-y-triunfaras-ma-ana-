import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

const Calendar = () => {
  const { tasks } = useTaskContext();
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getTasksForDay = (day) => {
    return tasks.filter(
      (task) =>
        task.dueDate &&
        isSameDay(parseISO(task.dueDate), day)
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>⬅️</button>
        <h2>
          {format(currentDate, 'MMMM yyyy', { locale: es })}
        </h2>
        <button onClick={handleNextMonth}>➡️</button>
      </div>

      <div className="calendar-grid">
        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab', 'Dom'].map((day) => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}

        {days.map((day) => {
          const dayTasks = getTasksForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);

          return (
            <div
              key={day.toString()}
              className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${dayTasks.length > 0 ? 'has-tasks' : ''}`}
            >
              <div className="day-number">
                {format(day, 'd')}
              </div>
              <div className="day-tasks">
                {dayTasks.slice(0, 2).map((task) => (
                  <div
                    key={task.id}
                    className="task-dot"
                    title={task.title}
                  >
                    •
                  </div>
                ))}
                {dayTasks.length > 2 && (
                  <div className="task-overflow">+{dayTasks.length - 2}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="calendar-legend">
        <h3>Leyenda</h3>
        <p>• = Tarea asignada</p>
        <p>Haz clic en una celda para ver todas las tareas del día</p>
      </div>
    </div>
  );
};

export default Calendar;
