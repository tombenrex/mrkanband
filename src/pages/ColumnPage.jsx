import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DndContext } from '@dnd-kit/core';
import BoardColumn from '../components/board/BoardColumn.jsx';
import TrashArea from '../components/board/TrashArea.jsx';
import Title from '../components/layout/Title.jsx';
import Footer from '../components/layout/Footer.jsx';
import TaskModal from '../components/board/TaskModal.jsx';
import { useBoard } from '../context/BoardContext.jsx';

export default function ColumnPage() {
  const { columnId } = useParams();
  const { columns, deleteTask, moveTask } = useBoard();
  const [isTaskDragging, setIsTaskDragging] = useState(false);
  const [selectedTask, setSelectedTask] = useState(
    localStorage.getItem('lastViewedTask') || null
  );
  const navigate = useNavigate();

  const column = columns[columnId];
  if (!column) return <div>Column not found</div>;

  const tasksWithCol = column.map((t) => ({ ...t, columnId }));

  // --- Drag start ---
  function handleDragStart({ active }) {
    if (active.data?.current?.type === 'task') setIsTaskDragging(true);
  }

  // --- Drag end ---
  function handleDragEnd({ active, over }) {
    setIsTaskDragging(false);
    if (!over) return;

    // Trash
    if (over.id === 'trash' && active.data?.current?.type === 'task') {
      deleteTask(active.data.current.columnId, active.id);
      return;
    }

    // Flytta task inom eller mellan kolumner
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

  // Navigera till taskens URL när man klickar på ett kort
  function handleTaskClick(taskId) {
    navigate(`/column/${columnId}/task/${taskId}`);
  }

  return (
    <div className="app-container roboto m-2 h-full flex flex-col items-center text-white">
      <Title text={`Column: ${columnId}`} />

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <BoardColumn
          id={columnId}
          title={columnId.charAt(0).toUpperCase() + columnId.slice(1)}
          items={column}
          onDelete={deleteTask}
          onTaskClick={handleTaskClick}
        />
        <TrashArea visible={isTaskDragging} />
      </DndContext>

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

      <Footer />
    </div>
  );
}
