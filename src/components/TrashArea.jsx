import { useDroppable } from '@dnd-kit/core';
import { TrashIcon as TrashOutline } from '@heroicons/react/24/outline';
import { TrashIcon as TrashSolid } from '@heroicons/react/24/solid';

export default function TrashArea({ visible }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'trash' });

  return (
    <div
      ref={setNodeRef}
      id="trash"
      className="mt-2 align-center mx-auto"
      style={{
        width: '80px',
        height: '80px',
        border: '2px dashed white',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        fontWeight: 'bold',
        fontSize: '32px',
        zIndex: 999,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.3s, background 0.2s',
        background: isOver ? 'rgba(255, 0, 0, 0.2)' : 'transparent', // Optional: highlight on hover
      }}
    >
      {isOver ? (
        <TrashSolid className="h-10 w-10 text-red-500 transition-all duration-200" />
      ) : (
        <TrashOutline className="h-10 w-10 text-white transition-all duration-200" />
      )}
    </div>
  );
}
