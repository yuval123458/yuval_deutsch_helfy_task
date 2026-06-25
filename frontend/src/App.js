import {useState, useEffect} from 'react';
import { getTasks, createTask, updateTask, deleteTask, toggleTask } from "./services/api";

import TaskCarousel from './components/TaskCarousel';
import TaskForm from './components/TaskForm';

function App() {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingTask, setEditingTask] = useState(null);

  async function submitHandler(task) {
    if (editingTask) {
        await editHandler(editingTask.id, task);
    } else {
        await createHandler(task);
    }
    setEditingTask(null);
  }


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
    <div>
        <h1>Task List</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <TaskCarousel tasks={tasks}
         onToggle={ToggleHandler}
        onDelete={deleteHandler}
        onEdit={setEditingTask} />
        <TaskForm AddTask={submitHandler} editingTask={editingTask} />
    </div>
);

}

export default App;