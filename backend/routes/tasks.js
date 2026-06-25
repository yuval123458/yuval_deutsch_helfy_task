const express = require('express');

const router = express.Router();

const validateTask = require('../middleware/validateTask.js');

let tasks = [];
let id = 1;

router.get('/', (req, res) => {
    res.status(200).json(tasks);
});

router.post('/', validateTask ,(req, res) => {

    const { title, description, priority } = req.body;
    const task = {id: id++, title, description, priority, completed: false, createdAt: new Date().toISOString()};
    tasks.push(task);
    res.status(201).json(task);
});

router.delete('/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const index = tasks.findIndex(task => task.id === id);
    
    if (index === -1) {
        const error = new Error('task not found');
        error.status = 404;
        return next(error);
    }
    else {
        tasks.splice(index, 1);
        res.status(200).json({ message: 'task deleted'});
    }
});

router.patch('/:id/toggle', (req, res, next) => {
    const id = Number(req.params.id);
    const task = tasks.find(task => task.id === id);
    
    if (!task) {
        const error = new Error('task not found');
        error.status = 404;
        return next(error);
    }
    else {
        task.completed = !task.completed;
        res.status(200).json(task);
    }
});

router.put('/:id', validateTask ,(req, res, next) => {
    const id = Number(req.params.id);
    const task = tasks.find(task => task.id === id);
    
    if (!task) {
        const error = new Error('task not found');
        error.status = 404;
        return next(error);
    }
    else {
        const { title, description, priority } = req.body;
        task.title = title;
        task.description = description;
        task.priority = priority;
        res.status(200).json(task);
    }
});


module.exports = router;