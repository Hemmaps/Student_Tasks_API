import express from 'express';
import { createTask,readTasks,updateTask,deleteTask, readSpecificTask } from '../controllers/taskControllers.js';

const routerTasks = express.Router({mergeParams:true});


// Retrieve all tasks for a specific course
routerTasks.get('/:courseId/tasks', readTasks);

// Create a new task for a specific course
routerTasks.post('/tasks', createTask);

//read specific task by task ID
routerTasks.get('/tasks/:taskId',readSpecificTask)

// Update a specific task by task ID (if needed)
routerTasks.put('/tasks/:taskId', updateTask);

// Delete a specific task by task ID (if needed)
routerTasks.delete('/tasks/:taskId', deleteTask);

export default routerTasks;


