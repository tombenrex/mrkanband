import { DndContext } from '@dnd-kit/core';
import { useBoardStore } from '../store/useBoardStore';
import { Header, Footer } from '@layout';
import { BoardColumn, TrashArea, TaskModal, AddTaskForm } from '@board';

import { useBoardDnD } from '../hooks/useBoardDnD';
import { useTaskModalState } from '../hooks/useTaskModalState';
import { useAddTaskForm } from '../hooks/useAddTaskForm';

export default function BoardPage() {
  const columns = useBoardStore((state) => state.columns);
  const columnOrder = useBoardStore((state) => state.columnOrder);
  const addTask = useBoardStore((state) => state.addTask);
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const moveTask = useBoardStore((state) => state.moveTask);

  // DnD hook
  const { isTaskDragging, handleDragStart, handleDragEnd } = useBoardDnD({
    deleteTask,
    moveTask,
  });

  // Modal state hook
  const {
    selectedTask,
    modalTask,
    modalCol,
    handleTaskClick,
    handleCloseModal,
  } = useTaskModalState(columns, columnOrder);

  // Add task form hook - OBS! rätt ordning på argumenten!
  const { value, addToCol, onChange, onColChange, onSubmit } = useAddTaskForm(
    columnOrder[0],
    columnOrder,
    (text, col) => addTask(col, text) // <--- RÄTT
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center" role="main">
        <section aria-label="Add new task" className="w-full">
          <AddTaskForm
            value={value}
            onChange={onChange}
            addToCol={addToCol}
            onColChange={onColChange}
            onSubmit={onSubmit}
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
