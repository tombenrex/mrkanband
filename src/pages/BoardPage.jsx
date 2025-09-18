import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndContext } from '@dnd-kit/core';

import { BoardColumn, TrashArea, TaskModal } from '@board';
import { Title, Footer } from '@layout';
import { useBoard } from '@context';

export default function BoardPage() {
  const { columns, columnOrder, addTask, deleteTask, moveTask } = useBoard();
  const [newTaskText, setNewTaskText] = useState('');
  const [addToCol, setAddToCol] = useState(columnOrder[0] || 'todo');
  const [isTaskDragging, setIsTaskDragging] = useState(false);
  const [selectedTask, setSelectedTask] = useState(
    localStorage.getItem('lastViewedTask') || null
  );
  const navigate = useNavigate();

  // Samla alla tasks med columnId
  const allTasks = columnOrder.flatMap((colId) =>
    columns[colId].map((t) => ({ ...t, columnId: colId }))
  );

  // Lägg till task
  function handleAddTask(e) {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    addTask(addToCol, newTaskText.trim());
    setNewTaskText('');
  }

  // Drag start
  function handleDragStart({ active }) {
    if (active.data?.current?.type === 'task') setIsTaskDragging(true);
  }

  // Drag end
  function handleDragEnd({ active, over }) {
    setIsTaskDragging(false);
    if (!over) return;

    // Trash
    if (over.id === 'trash' && active.data?.current?.type === 'task') {
      deleteTask(active.data.current.columnId, active.id);
      return;
    }

    // Flytta task mellan kolumner
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

  // När man klickar på ett kort: navigera till rätt URL
  function handleTaskClick(taskId) {
    const colId = columnOrder.find((colId) =>
      columns[colId].some((t) => t.id === taskId)
    );
    if (colId) {
      navigate(`/column/${colId}/task/${taskId}`);
    } else {
      setSelectedTask(taskId);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center p-2">
        <Title />

        {/* Add Task Form */}
        <form
          onSubmit={handleAddTask}
          className="flex gap-2 justify-center mt-6 mb-2"
        >
          <input
            type="text"
            className="input input-bordered input-primary w-full"
            placeholder="New task"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
          />
          <select
            className="select select-primary"
            value={addToCol}
            onChange={(e) => setAddToCol(e.target.value)}
          >
            {columnOrder.map((colId) => (
              <option key={colId} value={colId}>
                {colId.charAt(0).toUpperCase() + colId.slice(1)}
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </form>

        {/* Columns */}
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="flex gap-6 justify-center flex-wrap mt-10">
            {columnOrder.map((colId) => (
              <BoardColumn
                key={colId}
                id={colId}
                title={colId.charAt(0).toUpperCase() + colId.slice(1)}
                items={columns[colId]}
                onDelete={deleteTask}
                onTaskClick={handleTaskClick}
              />
            ))}
          </div>
          <TrashArea visible={isTaskDragging} />
        </DndContext>

        {/* Task Modal */}
        {selectedTask && (
          <TaskModal
            taskId={selectedTask}
            tasks={allTasks}
            onClose={() => setSelectedTask(null)}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
