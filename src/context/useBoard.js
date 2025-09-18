import { useContext } from 'react';
import { BoardContext } from './BoardContext';

export function useBoard() {
  return useContext(BoardContext);
}
