import { useState } from 'react';

export function useBoardDnD({ deleteTask, moveTask, editMode }) {
  const [isTaskDragging, setIsTaskDragging] = useState(false);

  function handleDragStart({ active }) {
    if (!editMode) return;
    if (active.data?.current?.type === 'task') setIsTaskDragging(true);
  }

  function handleDragEnd({ active, over }) {
    setIsTaskDragging(false);
    if (!editMode) return;
    if (!over) return;

    if (over.id === 'trash' && active.data?.current?.type === 'task') {
      deleteTask(active.data.current.columnId, active.id);
      return;
    }

    if (
      active.data?.current?.type === 'task' &&
      over.data?.current?.type === 'task'
    ) {
      const fromCol = active.data.current.columnId;
      const toCol = over.data.current.columnId;
      const taskId = active.id;
      const targetTaskId = over.id;
      moveTask(fromCol, toCol, taskId, targetTaskId);
    }
  }

  return { isTaskDragging, handleDragStart, handleDragEnd };
}
