import { create } from 'zustand';
import { nanoid } from 'nanoid';

const LOCAL_STORAGE_KEY = 'mrkanband-columns';
const TRASH_KEY = 'mrkanband-trash';

const initialColumns = {
  todo: [],
  doing: [],
  done: [],
};

function loadFromStorage() {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  return saved ? JSON.parse(saved) : initialColumns;
}

function addToTrash(task, fromColumn) {
  const trash = JSON.parse(localStorage.getItem(TRASH_KEY) || '[]');
  trash.push({ ...task, column: fromColumn, deletedAt: Date.now() });
  localStorage.setItem(TRASH_KEY, JSON.stringify(trash));
}

export const useBoardStore = create((set) => ({
  columns: loadFromStorage(),
  columnOrder: ['todo', 'doing', 'done'],

  addTask: (columnId, text) => {
    if (!text.trim()) return;
    const newTask = { id: nanoid(), text: text.trim() };
    set((state) => {
      const updated = {
        ...state.columns,
        [columnId]: [...state.columns[columnId], newTask],
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return { columns: updated };
    });
  },

  deleteTask: (columnId, taskId) => {
    set((state) => {
      const task = state.columns[columnId].find((t) => t.id === taskId);
      if (task) {
        addToTrash(task, columnId);
      }
      const updated = {
        ...state.columns,
        [columnId]: state.columns[columnId].filter((t) => t.id !== taskId),
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return { columns: updated };
    });
  },

  getTrash: () => {
    return JSON.parse(localStorage.getItem(TRASH_KEY) || '[]');
  },

  clearTrash: () => {
    localStorage.removeItem(TRASH_KEY);
  },

  moveColumn: (fromIdx, toIdx) => {
    set((state) => {
      const newOrder = [...state.columnOrder];
      const [moved] = newOrder.splice(fromIdx, 1);
      newOrder.splice(toIdx, 0, moved);
      return { columnOrder: newOrder };
    });
  },

  moveTask: (fromCol, toCol, taskId, targetTaskId) => {
    set((state) => {
      const fromList = state.columns[fromCol].filter((t) => t.id !== taskId);
      const movedTask = state.columns[fromCol].find((t) => t.id === taskId);
      if (!movedTask) return {};
      let toList = state.columns[toCol].filter((t) => t.id !== taskId);
      let targetIdx = toList.findIndex((t) => t.id === targetTaskId);
      if (targetIdx === -1) targetIdx = toList.length;
      toList.splice(targetIdx, 0, movedTask);
      const updated = {
        ...state.columns,
        [fromCol]: fromList,
        [toCol]: toList,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return { columns: updated };
    });
  },

  editTask: (columnId, taskId, newText) => {
    set((state) => {
      const updated = {
        ...state.columns,
        [columnId]: state.columns[columnId].map((t) =>
          t.id === taskId ? { ...t, text: newText } : t
        ),
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return { columns: updated };
    });
  },
}));
