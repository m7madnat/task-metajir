import React, { useState } from "react";
import { Api } from "../api/Api";
import "../components/AddTaskWindow.css";

function AddTaskWindow(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("personal");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("1");
  const [status, setStatus] = useState("new");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { title, description, type, dueDate, priority, status };
    const result = await Api.post("/tasks", data);
    props.onAddTask(result.data);
  };

  const handleToggleForm = () => {
    props.handleToggleForm();
  };

  return (
    <div className="modal">
      <div className="add-task-window">
        <h2>Add Task</h2>
        <form>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="type">Type:</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="hobby">Hobby</option>
            </select>
          </div>
          <div>
            <label htmlFor="due-date">Due Date:</label>
            <input
              type="date"
              id="due-date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="priority">Priority:</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div>
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="new">New</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="buttons">
            <button type="submit" onClick={handleSubmit}>
              Add Task
            </button>
            <button type="submit" onClick={handleToggleForm}>
              Close Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskWindow;
