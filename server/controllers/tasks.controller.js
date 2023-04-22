import { Task } from "../models/tasks.model.js";

// Create a new task
export const createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).send(newTask);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Retrieve all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Retrieve a single task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.status(200).send(task);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Update a single task by ID
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.status(200).send(task);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Delete a single task by ID
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.status(200).send(task);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Retrieve all tasks of a certain type
export const getTasksByType = async (req, res) => {
  try {
    const tasks = await Task.find({ type: req.params.type });
    res.status(200).send(tasks);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Retrieve all tasks sorted by due date
export const getTasksSortedByDueDate = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ dueDate: 1 });
    res.status(200).send(tasks);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
