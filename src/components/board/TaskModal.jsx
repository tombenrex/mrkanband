import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBoard } from '@context';

export default function TaskModal({
  taskId,
  tasks,
  onClose,
  showPermalink,
  columnId,
}) {
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const { editTask, deleteTask } = useBoard(); // Hämta från context

  useEffect(() => {
    if (!taskId) return;
    const found = tasks.find((t) => t.id === taskId);
    setTask(found);
    setEditText(found?.text || '');
    localStorage.setItem('lastViewedTask', taskId);
    return () => {
      localStorage.removeItem('lastViewedTask');
    };
  }, [taskId, tasks]);

  if (!task) return null;

  const permalink =
    showPermalink !== false && task.columnId && task.id
      ? `/column/${task.columnId || columnId}/task/${task.id}`
      : null;

  function handleSave() {
    editTask(task.columnId || columnId, task.id, editText);
    setIsEditing(false);
  }

  function handleDelete() {
    deleteTask(task.columnId || columnId, task.id);
    onClose();
  }

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-lg p-6 w-96 shadow-lg relative">
        <button
          className="btn btn-sm btn-ghost absolute top-2 right-2"
          onClick={onClose}
        >
          &#10005;
        </button>
        {!isEditing ? (
          <>
            <h2 className="text-xl font-bold mb-4">{task.text}</h2>
            <p>ID: {task.id}</p>
            <p>Column: {task.columnId || columnId}</p>
            <div className="mt-4 flex gap-2">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Redigera
              </button>
              <button className="btn btn-sm btn-error" onClick={handleDelete}>
                Ta bort
              </button>
            </div>
            {permalink && (
              <div className="mt-4">
                <a
                  href={permalink}
                  className="link link-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onClose()}
                >
                  Länk för att visa routing
                </a>
              </div>
            )}
          </>
        ) : (
          <>
            <input
              className="input input-bordered w-full mb-3"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              autoFocus
            />
            <div className="flex gap-2">
              <button className="btn btn-sm btn-success" onClick={handleSave}>
                Spara
              </button>
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => setIsEditing(false)}
              >
                Avbryt
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
