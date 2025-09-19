import { Routes, Route } from 'react-router-dom';
import { TaskPage, ColumnPage, BoardPage } from '@pages';
import { BoardProvider } from '@context';
import './styles/App.css';

export default function App() {
  return (
    <BoardProvider>
      <Routes>
        <Route path="/" element={<BoardPage />} />
        <Route path="/column/:columnId" element={<ColumnPage />} />
        <Route path="/column/:columnId/task/:taskId" element={<TaskPage />} />
      </Routes>
    </BoardProvider>
  );
}
