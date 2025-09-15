import { useDraggable } from '@dnd-kit/core';
import { useState } from 'react';

export default function KanbanItem({ id, text, columnId, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useDraggable({
    id,
    data: { type: 'task', columnId },
  });

  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={setNodeRef}
      className={`bg-gray-100 rounded px-3 py-2 mb-2 shadow cursor-grab relative transition-opacity flex items-center group ${
        isDragging ? 'opacity-60 z-50' : ''
      }`}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        transition,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gör dragbart bara här */}
      <span className="flex-1" {...attributes} {...listeners}>
        {text}
      </span>

      {/* Delete-knappen är INTE dragbar */}
      {hovered && (
        <button
          className="ml-2 bg-black text-white rounded-full w-7 h-7 flex items-center justify-center border-none cursor-pointer"
          style={{
            position: 'relative',
            right: 0,
            opacity: 1,
            transition: 'opacity 0.2s',
          }}
          title="Delete"
          onClick={() => onDelete(columnId, id)}
        >
          &times;
        </button>
      )}
    </div>
  );
}
