import {useState, useEffect} from 'react';
import { getTasks } from "./services/api";

function App() {


  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

useEffect(() => {
    const fetchTasks = async () => {
        try {
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
        <ul>
            {tasks.map(task => (
                <li key={task.id}>{task.title} - {task.description} - {task.priority}</li>
            ))}
        </ul>
    </div>
);

}

export default App;