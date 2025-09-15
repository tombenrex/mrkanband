import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { nanoid } from 'nanoid';
import BoardColumn from './components/BoardColumn.jsx';
import TrashArea from './components/TrashArea.jsx';
import './styles/App.css';
import Title from './components/Title.jsx';

const initialColumns = {
  todo: [],
  inprogress: [],
  done: [],
};

const columnTitles = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done',
};

export default function App() {
  const [isTaskDragging, setIsTaskDragging] = useState(false);
  const [columnOrder, setColumnOrder] = useState([
    'todo',
    'inprogress',
    'done',
  ]);

  const [columns, setColumns] = useState(initialColumns);
  const [newTaskText, setNewTaskText] = useState('');
  const [addToCol, setAddToCol] = useState('todo');

  function handleDragStart(event) {
    const { active } = event;
    if (active.data?.current?.type === 'task') {
      setIsTaskDragging(true);
    }
  }

  function handleDragEnd({ active, over }) {
    setIsTaskDragging(false);

    if (!over) return;

    if (over.id === 'trash' && active.data?.current?.type === 'task') {
      const fromCol = active.data.current.columnId;
      setColumns((prev) => ({
        ...prev,
        [fromCol]: prev[fromCol].filter((t) => t.id !== active.id),
      }));
      return;
    }

    if (active.data?.current?.type === 'column') {
      if (active.id !== over.id) {
        setColumnOrder((items) => {
          const oldIndex = items.indexOf(active.id);
          const newIndex = items.indexOf(over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
      return;
    }

    if (
      active.data?.current?.type === 'task' &&
      over.data?.current?.type === 'task'
    ) {
      const fromCol = active.data.current.columnId;
      const toCol = over.data.current.columnId;

      if (!fromCol || !toCol) return;

      setColumns((prev) => {
        const source = [...prev[fromCol]];
        const dest = fromCol === toCol ? source : [...prev[toCol]];

        const taskIdx = source.findIndex((t) => t.id === active.id);
        if (taskIdx === -1) return prev;

        const [movedTask] = source.splice(taskIdx, 1);

        // Find insertion index
        let insertIndex = dest.findIndex((t) => t.id === over.id);
        if (insertIndex === -1) insertIndex = dest.length;
        dest.splice(insertIndex, 0, movedTask);

        return {
          ...prev,
          [fromCol]: source,
          [toCol]: dest,
        };
      });
    }
  }

  function handleAddTask(e) {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask = { id: nanoid(), text: newTaskText.trim() };
    setColumns((prev) => ({
      ...prev,
      [addToCol]: [...prev[addToCol], newTask],
    }));
    setNewTaskText('');
  }

  function handleDeleteTask(colId, taskId) {
    setColumns((prev) => ({
      ...prev,
      [colId]: prev[colId].filter((t) => t.id !== taskId),
    }));
  }

  return (
    <div className="app-container">
      <Title text="Mr.Kanband" />
      <div className="roboto m-2">
        <form
          onSubmit={handleAddTask}
          className="flex gap-2 justify-center mt-6 mb-2 text-white"
        >
          <label htmlFor="new-task" className="sr-only">
            New Task
          </label>
          <input
            type="text"
            className="border rounded px-2 py-1 text-white"
            value={newTaskText}
            placeholder="New task"
            onChange={(e) => setNewTaskText(e.target.value)}
          />
          <select
            className="border rounded px-2 py-1 bg-gray-700 text-white"
            value={addToCol}
            onChange={(e) => setAddToCol(e.target.value)}
          >
            {columnOrder.map((colId) => (
              <option key={colId} value={colId}>
                {columnTitles[colId]}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </form>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <SortableContext
            items={columnOrder}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex gap-6 justify-center mt-10">
              {columnOrder.map((colId) => (
                <BoardColumn
                  key={colId}
                  id={colId}
                  title={columnTitles[colId]}
                  items={columns[colId]}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          </SortableContext>
          <TrashArea visible={isTaskDragging} />
        </DndContext>
      </div>
    </div>
  );
}
