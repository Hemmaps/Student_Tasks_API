import Task from '../models/taskModel.js';

// Create a new task
export const createTask = async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201).json(newTask);
    } catch (e) {
        res.status(500).send(e.message);
    }
};


export const readTasks = async (req, res) => {
    try {
        const { courseId } = req.params; // Extract courseId from request parameters
        console.log("Course ID:", courseId); // Log courseId to verify

        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required." }); // Handle case where courseId is missing
        }

        // Query tasks based on courseId
        const tasks = await Task.find({ courseId: courseId });

        if (tasks.length > 0) {
            res.status(200).json(tasks); // Return tasks if found
        } else {
            res.status(404).json({ message: 'No tasks found for this course.' });
        }
    } catch (error) {
        res.status(500).send(error.message); // Return error message if an exception occurs
    }
};
// Get a specific task by taskId
export const readSpecificTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await Task.findById(taskId);
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: 'Task not found.' });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Update a specific task by taskId
export const updateTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const updateData = req.body;
        const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
        if (updatedTask) {
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found.' });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Delete a specific task by taskId
export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (deletedTask) {
            res.status(200).json({ message: 'Task deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Task not found.' });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
