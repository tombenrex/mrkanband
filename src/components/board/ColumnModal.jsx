import { createPortal } from 'react-dom';

export default function ColumnModal({
  columnId,
  columnName,
  tasks = [],
  onClose,
}) {
  if (!columnId) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 border-4 border-secondary">
      <div className="bg-secondary rounded-lg p-6 w-96 shadow-lg relative border-2 border-secondary">
        <button
          className="btn btn-sm btn-ghost absolute top-2 right-2 border-secondary"
          onClick={onClose}
        >
          &#10005;
        </button>
        <h2 className="text-xl font-bold mb-4">
          Kolumn: {columnName || columnId}
        </h2>
        <div className="mb-4">
          <span className="font-semibold">Antal uppgifter:</span> {tasks.length}
        </div>
        <ul className="mb-4 list-disc pl-6 max-h-40 overflow-y-auto">
          {tasks.map((t) => (
            <li key={t.id}>{t.text}</li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  );
}
