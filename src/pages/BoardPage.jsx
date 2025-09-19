import { useBoard } from '../context/useBoard';
import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import {
  BoardColumn,
  TrashArea,
  TaskModal,
  AddTaskForm,
} from '../components/board';
import { Header, Footer } from '../components/layout';
import { useNavigate } from 'react-router-dom';

export default function BoardPage() {
  const { columns, columnOrder, addTask, deleteTask, moveTask } = useBoard();
  const [newTaskText, setNewTaskText] = useState('');
  const [addToCol, setAddToCol] = useState(columnOrder[0] || 'todo');
  const [isTaskDragging, setIsTaskDragging] = useState(false);
  const [selectedTask, setSelectedTask] = useState(
    localStorage.getItem('lastViewedTask') || null
  );
  const navigate = useNavigate();

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
      <Header />
      <main className="flex-1 flex flex-col items-center" role="main">
        <section aria-label="Add new task" className="w-full max-w-2xl">
          <AddTaskForm
            value={newTaskText}
            onChange={setNewTaskText}
            addToCol={addToCol}
            onColChange={setAddToCol}
            onSubmit={handleAddTask}
            columnOrder={columnOrder}
          />
        </section>
        <section aria-label="Kanban board" className="w-full">
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
        </section>
        {selectedTask && (
          <TaskModal
            taskId={selectedTask}
            tasks={columnOrder.flatMap((colId) =>
              columns[colId].map((t) => ({ ...t, columnId: colId }))
            )}
            onClose={() => {
              setSelectedTask(null);
              localStorage.removeItem('lastViewedTask');
            }}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
