import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

export default function ColumnModal({
  columnId,
  columnName,
  tasks = [],
  onClose,
}) {
  if (!columnId) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 border-4 border-secondary">
      <div className="bg-base-100 rounded-lg p-2 w-96 shadow-lg relative border-2 border-secondary">
        <button
          className="btn btn-sm btn-ghost absolute top-2 right-2 border-secondary"
          onClick={onClose}
        >
          &#10005;
        </button>
        <h2 className="text-xl font-bold mb-4">{columnName || columnId}</h2>

        {tasks.length === 0 ? (
          <div className="mb-4 text-center text-secondary">No tasks</div>
        ) : (
          <ul className="mb-4 list-disc pl-6 max-h-40 overflow-y-auto">
            {tasks.map((t) => (
              <li key={t.id}>{t.text}</li>
            ))}
          </ul>
        )}
        <div className="text-secondary text-end mt-4 font-extrabold">
          {tasks.length}
          <span className="font-semibold"> tasks</span>
        </div>
      </div>
    </div>,
    document.body
  );
}

ColumnModal.propTypes = {
  columnId: PropTypes.string.isRequired,
  columnName: PropTypes.string,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  onClose: PropTypes.func.isRequired,
};
