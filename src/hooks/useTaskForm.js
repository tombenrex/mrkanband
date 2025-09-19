import { useState } from 'react';

export function useAddTaskForm(addTask, columnOrder) {
  const [newTaskText, setNewTaskText] = useState('');
  const [addToCol, setAddToCol] = useState(columnOrder[0] || 'todo');

  function handleAddTask(e) {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    addTask(addToCol, newTaskText.trim());
    setNewTaskText('');
  }

  return { newTaskText, setNewTaskText, addToCol, setAddToCol, handleAddTask };
}
