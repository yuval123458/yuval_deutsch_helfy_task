import {useState} from "react";

import TaskItem from "./TaskItem";

function TaskCarousel({tasks, onToggle, onDelete, onEdit}) {

    const [currentIndex, setCurrentIndex] = useState(0);
    
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? tasks.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === tasks.length - 1 ? 0 : prevIndex + 1));
    };

    if(!tasks || tasks.length === 0) {
        return <p>No tasks available</p>;
    }

    const Index = Math.min(currentIndex, tasks.length - 1);


    return (
        <div className="carousel">
            <button onClick={handlePrev}>{'<'}</button>

            <div className= "carousel-items"></div>
            <div className="carousel-item">
                {tasks.length > 0 && <TaskItem task={tasks[Index]} onDelete={onDelete} onToggle={onToggle} onEdit={onEdit} />}
            </div>
            <button onClick={handleNext}>{'>'}</button>
        </div>
    )
}

export default TaskCarousel;