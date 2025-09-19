import { useDroppable } from '@dnd-kit/core';

export function useTrashArea() {
  return useDroppable({ id: 'trash' });
}
