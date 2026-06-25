import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';

const Alarms = () => {
  const { tasks, alarms, addAlarm, deleteAlarm } = useTaskContext();
  const [selectedTask, setSelectedTask] = useState('');
  const [reminderTime, setReminderTime] = useState('09:00');
  const [reminderDays, setReminderDays] = useState(1);

  // Verificar alarmas activas
  useEffect(() => {
    const checkAlarms = setInterval(() => {
      alarms.forEach((alarm) => {
        const now = new Date();
        const alarmTime = new Date(alarm.triggerTime);

        if (now >= alarmTime && !alarm.triggered) {
          // Mostrar notificación
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('🔔 Recordatorio de Tarea', {
              body: alarm.taskTitle,
              icon: '📅',
            });
          }
          // Reproducir sonido
          playAlarmSound();
        }
      });
    }, 60000); // Verificar cada minuto

    return () => clearInterval(checkAlarms);
  }, [alarms]);

  const playAlarmSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 1
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
  };

  const handleAddAlarm = () => {
    if (!selectedTask) return;

    const task = tasks.find((t) => t.id === parseInt(selectedTask));
    if (!task) return;

    const triggerDate = new Date(task.dueDate);
    const [hours, minutes] = reminderTime.split(':');
    triggerDate.setHours(parseInt(hours), parseInt(minutes), 0);

    const daysToSubtract = reminderDays;
    triggerDate.setDate(triggerDate.getDate() - daysToSubtract);

    addAlarm({
      taskId: task.id,
      taskTitle: task.title,
      triggerTime: triggerDate.toISOString(),
      reminderTime,
      reminderDays,
      triggered: false,
    });

    setSelectedTask('');
    setReminderTime('09:00');
    setReminderDays(1);
  };

  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  };

  return (
    <div className="alarms-container">
      <h2>🔔 Sistema de Alarmas</h2>

      <div className="alarm-setup">
        <h3>Crear Nueva Alarma</h3>

        <div className="form-group">
          <label htmlFor="task-select">Selecciona una tarea:</label>
          <select
            id="task-select"
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
          >
            <option value="">-- Elige una tarea --</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.title} ({task.dueDate || 'Sin fecha'})
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="reminder-time">Hora del recordatorio:</label>
            <input
              type="time"
              id="reminder-time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="reminder-days">Días antes:</label>
            <input
              type="number"
              id="reminder-days"
              min="0"
              max="30"
              value={reminderDays}
              onChange={(e) => setReminderDays(parseInt(e.target.value))}
            />
          </div>
        </div>

        <button onClick={handleAddAlarm} className="btn-primary">
          ➕ Crear Alarma
        </button>

        <button
          onClick={requestNotificationPermission}
          className="btn-secondary"
        >
          🔔 Habilitar Notificaciones
        </button>
      </div>

      <div className="alarms-list">
        <h3>Mis Alarmas Activas</h3>
        {alarms.length === 0 ? (
          <p>No hay alarmas configuradas</p>
        ) : (
          <div className="alarms-grid">
            {alarms.map((alarm) => (
              <div key={alarm.id} className="alarm-card">
                <h4>{alarm.taskTitle}</h4>
                <p>⏰ {alarm.reminderTime}</p>
                <p>📅 {alarm.reminderDays} día(s) antes</p>
                <button
                  className="btn-delete"
                  onClick={() => deleteAlarm(alarm.id)}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Alarms;
