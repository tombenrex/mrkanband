import PropTypes from 'prop-types';
import { useTaskForm } from '@hooks';

export default function AddTaskForm({
  columnOrder,
  onTaskSubmit,
  initialColumn,
}) {
  const { value, addToCol, onChange, onColChange, onSubmit } = useTaskForm(
    initialColumn,
    columnOrder,
    onTaskSubmit
  );

  return (
    <form
      onSubmit={onSubmit}
      className="flex gap-2 justify-center p-5 mx-auto border-2 border-secondary bg-base-100 rounded-lg"
    >
      <label htmlFor="new-task" className="sr-only">
        Task description
      </label>
      <input
        id="new-task"
        name="new-task"
        type="text"
        className="input input-primary w-full"
        placeholder="Write Your New Task Here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <label htmlFor="column-select" className="sr-only">
        Select column
      </label>
      <select
        id="column-select"
        name="column"
        className="select select-secondary"
        value={addToCol}
        onChange={(e) => onColChange(e.target.value)}
      >
        {columnOrder.map((colId) => (
          <option key={colId} value={colId}>
            {colId.charAt(0).toUpperCase() + colId.slice(1)}
          </option>
        ))}
      </select>
      <button type="submit" className="btn btn-primary hover:btn-secondary">
        Go
      </button>
    </form>
  );
}

AddTaskForm.propTypes = {
  columnOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
  onTaskSubmit: PropTypes.func.isRequired,
  initialColumn: PropTypes.string,
};
