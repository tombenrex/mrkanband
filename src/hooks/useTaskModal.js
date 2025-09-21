import { useState } from 'react';
import { useBoardStore } from '@store';

export function useTaskModal(task, columnId, showPermalink) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task?.text || '');
  const [copied, setCopied] = useState(false);

  const editTask = useBoardStore((state) => state.editTask);
  const deleteTask = useBoardStore((state) => state.deleteTask);

  const permalink =
    showPermalink !== false && (columnId || task?.columnId) && task?.id
      ? `/column/${columnId || task.columnId}/task/${task.id}`
      : null;

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.origin + permalink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert('Failed to copy link');
    }
  }

  function handleSave() {
    editTask(columnId || task.columnId, task.id, editText);
    setIsEditing(false);
  }

  function handleDelete(onClose) {
    deleteTask(columnId || task.columnId, task.id);
    onClose();
  }

  return {
    isEditing,
    setIsEditing,
    editText,
    setEditText,
    copied,
    permalink,
    handleCopyLink,
    handleSave,
    handleDelete,
  };
}
