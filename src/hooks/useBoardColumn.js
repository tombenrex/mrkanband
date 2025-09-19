import { useDroppable } from '@dnd-kit/core';

export function useBoardColumn(id) {
  return useDroppable({
    id,
    data: { type: 'task', columnId: id },
  });
}
