import { useDroppable } from '@dnd-kit/core';

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
        background: isOver ? 'black' : 'white',
        color: 'white',
        borderRadius: '50%',
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
      }}
    >
      🗑️
    </div>
  );
}
