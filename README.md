# Organiza Tu Día y Triunfarás Mañana 📅

Una aplicación web moderna para organizar tareas, proyectos académicos y laborales con calendario integrado y sistema de alarmas.

## Características Principales

✅ **Gestión de Tareas**
- Crear, editar y eliminar tareas
- Categorías: Trabajo, Universidad, Personal
- Prioridades: Alta, Media, Baja
- Estados: Pendiente, En Progreso, Completada

📅 **Calendario Interactivo**
- Vista mensual y semanal
- Visualización de tareas por día
- Drag and drop para mover tareas

🔔 **Sistema de Alarmas**
- Notificaciones para tareas del día
- Recordatorios personalizables
- Sonidos de alerta configurables

💾 **Persistencia de Datos**
- LocalStorage para almacenar tareas
- Sincronización en tiempo real

## Instalación

```bash
npm install
npm start
```

## Tecnologías

- React 18+
- Context API para estado global
- CSS3 con responsive design
- Notificaciones nativas del navegador

## Estructura del Proyecto

```
src/
├── components/
│   ├── TaskForm.jsx
│   ├── TaskList.jsx
│   ├── Calendar.jsx
│   ├── Alarms.jsx
│   └── Navigation.jsx
├── context/
│   └── TaskContext.js
├── hooks/
│   └── useLocalStorage.js
├── styles/
│   ├── App.css
│   └── components.css
├── App.jsx
└── index.js
```

## Uso

1. **Crear una tarea**: Completa el formulario y selecciona categoría y prioridad
2. **Ver calendario**: Visualiza todas tus tareas en el calendario
3. **Configurar alarmas**: Establece recordatorios para tareas importantes
4. **Completar tareas**: Marca tareas como completadas

## Licencia

MIT
