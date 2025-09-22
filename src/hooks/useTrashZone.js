import { useDroppable } from '@dnd-kit/core';

export function useTrashZone() {
  return useDroppable({ id: 'trash' });
}
