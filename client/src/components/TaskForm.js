import React, { useState, useEffect } from "react";
import { Api } from "../api/Api";
import AddTaskWindow from "./AddTaskWindow.js";
import EditTask from "./EditTask.js";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f4f4f4;
  font-family: Arial, sans-serif;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  select {
    padding: 0.5rem;
    margin-left: 1rem;
    border-radius: 0.5rem;
    border: none;
    font-size: 1rem;
    color: #555;
  }
  button {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 10px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 5px;

    &:hover {
      background-color: #3e8e41;
    }
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
    max-width: 200px;
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
  // eslint-disable-next-line no-unused-vars
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
            <div className="table-header">Title</div>
          </td>
          <td>
            <div className="table-header">Description</div>
          </td>
          <th className="table-header">Type</th>
          <th className="table-header" onClick={handleDueDateSort}>
            <div className="table-header">
              Due Date
              <span className="sort-icon">▲▼</span>
            </div>
          </th>
          <th className="table-header">Priority</th>
          <th className="table-header">Status</th>
          <th className="table-header">Action</th>
        </th>
        {filteredTasks.map((task) => (
          <tr key={task._id}>
            <EditTask task={task} handleDueDateSort={handleDueDateSort} />
          </tr>
        ))}
      </table>
      <button onClick={handleToggleForm}>
        {isVisible ? "Hide a new Task" : "Create a new Task"}
      </button>
      {isVisible && (
        <>
          <AddTaskWindow
            onAddTask={handleAddTask}
            handleToggleForm={handleToggleForm}
          />
        </>
      )}
    </Wrapper>
  );
}

export default TaskForm;
