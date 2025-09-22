import { useState } from 'react';

export function useTaskForm(initialColumn, columnOrder, onTaskSubmit) {
  const [value, setValue] = useState('');
  const [addToCol, setAddToCol] = useState(initialColumn || columnOrder[0]);

  const handleChange = (val) => setValue(val);
  const handleColChange = (val) => setAddToCol(val);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === '') return;
    onTaskSubmit(value, addToCol);
    setValue('');
  };

  return {
    value,
    addToCol,
    onChange: handleChange,
    onColChange: handleColChange,
    onSubmit: handleSubmit,
  };
}
