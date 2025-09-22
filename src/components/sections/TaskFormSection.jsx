import { TaskForm } from '@ui';

export default function TaskFormSection({ editMode, columnOrder, addTask }) {
  return (
    <section
      aria-label="Add new task"
      className={`w-full px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 transition-opacity duration-300 ${
        editMode
          ? 'opacity-10 pointer-events-none'
          : 'opacity-100 pointer-events-auto'
      }`}
    >
      <TaskForm
        columnOrder={columnOrder}
        onTaskSubmit={(text, col) => addTask(col, text)}
        initialColumn={columnOrder[0]}
      />
    </section>
  );
}
