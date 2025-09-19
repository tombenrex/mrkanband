import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { BoardColumn, TrashArea, TaskModal, ColumnModal } from '@board';
import { Header, Footer } from '@layout';
import { useBoard } from '@context';

export default function ColumnPage() {
  const { columnId } = useParams();
  const { columns, deleteTask, moveTask } = useBoard();
  const [isTaskDragging, setIsTaskDragging] = useState(false);
  const [selectedTask, setSelectedTask] = useState(
    localStorage.getItem('lastViewedTask') || null
  );
  const [showColumnModal, setShowColumnModal] = useState(false); // Om du vill använda det
  const navigate = useNavigate();

  const column = columns[columnId];
  if (!column) return <div>Column not found</div>;

  const tasksWithCol = column.map((t) => ({ ...t, columnId }));

  function handleDragStart({ active }) {
    if (active.data?.current?.type === 'task') setIsTaskDragging(true);
  }

  function handleDragEnd({ active, over }) {
    setIsTaskDragging(false);
    if (!over) return;

    if (over.id === 'trash' && active.data?.current?.type === 'task') {
      deleteTask(active.data.current.columnId, active.id);
      return;
    }

    if (
      active.data?.current?.type === 'task' &&
      over.data?.current?.type === 'task'
    ) {
      const fromCol = active.data.current.columnId;
      const toCol = over.data.current.columnId;
      const taskId = active.id;
      const targetTaskId = over.id;
      moveTask(fromCol, toCol, taskId, targetTaskId);
    }
  }

  function handleTaskClick(taskId) {
    navigate(`/column/${columnId}/task/${taskId}`);
  }

  const columnTitle =
    columnId === 'todo'
      ? 'Todo'
      : columnId.charAt(0).toUpperCase() + columnId.slice(1);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      <main className="flex-1 flex flex-col items-center w-full" role="main">
        <h1 className="text-3xl font-bold my-6">{columnTitle}</h1>
        <section
          aria-label={`Tasks in ${columnId} column`}
          className="flex flex-1 w-full justify-center items-center flex-col"
        >
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <BoardColumn
              id={columnId}
              items={column}
              onDelete={deleteTask}
              onTaskClick={handleTaskClick}
            />
            <TrashArea visible={isTaskDragging} />
          </DndContext>
        </section>
        <nav className="mt-6 items-center flex">
          <Link to="/" className="btn border-secondary hover:text-secondary">
            ← Back
          </Link>
        </nav>
        {/* Task Modal */}
        {selectedTask && (
          <TaskModal
            taskId={selectedTask}
            tasks={tasksWithCol}
            onClose={() => {
              setSelectedTask(null);
              localStorage.removeItem('lastViewedTask');
            }}
          />
        )}
        {/* Column Modal, om du vill använda */}
        {showColumnModal && (
          <ColumnModal
            columnId={columnId}
            columnName={columnTitle}
            tasks={column}
            onClose={() => setShowColumnModal(false)}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
