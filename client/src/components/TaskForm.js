import React, { useState, useEffect } from "react";
import { Api } from "../api/Api";
import "../components/TaskForm.css";
import AddTaskWindow from "./AddTaskWindow.js";
import EditTask from "./EditTask.js";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 2rem;
  font-family: Arial, sans-serif;

  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    cursor: pointer;

    &:hover {
      background-color: #0069d9;
    }
  }

  h1 {
    font-size: 2rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  label {
    margin-right: 1rem;
  }

  select {
    padding: 0.25rem 1rem;
    border-radius: 4px;
    border: 1px solid #ced4da;
    margin-right: 1rem;
  }
  table {
    width: 1200px;
    height: 80px;
  }
  th,
  td {
    padding: 0.1rem;
    text-align: center;
    border: 1px solid #ced4da;
    width: 250px;
  }

  th {
    background-color: #f2f2f2;
    cursor: pointer;
    white-space: nowrap;
    width: 250px;
  }
  th:last-of-type,
  td:last-of-type {
    text-align: center;
  }
`;

function TaskForm() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchTasks = async () => {
      const result = await Api.get("/tasks");
      setTasks(result.data);
      setFilteredTasks(result.data);
    };
    fetchTasks();
  }, []);
  const handleTypeFilter = (type) => {
    if (type === "All") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) => task.type === type);
      setFilteredTasks(filtered);
    }
    setSortBy("");
  };

  const handleDueDateSort = () => {
    let sortedTasks = [...filteredTasks];
    sortedTasks.sort((a, b) => {
      let comparison = new Date(a.dueDate) - new Date(b.dueDate);
      return sortOrder === "asc" ? comparison : -comparison;
    });
    setFilteredTasks(sortedTasks);
    setSortBy("dueDate");
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleToggleForm = () => {
    setIsVisible(!isVisible);
  };

  const handleAddTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
    window.location.reload();
  };

  return (
    <Wrapper>
      <button onClick={handleToggleForm}>
        {isVisible ? "Hide a new Task" : "Create a new Task"}
      </button>
      {isVisible && (
        <>
          <AddTaskWindow onAddTask={handleAddTask} />
        </>
      )}
      <h1>Task List</h1>
      <div>
        <label>Filter by Type:</label>
        <select onChange={(e) => handleTypeFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="hobby">Hobby</option>
        </select>
      </div>
      <table>
        <th>
          <td>
            <tr>Title</tr>
          </td>
          <td>
            <tr>Description</tr>
          </td>
          <th>Type</th>
          <th onClick={handleDueDateSort}>Due Date ▲▼</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Action</th>
        </th>
        {filteredTasks.map((task) => (
          <tr key={task._id}>
            <EditTask task={task} handleDueDateSort={handleDueDateSort} />
          </tr>
        ))}
      </table>
    </Wrapper>
  );
}

export default TaskForm;
