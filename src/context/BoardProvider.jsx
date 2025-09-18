import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { BoardContext } from './BoardContext';

const LOCAL_STORAGE_KEY = 'mrkanband-columns';

export function BoardProvider({ children }) {
  const initialColumns = {
    todo: [],
    doing: [],
    done: [],
  };

  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialColumns;
  });

  const [columnOrder, setColumnOrder] = useState(['todo', 'doing', 'done']);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  function addTask(columnId, text) {
    if (!text.trim()) return;
    const newTask = { id: nanoid(), text: text.trim() };
    setColumns((prev) => ({
      ...prev,
      [columnId]: [...prev[columnId], newTask],
    }));
  }

  function deleteTask(columnId, taskId) {
    setColumns((prev) => ({
      ...prev,
      [columnId]: prev[columnId].filter((t) => t.id !== taskId),
    }));
  }

  function moveColumn(fromIdx, toIdx) {
    setColumnOrder((prev) => {
      const newOrder = [...prev];
      const [moved] = newOrder.splice(fromIdx, 1);
      newOrder.splice(toIdx, 0, moved);
      return newOrder;
    });
  }

  // Skydda mot dubbletter!
  function moveTask(fromCol, toCol, taskId, targetTaskId) {
    setColumns((prev) => {
      const fromList = prev[fromCol].filter((t) => t.id !== taskId);
      const movedTask = prev[fromCol].find((t) => t.id === taskId);
      if (!movedTask) return prev;
      let toList = prev[toCol].filter((t) => t.id !== taskId);
      let targetIdx = toList.findIndex((t) => t.id === targetTaskId);
      if (targetIdx === -1) targetIdx = toList.length;
      toList.splice(targetIdx, 0, movedTask);
      return {
        ...prev,
        [fromCol]: fromList,
        [toCol]: toList,
      };
    });
  }

  const value = {
    columns,
    columnOrder,
    addTask,
    deleteTask,
    moveColumn,
    moveTask,
    setColumns,
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}
