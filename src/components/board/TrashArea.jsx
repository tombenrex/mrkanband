import PropTypes from 'prop-types';
import { TrashIcon as TrashOutline } from '@heroicons/react/24/outline';
import { TrashIcon as TrashSolid } from '@heroicons/react/24/solid';
import { useTrashArea } from '@hooks';

export default function TrashArea({ visible, editMode }) {
  const { setNodeRef, isOver } = useTrashArea();

  return (
    <div
      ref={setNodeRef}
      id="trash"
      className={`
        mx-auto mt-2 flex h-20 w-20 items-center justify-center shadow-md font-bold text-4xl z-[999]
        transition-all duration-300 rounded-full select-none border-2 border-dashed
        ${
          editMode && visible
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }
        ${
          isOver
            ? 'bg-error/20 border-error'
            : 'bg-base-100 border-base-content/30'
        }
      `}
      aria-label="Papperskorg"
      tabIndex={editMode && visible ? 0 : -1}
      style={{
        touchAction: 'none',
      }}
    >
      {isOver ? (
        <TrashSolid className="h-10 w-10 text-error transition-all duration-200" />
      ) : (
        <TrashOutline className="h-10 w-10 text-base-content/50 transition-all duration-200" />
      )}
    </div>
  );
}

TrashArea.propTypes = {
  visible: PropTypes.bool.isRequired,
  editMode: PropTypes.bool,
};
