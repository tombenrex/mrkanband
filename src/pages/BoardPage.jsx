import { useState } from 'react';
import { useBoardStore } from '@store';
import { Header, Footer } from '@layout';
import { KanbanBoard, TaskFormSection } from '@sections';
import { useBoardDnd, useTaskModalState } from '@hooks';

export default function BoardPage() {
  const [editMode, setEditMode] = useState(false);

  const columns = useBoardStore((state) => state.columns);
  const columnOrder = useBoardStore((state) => state.columnOrder);
  const addTask = useBoardStore((state) => state.addTask);
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const moveTask = useBoardStore((state) => state.moveTask);

  const { isTaskDragging, handleDragStart, handleDragEnd } = useBoardDnd({
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
    <div className="min-h-screen flex flex-col gap-4 relative transition-all duration-400 w-full bg-base-200 text-base-content">
      <div
        className={`transition-opacity duration-300 ${
          editMode
            ? 'opacity-10 pointer-events-none'
            : 'opacity-100 pointer-events-auto'
        }`}
      >
        <Header />
      </div>
      <TaskFormSection
        editMode={editMode}
        columnOrder={columnOrder}
        addTask={addTask}
      />
      <KanbanBoard
        editMode={editMode}
        columns={columns}
        columnOrder={columnOrder}
        isTaskDragging={isTaskDragging}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
        handleTaskClick={handleTaskClick}
        setEditMode={setEditMode}
        selectedTask={selectedTask}
        modalTask={modalTask}
        modalCol={modalCol}
        handleCloseModal={handleCloseModal}
      />
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
