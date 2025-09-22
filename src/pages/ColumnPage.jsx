import { useNavigate, useParams } from 'react-router-dom';
import { useBoardStore } from '@store';
import { ColumnModal } from '@modal';

export default function ColumnPage() {
  const { columnId } = useParams();
  const columns = useBoardStore((state) => state.columns);
  const navigate = useNavigate();

  const column = columns[columnId];
  if (!column) return <div>Column not found</div>;

  return (
    <ColumnModal
      columnId={columnId}
      columnName={columnId.charAt(0).toUpperCase() + columnId.slice(1)}
      tasks={column}
      onClose={() => navigate('/')}
    />
  );
}
