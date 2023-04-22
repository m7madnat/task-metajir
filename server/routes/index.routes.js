import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByType,
  getTasksSortedByDueDate,
} from "../controllers/tasks.controller.js";

export const indexRouter = Router();

indexRouter.post("/tasks", createTask);

indexRouter.get("/tasks", getTasks);
indexRouter.get("/tasks/:taskId", getTaskById);
indexRouter.get("/tasks/type/:type", getTasksByType);
indexRouter.get("/tasks/sorted", getTasksSortedByDueDate);

indexRouter.put("/tasks/:taskId", updateTask);

indexRouter.delete("/tasks/:taskId", deleteTask);
