import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useBoardStore } from '../../store/useBoardStore';
import { ClipboardIcon } from '@heroicons/react/24/outline';

export default function TaskModal({ task, onClose, showPermalink, columnId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text || '');
  const [copied, setCopied] = useState(false);

  const editTask = useBoardStore((state) => state.editTask);
  const deleteTask = useBoardStore((state) => state.deleteTask);

  if (!task) return null;

  const permalink =
    showPermalink !== false && (columnId || task.columnId) && task.id
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

  function handleDelete() {
    deleteTask(columnId || task.columnId, task.id);
    onClose();
  }

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 border-4 border-secondary">
      <div className="bg-base-100 rounded-lg p-6 w-96 shadow-lg relative border-2 border-secondary">
        <button
          className="btn btn-sm btn-ghost absolute top-2 right-2 border-secondary m-2 "
          onClick={onClose}
        >
          &#10005;
        </button>
        {!isEditing ? (
          <>
            <h2 className="text-xl font-bold mb-4 text-primary">
              Task from {columnId || task.columnId}
            </h2>
            <div className="border p-2 rounded-md items-center flex justify-between">
              <p className="text-xl font-bold mb-4 font-fira break-words overflow-auto">
                {task.text}
              </p>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button className="btn btn-sm btn-error" onClick={handleDelete}>
                Delete
              </button>
              <button
                className="btn btn-sm btn-outline flex items-center justify-center p-2"
                onClick={handleCopyLink}
                type="button"
                title={copied ? 'Copy success!' : 'Copy link'}
              >
                <ClipboardIcon className="h-5 w-5" />
              </button>
            </div>
            {permalink && (
              <div className="mt-4 flex gap-2 items-center">
                {copied && (
                  <span className="text-success ml-2">Copy success!</span>
                )}
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
