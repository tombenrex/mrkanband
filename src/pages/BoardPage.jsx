import { useState } from 'react';

import { DndContext } from '@dnd-kit/core';
import { useBoardStore } from '../store/useBoardStore';

import { Header, Footer } from '@layout';
import { BoardColumn, TrashArea, TaskModal, AddTaskForm } from '@board';

export default function BoardPage() {
  // Hämta state och actions från Zustand-store
  const columns = useBoardStore((state) => state.columns);
  const columnOrder = useBoardStore((state) => state.columnOrder);
  const addTask = useBoardStore((state) => state.addTask);
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const moveTask = useBoardStore((state) => state.moveTask);

  const [newTaskText, setNewTaskText] = useState('');
  const [addToCol, setAddToCol] = useState(columnOrder[0] || 'todo');
  const [isTaskDragging, setIsTaskDragging] = useState(false);
  const [selectedTask, setSelectedTask] = useState(
    localStorage.getItem('lastViewedTask') || null
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
      // Spara senaste visade task (valfritt, kan tas bort)
      localStorage.setItem('lastViewedTask', taskId);
      setSelectedTask(taskId);
    } else {
      setSelectedTask(taskId);
    }
  }

  function handleCloseModal() {
    setSelectedTask(null);
    localStorage.removeItem('lastViewedTask');
  }

  // Hitta rätt task och kolumn till modalen
  let modalTask = null;
  let modalCol = null;
  if (selectedTask) {
    modalCol = columnOrder.find((colId) =>
      columns[colId].some((t) => t.id === selectedTask)
    );
    modalTask = modalCol
      ? columns[modalCol].find((t) => t.id === selectedTask)
      : null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center" role="main">
        <section aria-label="Add new task" className="w-full">
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
            <div className="flex gap-7 justify-center mt-10">
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
        {selectedTask && modalTask && modalCol && (
          <TaskModal
            task={modalTask}
            columnId={modalCol}
            onClose={handleCloseModal}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
