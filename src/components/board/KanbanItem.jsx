import { useKanbanItem } from '../../hooks/useKanbanItem';
import PropTypes from 'prop-types';
import './KanbanItem.css';

export default function KanbanItem({ id, text, columnId, onDelete, onClick }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useKanbanItem(id, columnId);

  return (
    <div
      ref={setNodeRef}
      className={`kanban-task-row p-1 bg-base-200 w-full rounded mb-2 shadow flex items-center border ${
        isDragging ? 'opacity-50 z-50' : ''
      }`}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        transition,
      }}
    >
      {/* Knappsyskonen! */}
      <div className="flex gap-2 p-1 w-full">
        <div
          {...listeners}
          {...attributes}
          className="drag-btn cursor-grab bg-primary rounded select-none"
          style={{ touchAction: 'none' }}
          tabIndex={0}
          aria-label="Flytta"
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
          className="delete-btn btn btn-sm btn-error"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

KanbanItem.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};
