import { useDraggable } from '@dnd-kit/core';
import { useState } from 'react';

export default function KanbanItem({ id, text, columnId, onDelete, onClick }) {
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
    activationConstraint: {
      delay: 250, // longpress for small screens
      tolerance: 5,
    },
  });

  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={setNodeRef}
      className={`bg-base-200 rounded px-3 py-2 mb-2 shadow flex items-center justify-between border ${
        isDragging ? 'opacity-50 z-50' : ''
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
      {/* --- Drag handle--- */}
      {hovered && (
        <div
          {...listeners}
          {...attributes}
          className="mr-2 cursor-grab p-1 bg-primary rounded select-none"
          style={{ touchAction: 'none' }}
          tabIndex={0}
          aria-label="Move task"
          role="button"
        >
          ⠿
        </div>
      )}
      {/* --- Clickable text for modal --- */}
      <span
        className="flex-1 cursor-pointer break-all"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {text}
      </span>

      {/* --- Delete button on hover --- */}
      {hovered && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(columnId, id);
          }}
          className="ml-2 btn btn-sm btn-error"
        >
          ✕
        </button>
      )}
    </div>
  );
}
