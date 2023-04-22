import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["personal", "work", "hobby"],
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["new", "in progress", "completed"],
    required: true,
  },
});

const Task = model("tasks", taskSchema);
export { Task };
