import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import KanbanItem from './KanbanItem.jsx';

export default function BoardColumn({ id, title, items }) {
  // Make the whole column sortable (for column drag)
  const {
    setNodeRef: setSortableNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, data: { type: 'column' } });

  // Make the inside of the column droppable (for task drag)
  const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
    id,
    data: { type: 'task', columnId: id },
  });

  return (
    <div
      ref={setSortableNodeRef}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-lg shadow-lg w-64 min-h-[180px] p-4 flex flex-col border-2 transition-transform ${
        isDragging ? 'opacity-50 scale-95' : ''
      }`}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <h2 className="font-semibold text-center mb-3 cursor-grab">{title}</h2>
      {/* Droppable area for tasks */}
      <div
        ref={setDroppableNodeRef}
        className={`flex-1 ${isOver ? 'bg-blue-50' : ''}`}
        style={{ minHeight: 80 }}
      >
        <SortableContext
          items={items.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((task) => (
            <KanbanItem
              key={task.id}
              id={task.id}
              text={task.text}
              columnId={id}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
