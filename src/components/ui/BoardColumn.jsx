import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useBoardColumn } from '@hooks';
import { TaskCard } from '@ui';

export default function BoardColumn({
  id,
  title,
  items,
  editMode,
  onTaskClick,
}) {
  const { setNodeRef, isOver } = useBoardColumn(id);

  return (
    <div className="flex flex-col items-center w-full max-w-lg flex-1 mx-1">
      <Link
        to={`/column/${id}`}
        className="text-2xl text-center mb-3 block bg-primary text-primary-content border border-primary rounded w-full hover:bg-secondary hover:text-secondary-content transition-colors"
      >
        {title}
      </Link>
      <div
        ref={setNodeRef}
        className={`bg-base-100 text-base-content pt-2 rounded-lg shadow-md w-full flex flex-col border border-secondary justify-center items-center transition-colors duration-150 ${
          isOver ? 'ring-2 ring-secondary' : ''
        }`}
        style={{ minHeight: 180 }}
      >
        <div className="flex-1 min-h-[100px] flex flex-col w-full break-all p-2">
          {items.map((task) => (
            <TaskCard
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
