import { useParams, useNavigate } from 'react-router-dom';
import { useBoard } from '../context/BoardContext.jsx';
import TaskModal from '../components/board/TaskModal.jsx';

export default function TaskPage() {
  const { columnId, taskId } = useParams();
  const { columns } = useBoard();
  const navigate = useNavigate();

  const column = columns[columnId];
  if (!column) return <div>Loading...</div>;

  const task = column.find((t) => t.id === taskId);
  if (!task) return <div>Task not found</div>;

  localStorage.setItem('lastViewedTask', taskId);

  return (
    <TaskModal
      taskId={taskId}
      tasks={column.map((t) => ({ ...t, columnId }))}
      onClose={() => {
        navigate(-1);
        localStorage.removeItem('lastViewedTask');
      }}
      showPermalink={true}
      columnId={columnId}
    />
  );
}
