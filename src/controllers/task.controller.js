import Task from "../models/Task.js";
import { getTasks } from "../services/task.service.js";

export const listTasks = async (req, res) => {
    const { tasks, total } = await getTasks(req.user.id, req.query);
    res.json({ success: true, data: tasks, meta: { total } });
};

export const createTask = async (req, res) => {
    const task = await Task.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json({ success: true, data: task });
};

export const getTask = async (req, res) => {
    const task = await Task.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!task) return res.status(404).json({ success: false });
    res.json({ success: true, data: task });
};

export const updateTask = async (req, res) => {
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, createdBy: req.user.id },
        req.body,
        { new: true }
    );
    res.json({ success: true, data: task });
};

export const deleteTask = async (req, res) => {
    await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
    res.json({ success: true });
};
