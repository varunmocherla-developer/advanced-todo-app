import React, { useState, useEffect, useMemo } from "react";
import { FaTrash, FaSun, FaMoon } from "react-icons/fa";
import "./App.css";
import "./index.css";

function App() {
  // Initialize todos from localStorage
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(true);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // useMemo keeps the quote the same unless the page is refreshed
  const randomQuote = useMemo(() => {
    const quotes = [
      "Consistency beats motivation.",
      "Small progress is still progress.",
      "Discipline creates freedom.",
      "You don’t need to be extreme, just consistent.",
      "Every expert was once a beginner."
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, []);

  const addTodo = (e) => {
    if (e) e.preventDefault(); // Prevents page reload on 'Enter'
    if (input.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      <h1>Advanced Todo App</h1>
      <p className="quote">"{randomQuote}"</p>

      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? " Light Mode" : " Dark Mode"}
      </button>

      <form className="input-section" onSubmit={addTodo}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task..."
        />
        <button type="submit">Add</button>
      </form>

      <div className="filter-buttons">
        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All</button>
        <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>Completed</button>
        <button className={filter === "pending" ? "active" : ""} onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <p className="task-count">
        {todos.filter((todo) => !todo.completed).length} tasks remaining
      </p>

      <ul style={{ listStyle: "none", padding: 0, width: "100%" }}>
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span
              onClick={() => toggleComplete(todo.id)}
              className={`todo-text ${todo.completed ? "completed" : ""}`}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;