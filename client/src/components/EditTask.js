import { useState } from "react";
import { Api } from "../api/Api";

function EditTask({ task, onDelete, onUpdate, handleDueDateSort }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSave = async () => {
    try {
      await Api.put(`/tasks/${task._id}`, editedTask);
      setIsEditing(false);
      onUpdate(editedTask);
    } catch (error) {
      console.log(error);
    }

    window.location.reload();
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTask(task);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async (e) => {
    try {
      e.preventDefault();
      await Api.delete(`/tasks/${task._id}`);
      onDelete(task._id);
    } catch (error) {
      console.log(error);
    }

    window.location.reload();
  };
  
  return (
    <table
      style={{
        color: editedTask.status === "completed" ? "red" : "black",
      }}
    >
      {isEditing ? (
        <>
          <td>
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <input
              name="description"
              value={editedTask.description}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <select
              name="type"
              value={editedTask.type}
              onChange={handleInputChange}
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="hobby">Hobby</option>
            </select>
          </td>
          <td>
            <input
              type="date"
              name="dueDate"
              value={editedTask.dueDate}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <select
              name="priority"
              value={editedTask.priority}
              onChange={handleInputChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </td>
          <td>
            <select
              name="status"
              value={editedTask.status}
              onChange={handleInputChange}
            >
              <option value="new">New</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </td>
          <td>
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </td>
        </>
      ) : (
        <>
          <td>{task.title}</td>
          <td>{task.description}</td>
          <td>{task.type}</td>
          <td>{task.dueDate}</td>
          <td>{task.priority}</td>
          <td>{task.status}</td>
          <td>
            <button type="button" onClick={handleEdit}>
              editedTask
            </button>
            <button type="button" onClick={handleDelete}>
              delete
            </button>
          </td>
        </>
      )}
    </table>
  );
}

export default EditTask;
