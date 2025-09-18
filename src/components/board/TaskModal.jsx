import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function TaskModal({
  taskId,
  tasks,
  onClose,
  showPermalink,
  columnId,
}) {
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (!taskId) return;

    // Hämta task från tasks-array
    const found = tasks.find((t) => t.id === taskId);
    setTask(found);

    // Spara taskId i localStorage
    localStorage.setItem('lastViewedTask', taskId);

    return () => {
      localStorage.removeItem('lastViewedTask');
    };
  }, [taskId, tasks]);

  if (!task) return null;

  // Bygg länk till taskens URL om showPermalink
  const permalink =
    showPermalink !== false && task.columnId && task.id
      ? `/column/${task.columnId || columnId}/task/${task.id}`
      : null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-lg p-6 w-96 shadow-lg relative">
        <button
          className="btn btn-sm btn-ghost absolute top-2 right-2"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">{task.text}</h2>
        <p>ID: {task.id}</p>
        <p>Column: {task.columnId || columnId}</p>
        {permalink && (
          <div className="mt-4">
            <a
              href={permalink}
              className="link link-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Permanent länk till detta kort
            </a>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
