import {useState, useEffect} from 'react';
import { getTasks, createTask, updateTask, deleteTask, toggleTask } from "./services/api";
import "./styles/App.css";

import TaskFilter from './components/TaskFilter';

import TaskCarousel from './components/TaskCarousel';
import TaskForm from './components/TaskForm';

function App() {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  const [editingTask, setEditingTask] = useState(null);

  async function submitHandler(task) {
    if (editingTask) {
        await editHandler(editingTask.id, task);
    } else {
        await createHandler(task);
    }
    setEditingTask(null);
  }


  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed'){
        return task.completed
    }
    if(filter === 'pending') {
        return !task.completed
    }
    return true
  })


async function createHandler(task) {
    try {
        const newTask = await createTask(task);
        setTasks([...tasks, newTask]);
        setError(null);
    } catch (error) {
        setError(error.message);
    }
}

async function ToggleHandler(taskId) {
    try {
        const updatedTask = await toggleTask(taskId);
        setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
        setError(null);
    } catch (error) {
        setError(error.message);
    }
}

async function deleteHandler(taskId) {
    if (!window.confirm('Delete this task?')) return;
    try {
        await deleteTask(taskId);
        setTasks(tasks.filter(task => task.id !== taskId));
        setError(null);
    } catch (error) {
        setError(error.message);
    }
}

async function editHandler(id ,UpdatedTask) {
    try {
        const task = await updateTask(id, UpdatedTask);
        setTasks(tasks.map(t => t.id === task.id ? task : t));
        setError(null);
    } catch (error) {
        setError(error.message);
    }
}

useEffect(() => {
    const fetchTasks = async () => {
        try {
        setError(null);
        const tasks = await getTasks();
        setTasks(tasks);
        } catch (error) {
        setError(error.message);
        } finally {
        setLoading(false);
        }
    }

    fetchTasks();
}, []);

return (
    <div className='app'>
        <h1>Task List</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
       {!loading && 
       <>
        <TaskFilter filter={filter} onFilterChange={setFilter} />
        <TaskCarousel tasks={filteredTasks}
         onToggle={ToggleHandler}
        onDelete={deleteHandler}
        onEdit={setEditingTask} />
        <TaskForm AddTask={submitHandler} editingTask={editingTask} />
       </>
       }
    </div>
);

}

export default App;