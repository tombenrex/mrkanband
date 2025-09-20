import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { useBoardStore } from '@store';
import { Header, Footer } from '@layout';

import { BoardColumn, TrashArea, TaskModal, AddTaskForm } from '@board';
import { useBoardDnD, useTaskModalState } from '@hooks';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

export default function BoardPage() {
  const [editMode, setEditMode] = useState(false);

  const columns = useBoardStore((state) => state.columns);
  const columnOrder = useBoardStore((state) => state.columnOrder);
  const addTask = useBoardStore((state) => state.addTask);
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const moveTask = useBoardStore((state) => state.moveTask);

  const { isTaskDragging, handleDragStart, handleDragEnd } = useBoardDnD({
    deleteTask,
    moveTask,
    editMode,
  });

  const {
    selectedTask,
    modalTask,
    modalCol,
    handleTaskClick,
    handleCloseModal,
  } = useTaskModalState(columns, columnOrder);

  return (
    <div className="min-h-screen flex flex-col relative transition-all duration-200">
      <div
        className={`transition-opacity duration-300 ${
          editMode
            ? 'opacity-30 pointer-events-none'
            : 'opacity-100 pointer-events-auto'
        }`}
      >
        <Header />
      </div>

      <section
        aria-label="Add new task"
        className={`pb-4 border-b-2 border-secondary w-full transition-opacity duration-300 ${
          editMode
            ? 'opacity-30 pointer-events-none'
            : 'opacity-100 pointer-events-auto'
        }`}
      >
        <AddTaskForm
          columnOrder={columnOrder}
          onTaskSubmit={(text, col) => addTask(col, text)}
          initialColumn={columnOrder[0]}
        />
      </section>

      <main
        className="flex-1 flex flex-col items-center w-full px-2 sm:px-6"
        role="main"
      >
        <section aria-label="Kanban board" className="w-full">
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 justify-center mt-4 sm:mt-10 w-full">
              {columnOrder.map((colId) => (
                <BoardColumn
                  key={colId}
                  id={colId}
                  title={colId.charAt(0).toUpperCase() + colId.slice(1)}
                  items={columns[colId]}
                  editMode={editMode}
                  onTaskClick={handleTaskClick}
                />
              ))}
            </div>
            <TrashArea
              visible={isTaskDragging && editMode}
              editMode={editMode}
            />
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

      <div className="flex justify-center my-3 sm:my-6 z-20 w-full">
        <button
          onClick={() => setEditMode((v) => !v)}
          aria-label={editMode ? 'Exit move mode' : 'Enter move mode'}
          title={editMode ? 'Exit move mode' : 'Enter move mode'}
          tabIndex={0}
          className={`
            flex items-center justify-center
            rounded-full shadow-lg
            transition
            bg-primary text-black
            hover:bg-secondary hover:text-white
            border-2 border-secondary
            focus:outline-none focus:ring-2 focus:ring-secondary
            w-14 h-14 sm:w-14 sm:h-14
            active:scale-95
          `}
          style={{ fontSize: 0 }}
        >
          <ArrowsRightLeftIcon
            className={`w-8 h-8 sm:w-7 sm:h-7 ${
              editMode ? 'text-secondary' : ''
            }`}
            aria-hidden="true"
          />
        </button>
      </div>

      <div
        className={`transition-opacity duration-300 ${
          editMode
            ? 'opacity-30 pointer-events-none'
            : 'opacity-100 pointer-events-auto'
        }`}
      >
        <Footer />
      </div>
    </div>
  );
}
