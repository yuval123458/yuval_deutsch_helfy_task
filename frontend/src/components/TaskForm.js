import { useState, useEffect } from 'react';


function TaskForm({ AddTask, editingTask }) {


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [error, setError] = useState(null);


      
    useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
    } else {
      setTitle('');
    setDescription('');
    setPriority('medium');
    }
  }, [editingTask]);

    function handleSubmit(e) {
        e.preventDefault();

        if (!title || !description || !priority) {
            setError('please fill all fields');
            return;
        }
        AddTask({ title, description, priority });
        setTitle('');
        setDescription('');
        setPriority('medium');
    }

    return (
        <form onSubmit={handleSubmit}>
                {error && <p className="error">{error}</p>}
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
            </select>
            <button type="submit">{editingTask ? 'edit' : 'add task'}</button>
        </form>
    );
}

export default TaskForm;