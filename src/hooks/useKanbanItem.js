import { useDraggable } from '@dnd-kit/core';

export function useKanbanItem(id, columnId) {
  return useDraggable({
    id,
    data: { type: 'task', columnId },
    activationConstraint: { delay: 250, tolerance: 5 },
  });
}
