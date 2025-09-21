import PropTypes from 'prop-types';
import { ClipboardIcon } from '@heroicons/react/24/outline';
import { useTaskModal } from '@hooks';
import { BaseModal } from '@modal';

export default function TaskModal({ task, onClose, showPermalink, columnId }) {
  const {
    isEditing,
    setIsEditing,
    editText,
    setEditText,
    copied,
    permalink,
    handleCopyLink,
    handleSave,
    handleDelete,
  } = useTaskModal(task, columnId, showPermalink);

  if (!task) return null;

  return (
    <BaseModal
      onClose={onClose}
      overlayClass="bg-black/90 border-4 border-secondary p-2"
      modalClass="bg-base-100 rounded-lg p-6 shadow-lg border-2 border-secondary"
    >
      {!isEditing ? (
        <>
          <h2 className="text-xl font-bold mb-4 text-primary">
            Task from {columnId || task.columnId}
          </h2>
          <div className="border p-2 rounded-md items-center flex justify-between">
            <p className="mb-4 font-fira break-words overflow-auto">
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
            <button
              className="btn btn-sm btn-error"
              onClick={() => handleDelete(onClose)}
            >
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
            className="input input-bordered w-64 mb-4"
            value={editText}
            id="editText"
            name="editText"
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <div className="flex gap-2">
            <button
              className="btn btn-sm btn-success"
              onClick={editText.trim() !== '' ? handleSave : undefined}
              disabled={editText.trim() === ''}
            >
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
    </BaseModal>
  );
}

TaskModal.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    columnId: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
  showPermalink: PropTypes.bool,
  columnId: PropTypes.string.isRequired,
};
