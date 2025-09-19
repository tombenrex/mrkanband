import { useNavigate, useParams } from 'react-router-dom';

import { useBoard } from '@context';
import { ColumnModal } from '@board';

export default function ColumnPage() {
  const { columnId } = useParams();
  const { columns } = useBoard();
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
