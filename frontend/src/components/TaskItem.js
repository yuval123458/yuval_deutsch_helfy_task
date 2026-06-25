



function TaskItem({ task, onToggle, onDelete, onEdit }) {
    return (
        <div className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <span className={`item-priority ${task.priority}`}>{task.priority}</span>
            <div className="item-buttons">            <button onClick={() => onToggle(task.id)}>{task.completed ? 'Incomplete' : 'Complete'}</button>
            <button onClick={() => onDelete(task.id)}>Delete Task</button>
            <button onClick={() => onEdit(task)}>Edit Task</button></div>

        </div>
    )
}

export default TaskItem;