import React, { useState } from 'react';

const Form = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(null); // task id that is being edited
const [editedTaskText, setEditedTaskText] = useState(""); // text of task being edited


  function handleClick(e) {
    e.preventDefault();
    if (task) {
      const newTask = { id: Date.now(), task, completed:false };
      setTasks([...tasks, newTask]);
      setTask("");
    } else {
      console.log("Add a task to do");
    }
  }

  function handleDelete(id){
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks)
  }

  function toggleComplete(id){
    const updatedTasks = tasks.map((task) => 
    task.id === id ? {...task, completed: !task.completed} : task
  );
  setTasks(updatedTasks)
  }

  function handleEdit(id, currentText) {
  setIsEditing(id);
  setEditedTaskText(currentText);
}

function handleSaveEdit(id) {
  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, task: editedTaskText } : task
  );
  setTasks(updatedTasks);
  setIsEditing(null);
  setEditedTaskText("");
}


  
  return (
    <> 
    <div className="container" >
    <div className='form-container'>
      {/*<img src='notepad-cute-removebg-preview.png' alt='notepad' className='notepad-image' />
      */}
     
      <h1 className='form-heading'>Add your tasks here!</h1>
      <form onSubmit={handleClick}>
        <label htmlFor=""></label>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <br />
        <button>Write on notepad</button>
      </form>
      <div className='form-image'><img className='form-image' src='purplelady2.jpg' alt='to do'/>
      </div>
      </div>
      
      <div className='notepad-container'>
       <img src='notebook-flat-style.png' alt='notebook' className='notepad-image' />
      <div className='notepad-textarea'>
     <h1 className='notepad-heading'>To Do List:</h1>
      <ul>
        {tasks.map((task) => (
          <div key={task.id} className='task-item'>
            <div className='task-item-text'>
      {isEditing === task.id ? (
        <input
          value={editedTaskText}
          onChange={(e) => setEditedTaskText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSaveEdit(task.id);
          }}
        />
      ) : (
        <h3 className={task.completed ? 'completed' : ''}>
          {task.task}
        </h3>
      )}
    </div>
            <div className='task-item-buttons'>
      {isEditing === task.id ? (
        <button className="save-btn" onClick={() => handleSaveEdit(task.id)}>Save</button>
      ) : (
        <img src='eraser.png' className="edit-btn" onClick={() => handleEdit(task.id, task.task)} />
      )}
            <img src='cross.png' alt='delete'  className='delete-btn' onClick={() => handleDelete(task.id)}  />
            <img src='check-mark.png' alt='complete'  className='complete-btn' onClick={() => toggleComplete(task.id)}  />
            
            </div>
          </div>
          ))}
      </ul>
      </div>
      </div>
      </div>
    </>
  );
};

export default Form;