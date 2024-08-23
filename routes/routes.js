import express from "express";
import courseRecord from "../models/courseModel.js";
import Task from "../models/taskModel.js";

// Initialize Router
const router = express.Router();

// Course Routes
router.post('/courses', async (req, res) => {
    try {
        const newCourse = await courseRecord.create(req.body);
        res.status(201).json(newCourse);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get('/courses', async (req, res) => {
    try {
        const courses = await courseRecord.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/courses/:courseId', async (req, res) => {
    try {
        const cid = req.params.courseId;
        const course = await courseRecord.findOne({ courseId: cid });
        if (course) {
            res.status(200).json(course);
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/courses/:courseId', async (req, res) => {
    try {
        const cid = req.params.courseId;
        const updateData = req.body;
        const updatedCourse = await courseRecord.findOneAndUpdate({ courseId: cid }, { $set: updateData }, { new: true });
        if (updatedCourse) {
            res.status(200).json(updatedCourse);
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/courses/:courseId', async (req, res) => {
    try {
        const cid = req.params.courseId;
        const deletedCourse = await courseRecord.findOneAndDelete({ courseId: cid });
        if (deletedCourse) {
            res.status(200).json({ message: "Course deleted successfully" });
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Task Routes
router.post('/courses/tasks', async (req, res) => {
    try {
        // const courseId = req.params.courseId;
        // const newTask = { ...req.body, courseId }; // Ensure courseId is included in task
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get('/courses/:courseId/tasks', async (req, res) => {
    try {
        const courseId = req.params.courseId;
        console.log(courseId)

        const tasks = await Task.find({ courseId });
        if (tasks.length > 0) {
            res.status(200).json(tasks);
        } else {
            res.status(404).json({ message: "No tasks found for this course." });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/courses/:courseId/tasks/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const updateData = req.body;
        const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
        if (updatedTask) {
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/courses/:courseId/tasks/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (deletedTask) {
            res.status(200).json({ message: "Task deleted successfully" });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
