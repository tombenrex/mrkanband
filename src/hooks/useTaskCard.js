import { useDraggable } from '@dnd-kit/core';

export function useTaskCard(id, columnId, editMode) {
  const enabled = !!editMode;
  return useDraggable(
    enabled
      ? {
          id,
          data: { type: 'task', columnId },
          activationConstraint: { delay: 250, tolerance: 5 },
        }
      : { id, disabled: true }
  );
}
