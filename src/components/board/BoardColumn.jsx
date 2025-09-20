import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useBoardColumn } from '@hooks';
import { KanbanItem } from '@board';

export default function BoardColumn({
  id,
  title,
  items,
  editMode,
  onTaskClick,
}) {
  const { setNodeRef, isOver } = useBoardColumn(id);

  return (
    <div className="flex flex-col items-center min-w-[250px] max-w-xs flex-1 mx-1">
      <Link
        to={`/column/${id}`}
        className="text-3xl text-center mb-3 block hover:bg-secondary border rounded w-full"
      >
        {title}
      </Link>
      <div
        ref={setNodeRef}
        className={`bg-primary pt-2 rounded-lg shadow-md w-full flex flex-col border border-primary justify-center items-center transition-colors duration-150 ${
          isOver ? 'ring-2 ring-secondary' : ''
        }`}
        style={{ minHeight: 180 }}
      >
        <div className="flex-1 min-h-[100px] flex flex-col w-full break-all p-2">
          {items.map((task) => (
            <KanbanItem
              key={task.id}
              id={task.id}
              text={task.text}
              columnId={id}
              editMode={editMode}
              onClick={() => onTaskClick && onTaskClick(task.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

BoardColumn.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  editMode: PropTypes.bool,
  onTaskClick: PropTypes.func,
};
