import PropTypes from 'prop-types';
import { useTaskCard } from '@hooks';

export default function TaskCard({ id, text, columnId, editMode, onClick }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useTaskCard(id, columnId, editMode);

  function handleClick(e) {
    if (editMode) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (onClick) onClick(e);
  }

  function handleKeyDown(e) {
    if (editMode) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (onClick && e.key === 'Enter') onClick(e);
  }

  return (
    <div
      ref={editMode ? setNodeRef : undefined}
      {...(editMode ? attributes : {})}
      {...(editMode ? listeners : {})}
      className={`
        kanban-task-row p-2 w-full rounded mb-2 shadow flex items-center border min-h-10 select-none
        bg-base-200 border-primary
        ${isDragging ? 'opacity-50 z-50' : ''}
        ${
          editMode
            ? 'cursor-grab'
            : onClick
            ? 'cursor-pointer hover:bg-primary/20 focus-visible:ring-2 focus-visible:ring-primary'
            : ''
        }
      `}
      style={{
        ...(editMode && transform
          ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              transition,
            }
          : {}),
        ...(editMode
          ? {
              touchAction: 'none',
            }
          : {}),
      }}
      tabIndex={onClick && !editMode ? 0 : -1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={onClick && !editMode ? 'button' : undefined}
    >
      <span className="break-words flex-1 p-1">{text}</span>
    </div>
  );
}

TaskCard.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  onClick: PropTypes.func,
};
