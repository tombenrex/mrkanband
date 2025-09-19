import PropTypes from 'prop-types';

export default function AddTaskForm({
  value,
  onChange,
  addToCol,
  onColChange,
  onSubmit,
  columnOrder,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex gap-2 justify-center p-4 border-b-2 border-secondary"
    >
      <input
        id="new-task"
        name="new-task"
        type="text"
        className="input input-bordered input-primary w-full"
        placeholder="New task"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <select
        id="column-select"
        name="column"
        className="select select-primary"
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
        Add Task
      </button>
    </form>
  );
}

AddTaskForm.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  addToCol: PropTypes.string.isRequired,
  onColChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  columnOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
};
