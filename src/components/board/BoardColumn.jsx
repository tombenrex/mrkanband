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
    <div
      ref={setNodeRef}
      className={`bg-base-100 rounded-lg shadow-md p-4 w-64 flex flex-col border border-primary justify-center items-center ${
        isOver ? 'bg-primary/10' : ''
      }`}
    >
      <Link
        to={`/column/${id}`}
        className="font-bold text-center mb-3 block hover:underline"
      >
        {title}
      </Link>
      <div className="flex-1 min-h-[100px] flex flex-col">
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
  );
}
