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
      <h2 className="text-xl font-bold mb-4">{columnName || columnId}</h2>

      {tasks.length === 0 ? (
        <div className="text-center text-secondary">No tasks</div>
      ) : (
        <ul className="p-2 h-64 list-disc max-h-40 overflow-y-auto">
          {tasks.map((t) => (
            <li key={t.id}>{t.text}</li>
          ))}
        </ul>
      )}
      <div className="text-secondary text-end mt-4 font-extrabold">
        {tasks.length}
        <span className="font-semibold"> tasks</span>
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
