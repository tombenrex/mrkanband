import PropTypes from 'prop-types';
import { TrashIcon as TrashOutline } from '@heroicons/react/24/outline';
import { TrashIcon as TrashSolid } from '@heroicons/react/24/solid';
import { useTrashArea } from '@hooks';
export default function TrashArea({ visible }) {
  const { setNodeRef, isOver } = useTrashArea();

  return (
    <div
      ref={setNodeRef}
      id="trash"
      className={`mx-auto mt-2 flex h-20 w-20 items-center justify-center border-2 border-dashed border-white shadow-md font-bold text-4xl z-[999] transition-all duration-300 rounded-full
        ${
          visible
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }
        ${isOver ? 'bg-red-100' : 'bg-transparent'}
      `}
    >
      {isOver ? (
        <TrashSolid className="h-10 w-10 text-red-500 transition-all duration-200" />
      ) : (
        <TrashOutline className="h-10 w-10 text-white transition-all duration-200" />
      )}
    </div>
  );
}

TrashArea.propTypes = {
  visible: PropTypes.bool.isRequired,
};
