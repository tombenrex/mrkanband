import { Routes, Route } from 'react-router-dom';
import BoardPage from './pages/BoardPage.jsx';
import ColumnPage from './pages/ColumnPage.jsx';
import TaskPage from './pages/TaskPage.jsx';
import { BoardProvider } from './context/BoardProvider.jsx';
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
