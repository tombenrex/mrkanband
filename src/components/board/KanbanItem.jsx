import PropTypes from 'prop-types';
import { useKanbanItem } from '@hooks';

export default function KanbanItem({ id, text, columnId, editMode, onClick }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useKanbanItem(id, columnId, editMode);

  return (
    <div
      ref={editMode ? setNodeRef : undefined}
      {...(editMode ? attributes : {})}
      {...(editMode ? listeners : {})}
      className={`kanban-task-row p-1 bg-base-200 w-full rounded mb-2 shadow flex items-center border
        ${isDragging ? 'opacity-50 z-50' : ''}
      `}
      style={
        editMode && transform
          ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              transition,
              cursor: isDragging ? 'grabbing' : 'grab',
              touchAction: 'none',
            }
          : {}
      }
      tabIndex={onClick ? 0 : -1}
      onClick={onClick}
      onKeyDown={
        onClick ? (e) => (e.key === 'Enter' ? onClick() : null) : undefined
      }
      role={onClick ? 'button' : undefined}
    >
      <span className="break-words flex-1 p-1">{text}</span>
    </div>
  );
}

KanbanItem.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  onClick: PropTypes.func, // NY: för modal-öppning
};
