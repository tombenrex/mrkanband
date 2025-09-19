import { useState } from 'react';

export function useTaskModalState(columns, columnOrder) {
  const [selectedTask, setSelectedTask] = useState(
    localStorage.getItem('lastViewedTask') || null
  );

  function handleTaskClick(taskId) {
    const colId = columnOrder.find((colId) =>
      columns[colId].some((t) => t.id === taskId)
    );
    if (colId) {
      localStorage.setItem('lastViewedTask', taskId);
      setSelectedTask(taskId);
    } else {
      setSelectedTask(taskId);
    }
  }

  function handleCloseModal() {
    setSelectedTask(null);
    localStorage.removeItem('lastViewedTask');
  }

  // Hitta rätt task och kolumn till modalen
  let modalTask = null;
  let modalCol = null;
  if (selectedTask) {
    modalCol = columnOrder.find((colId) =>
      columns[colId].some((t) => t.id === selectedTask)
    );
    modalTask = modalCol
      ? columns[modalCol].find((t) => t.id === selectedTask)
      : null;
  }

  return {
    selectedTask,
    modalTask,
    modalCol,
    handleTaskClick,
    handleCloseModal,
  };
}
