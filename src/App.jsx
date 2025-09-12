import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { useDraggable, useDroppable } from '@dnd-kit/core';

const initialColumns = {
  todo: ['Task 1', 'Task 2'],
  inprogress: ['Task 3'],
  done: ['Task 4'],
};

const columnTitles = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done',
};

function KanbanItem({ id }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
    marginBottom: '8px',
    padding: '8px',
    borderRadius: '6px',
    background: '#f1f5f9',
    cursor: 'grab',
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {id}
    </div>
  );
}

function KanbanColumn({ id, title, items }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const style = {
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px #e2e8f0',
    width: '240px',
    minHeight: '180px',
    padding: '16px',
    margin: '0 12px',
    border: isOver ? '2px solid #3b82f6' : '2px solid transparent',
    display: 'flex',
    flexDirection: 'column',
  };
  return (
    <div ref={setNodeRef} style={style}>
      <h2 style={{ fontWeight: 600, textAlign: 'center', marginBottom: 12 }}>
        {title}
      </h2>
      <div>
        {items.map((task) => (
          <KanbanItem key={task} id={task} />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [columns, setColumns] = useState(initialColumns);

  function handleDragEnd({ active, over }) {
    if (!over || !active) return;
    // Find which column the task was in
    let fromCol,
      toCol = over.id;
    Object.entries(columns).forEach(([col, tasks]) => {
      if (tasks.includes(active.id)) fromCol = col;
    });
    if (!fromCol || fromCol === toCol) return;

    // Move task
    setColumns((prev) => {
      const source = [...prev[fromCol]];
      const dest = [...prev[toCol]];
      source.splice(source.indexOf(active.id), 1);
      dest.push(active.id);
      return { ...prev, [fromCol]: source, [toCol]: dest };
    });
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
        {Object.entries(columns).map(([colId, items]) => (
          <KanbanColumn
            key={colId}
            id={colId}
            title={columnTitles[colId]}
            items={items}
          />
        ))}
      </div>
    </DndContext>
  );
}
