function TaskFilter({ filter, onFilterChange }) {
  return (
    <div className="filter">
      <button onClick={() => onFilterChange('all')}>All</button>
      <button onClick={() => onFilterChange('completed')}>Completed</button>
      <button onClick={() => onFilterChange('pending')}>Pending</button>
    </div>
  );
}
export default TaskFilter;
