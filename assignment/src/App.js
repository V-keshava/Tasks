import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filterCompleted, setFilterCompleted] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1/todos"
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        title: newTask,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setNewTask("");
    }
  };

  const deleteTask = (taskId) => {
    setTodos(todos.filter((todo) => todo.id !== taskId));
  };

  const isTaskCompleted = (taskId) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === taskId) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const editTask = (taskId, newTitle) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === taskId) {
          return { ...todo, title: newTitle };
        }
        return todo;
      })
    );
  };

  const filteredTodos = filterCompleted
    ? todos.filter((todo) => todo.completed)
    : todos;

  return (
    <div id="main">
      <div>
        <h1 id="heading">Todo App</h1>
        <div id="searchadd">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            id="search"
          />
          <button id="add" onClick={addTask}>
            Add Task
          </button>
        </div>
        <div id="status">
          <button id="all" onClick={() => setFilterCompleted(false)}>
            All
          </button>
          <button id="completed" onClick={() => setFilterCompleted(true)}>
            Completed
          </button>
        </div>
      </div>
      <div id="list">
        <ol id="list-items">
          {filteredTodos.map((todo) => (
            <li key={todo.id} style={{ display: "flex" }}>
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
                onClick={() => isTaskCompleted(todo.id)}
              >
                <p style={{ width: 200 }}>{todo.title}</p>
              </span>

              <button
                id="edit"
                onClick={() =>
                  editTask(todo.id, prompt("Enter new task:", todo.title))
                }
              >
                <FontAwesomeIcon icon={faEdit} size="lg" />
              </button>
              <button id="delete" onClick={() => deleteTask(todo.id)}>
                <FontAwesomeIcon icon={faTrash} size="lg" />
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
