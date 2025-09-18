import { Routes, Route } from 'react-router-dom';
import BoardPage from './pages/BoardPage.jsx';
import ColumnPage from './pages/ColumnPage.jsx';
import TaskPage from './pages/TaskPage.jsx';
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
