import { useDraggable } from '@dnd-kit/core';

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
    activationConstraint: { delay: 250, tolerance: 5 },
  });

  return (
    <div
      ref={setNodeRef}
      className={`kanban-task-row p-1 bg-base-200 w-full rounded mb-2 shadow flex items-center justify-between border ${
        isDragging ? 'opacity-50 z-50' : ''
      }`}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        transition,
      }}
    >
      <div className="flex gap-2 w-full">
        <div
          {...listeners}
          {...attributes}
          className="cursor-grab bg-primary rounded select-none task-actions"
          style={{ touchAction: 'none' }}
          tabIndex={0}
          aria-label="Move task"
          role="button"
        >
          ⠿
        </div>
        <span
          className="flex-1 cursor-pointer break-words p-1"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          {text}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(columnId, id);
          }}
          className="task-actions btn btn-sm btn-error"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
