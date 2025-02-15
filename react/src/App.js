import { useState, useEffect } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "./TaskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    getTasks().then((response) => setTasks(response.data));
  };

  const handleAddTask = () => {
    if (!newTask) return;
    addTask({ title: newTask, completed: false }).then(() => {
      setNewTask("");
      loadTasks();
    });
  };

  const handleToggleTask = (task) => {
    updateTask(task.id, { ...task, completed: !task.completed }).then(() => {
      loadTasks();
    });
  };

  const handleDeleteTask = (id) => {
    deleteTask(id).then(() => loadTasks());
  };

  return (
    <div className="container">
      <h1>TO-DO LIST</h1>
      <div>
        <input
          type="text"
          placeholder="input task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>NEW</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <span onClick={() => handleToggleTask(task)}>
              {task.completed ? "✔️" : "❌"} {task.title}
            </span>
            <button onClick={() => handleDeleteTask(task.id)}>DELETE</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
