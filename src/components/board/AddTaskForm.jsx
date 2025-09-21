import PropTypes from 'prop-types';
import { useAddTaskForm } from '@hooks';

export default function AddTaskForm({
  columnOrder,
  onTaskSubmit,
  initialColumn,
}) {
  const { value, addToCol, onChange, onColChange, onSubmit } = useAddTaskForm(
    initialColumn,
    columnOrder,
    onTaskSubmit
  );

  return (
    <form
      onSubmit={onSubmit}
      className="flex gap-2 justify-center p-5 mx-auto border-b-2 border-r-2 border-l-2 border-secondary bg-base-100 rounded-lg"
    >
      <input
        id="new-task"
        name="new-task"
        type="text"
        className="input input-primary w-full"
        placeholder="Write Your New Task Here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
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
