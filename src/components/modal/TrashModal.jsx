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
      <h2 className="text-xl font-bold mb-4">Trash</h2>
      {trash.length === 0 ? (
        <div className="text-center text-gray-500">Empty</div>
      ) : (
        <ul className="max-h-96 overflow-auto mb-4">
          {trash.map((task) => (
            <li key={task.id + task.deletedAt} className="border-b py-2">
              <div className="font-semibold">{task.text}</div>
              <div className="text-xs text-gray-400">
                Från kolumn: {task.column}, kastad:{' '}
                {new Date(task.deletedAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
      {trash.length > 0 && (
        <button
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleClear}
        >
          Empty Trash
        </button>
      )}
    </BaseModal>
  );
}
