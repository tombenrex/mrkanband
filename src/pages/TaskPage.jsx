import { useParams, useNavigate } from 'react-router-dom';
import { useBoardStore } from '@store';
import { TaskModal } from '@board';

export default function TaskPage() {
  const { columnId, taskId } = useParams();
  const columns = useBoardStore((state) => state.columns);
  const navigate = useNavigate();

  const column = columns[columnId];
  if (!column) return <div>Loading...</div>;

  const task = column.find((t) => t.id === taskId);
  if (!task) return <div>Task not found</div>;

  localStorage.setItem('lastViewedTask', taskId);

  return (
    <TaskModal
      task={task}
      onClose={() => {
        navigate(-1);
        localStorage.removeItem('lastViewedTask');
      }}
      showPermalink={true}
      columnId={columnId}
    />
  );
}
