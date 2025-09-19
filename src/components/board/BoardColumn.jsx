import { useDroppable } from '@dnd-kit/core';
import { KanbanItem } from '@board';
import { Link } from 'react-router-dom';

export default function BoardColumn({
  id,
  title,
  items,
  onDelete,
  onTaskClick,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: { type: 'task', columnId: id },
  });

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
        className={`bg-base-100 rounded-lg shadow-md w-64 flex flex-col border border-primary justify-center items-center ${
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
