import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

function App() {
const [todos, setTodos] = useState(() => {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : [];
}); 
 const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(true);

  // Load todos from localStorage on first render
  useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
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
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  const quotes = [
  "Consistency beats motivation.",
  "Small progress is still progress.",
  "Discipline creates freedom.",
  "You don’t need to be extreme, just consistent.",
  "Every expert was once a beginner."
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  return (
<div className={`app-container ${darkMode ? "dark" : "light"}`}>
      <h1>Advanced Todo App</h1>
    <p className="quote">{randomQuote}</p>
    <button 
  className="theme-toggle"
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
</button>

    <div className="input-section">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={addTodo}>Add</button>
    </div>

    <div className="filter-buttons">
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
      <button onClick={() => setFilter("pending")}>Pending</button>
    </div>
<p className="task-count">
  {todos.filter(todo => !todo.completed).length} tasks remaining
</p>
    <ul style={{ listStyle: "none", padding: 0 }}>
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
</button>        </li>
      ))}
    </ul>
  </div>
);
  
}

export default App;