import {useState} from "react";

import TaskItem from "./TaskItem";

function TaskCarousel({tasks, onToggle, onDelete, onEdit}) {

    const [currentIndex, setCurrentIndex] = useState(0);
    
    const handleNext = () => {
  setCurrentIndex(prev => (prev + 1) % tasks.length);
};

const handlePrev = () => {
  setCurrentIndex(prev => (prev - 1 + tasks.length) % tasks.length);
};

    if(!tasks || tasks.length === 0) {
        return <p>No tasks available</p>;
    }

    const Index = Math.min(currentIndex, tasks.length - 1);


    return (
        <div className="carousel">
            <button onClick={handlePrev}>{'<'}</button>

<div className="carousel-slide">                                  
  <div className="carousel-item"                                       
       style={{ transform: `translateX(-${Index * 100}%)` }}>
            {tasks.map(task => (
    <div className="carousel-card" key={task.id}>
        <TaskItem task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
    </div>
    ))}
    </div>
    </div>  
            <button onClick={handleNext}>{'>'}</button>
        </div>
    )
}

export default TaskCarousel;