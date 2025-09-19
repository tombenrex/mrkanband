import { useBoardColumn } from '../../hooks/useBoardColumn';
import KanbanItem from './KanbanItem';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function BoardColumn({
  id,
  title,
  items,
  onDelete,
  onTaskClick,
}) {
  const { setNodeRef, isOver } = useBoardColumn(id);

  return (
    <div>
      <Link
        to={`/column/${id}`}
        className="text-3xl text-center mb-3 block hover:bg-secondary border"
      >
        {title}
      </Link>
      <div
        ref={setNodeRef}
        className={`bg-primary pt-2 rounded-lg shadow-md w-64 flex flex-col border border-primary justify-center items-center ${
          isOver ? 'text-secondary' : ''
        }`}
      >
        <div className="flex-1 min-h-[100px] flex flex-col w-full break-all p-2">
          {items.map((task) => (
            <KanbanItem
              key={task.id}
              id={task.id}
              text={task.text}
              columnId={id}
              onDelete={onDelete}
              onClick={() => onTaskClick(task.id)}
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
  onDelete: PropTypes.func.isRequired,
  onTaskClick: PropTypes.func.isRequired,
};
