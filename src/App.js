import { useState } from 'react';
import './App.css';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [editTaskValue, setEditTaskValue] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);

 
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      setTasks([task,...tasks]);
      setCompletedTasks([false,...completedTasks]); 
      setTask('');
    }
  };

  // Handle deleting a task
  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);

    const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index);
    setCompletedTasks(updatedCompletedTasks);
  };

 
  const handleEditTask = (index) => {
    setEditingTaskIndex(index);
    setEditTaskValue(tasks[index]); 
  };


  const handleSaveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editTaskValue; 
    setTasks(updatedTasks);
    setEditingTaskIndex(null); 
  };

 
  const handleEditChange = (e) => {
    setEditTaskValue(e.target.value);
  };

  const handleCheckboxChange = (index) => {
    const updatedCompletedTasks = [...completedTasks];
    updatedCompletedTasks[index] = !updatedCompletedTasks[index]; 
    setCompletedTasks(updatedCompletedTasks);
  };

  return (
    <div className="mainapp">
      <h2 className="todo">TO DO LIST</h2>

      <form onSubmit={handleSubmit}>
        <label style={{ fontWeight: 'bold' }}>Add your task here</label><br /><br />
        <input
          type="text"
          autoComplete="off"
          value={task}
          onChange={handleInputChange}
        /><br /><br />
        <button type="submit">ADD</button>
      </form>

      <h3>Tasks</h3>

      {tasks.length === 0 ? (
        <p>Sorry , No tasks yet!!</p>
      ) : (
        tasks.map((taskItem, index) => (
          <div className="task-item" key={index}>
            <input
              type="checkbox"
              checked={completedTasks[index]}
              onChange={() => handleCheckboxChange(index)}
            />
            
            {editingTaskIndex === index ? (
              <input
                type="text"
                value={editTaskValue}
                onChange={handleEditChange}
                className="edit-input"
              />
            ) : (
              <label className={`label ${completedTasks[index] ? 'completed' : ''}`}>
                {taskItem}
              </label>
            )}
            <br /><br />
            <div className="task-buttons">
              {editingTaskIndex === index ? (
                <button className="button" onClick={() => handleSaveTask(index)}>
                  Save
                </button>
              ) : (
                <>
                  <button className="button" onClick={() => handleEditTask(index)}>
                    Edit
                  </button>
                  <button
                    className="button"
                    style={{ marginLeft: '5px' }}
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </>
              )}
              <br /><br />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
