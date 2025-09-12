import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function KanbanItem({ id, text, columnId }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, data: { type: 'task', columnId } });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`mb-2 p-2 rounded bg-gray-100 cursor-grab transition-opacity ${
        isDragging ? 'opacity-50' : ''
      }`}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      {text}
    </div>
  );
}
