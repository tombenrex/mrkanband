import { useEffect, useState } from 'react';
import { BaseModal } from '@modal';
import { useBoardStore } from '@store';

export default function TrashModal({ onClose }) {
  const getTrash = useBoardStore((state) => state.getTrash);
  const clearTrash = useBoardStore((state) => state.clearTrash);

  const [trash, setTrash] = useState([]);

  useEffect(() => {
    setTrash(getTrash());
  }, [getTrash]);

  const handleClear = () => {
    clearTrash();
    setTrash([]);
  };

  return (
    <BaseModal onClose={onClose} modalClass="max-w-lg">
      <h2 className="text-xl font-bold mb-4 text-base-content">Trash</h2>
      {trash.length === 0 ? (
        <div className="text-center text-base-content/60">Empty</div>
      ) : (
        <ul className="max-h-96 overflow-auto mb-4">
          {trash.map((task) => (
            <li
              key={task.id + task.deletedAt}
              className="border-b border-base-content/20 py-2"
            >
              <div className="font-semibold text-base-content">{task.text}</div>
              <div className="text-xs text-base-content/60">
                From {task.column}, deleted:{' '}
                {new Date(task.deletedAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
      {trash.length > 0 && (
        <button className="mt-2 btn btn-error" onClick={handleClear}>
          Empty Trash
        </button>
      )}
    </BaseModal>
  );
}
