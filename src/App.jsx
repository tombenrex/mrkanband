import { Routes, Route } from 'react-router-dom';
import { TaskPage, ColumnPage, BoardPage } from '@pages';
import './styles/App.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BoardPage />} />
      <Route path="/column/:columnId" element={<ColumnPage />} />
      <Route path="/column/:columnId/task/:taskId" element={<TaskPage />} />
    </Routes>
  );
}
