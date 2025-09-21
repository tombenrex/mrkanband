import PropTypes from 'prop-types';
import { BaseModal } from '@modal';

export default function ColumnModal({
  columnId,
  columnName,
  tasks = [],
  onClose,
}) {
  if (!columnId) return null;

  return (
    <BaseModal
      onClose={onClose}
      overlayClass="border-4 border-secondary bg-base-300/50"
      modalClass="bg-base-100 rounded-lg p-5 shadow-lg border-2 border-secondary"
    >
      <h2 className="text-xl font-bold mb-4 text-base-content">
        {columnName || columnId}
      </h2>

      {tasks.length === 0 ? (
        <div className="text-center text-base-content/60">No tasks</div>
      ) : (
        <ul className="p-2 h-64 max-h-40 overflow-y-auto list-disc list-inside text-base-content">
          {tasks.map((t) => (
            <li key={t.id}>{t.text}</li>
          ))}
        </ul>
      )}
      <div className="text-end mt-4 font-extrabold">
        <span className="text-secondary">{tasks.length}</span>
        <span className="font-semibold text-base-content"> tasks</span>
      </div>
    </BaseModal>
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
