import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { useBoardStore } from '@store';
import { Header, Footer } from '@layout';

import { useBoardDnD, useTaskModalState } from '@hooks';
import { BoardColumn, TrashArea, TaskModal, AddTaskForm } from '@board';

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
    <div className="min-h-screen flex flex-col relative transition-all duration-400 w-full bg-base-200 text-base-content">
      <div
        className={`transition-opacity duration-300 ${
          editMode
            ? 'opacity-10 pointer-events-none'
            : 'opacity-100 pointer-events-auto'
        }`}
      >
        <Header />
      </div>

      <section
        aria-label="Add new task"
        className={`w-full px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 transition-opacity duration-300 ${
          editMode
            ? 'opacity-10 pointer-events-none'
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
        className="flex-1 flex flex-col items-center w-full px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32"
        role="main"
      >
        <section
          aria-label="Kanban board"
          className="w-full flex-col flex items-center"
        >
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div
              className="
                m-2
                p-2 sm:p-4 md:p-6 lg:p-10
                gap-4 sm:gap-6 md:gap-8
                flex flex-col
                sm:grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-items-center
                w-full
              "
            >
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

            <div className="flex flex-row justify-center items-center gap-3 w-full my-3 sm:my-6 z-20">
              <TrashArea
                visible={isTaskDragging && editMode}
                editMode={editMode}
              />
              <button
                onClick={() => setEditMode((v) => !v)}
                aria-label={editMode ? 'Exit move mode' : 'Enter move mode'}
                title={editMode ? 'Exit move mode' : 'Enter move mode'}
                aria-pressed={editMode}
                tabIndex={0}
                className={`
                  btn btn-circle shadow-lg border-2 transition
                  ${
                    editMode
                      ? 'btn-secondary border-secondary'
                      : 'btn-primary border-primary'
                  }
                  hover:btn-accent
                  focus:outline-none focus:ring-2 focus:ring-accent
                  active:scale-95
                  w-14 h-14 sm:w-14 sm:h-14
                `}
                style={{ fontSize: 0 }}
              >
                <ArrowsRightLeftIcon
                  className="w-8 h-8 sm:w-7 sm:h-7"
                  aria-hidden="true"
                />
              </button>
            </div>
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

      <div
        className={`transition-opacity duration-300 ${
          editMode
            ? 'opacity-5 pointer-events-none'
            : 'opacity-100 pointer-events-auto'
        }`}
      >
        <Footer />
      </div>
    </div>
  );
}
