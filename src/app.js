const express = require("express");

const app = express();
app.use(express.json());

// Starter data is stored in memory. It resets whenever the app restarts.
let tasks = [];
let nextId = 1;

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Task Manager API",
    endpoints: {
      health: "GET /health",
      listTasks: "GET /api/tasks",
      createTask: "POST /api/tasks",
      getTask: "GET /api/tasks/:id",
      updateTask: "PUT /api/tasks/:id",
      deleteTask: "DELETE /api/tasks/:id"
    }
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const title = typeof req.body.title === "string" ? req.body.title.trim() : "";

  if (!title) {
    return res.status(400).json({ error: "A non-empty title is required." });
  }

  const task = {
    id: nextId++,
    title,
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(task);
  return res.status(201).json(task);
});

app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find((item) => item.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ error: "Task not found." });
  }

  return res.json(task);
});

app.put("/api/tasks/:id", (req, res) => {
  const task = tasks.find((item) => item.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ error: "Task not found." });
  }

  if (typeof req.body.title === "string") {
    const title = req.body.title.trim();
    if (!title) {
      return res.status(400).json({ error: "Title cannot be empty." });
    }
    task.title = title;
  }

  if (typeof req.body.completed === "boolean") {
    task.completed = req.body.completed;
  }

  return res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const index = tasks.findIndex((item) => item.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "Task not found." });
  }

  const [deletedTask] = tasks.splice(index, 1);
  return res.json({ message: "Task deleted successfully.", task: deletedTask });
});

// Used by tests so they can import the app without starting a network listener.
function resetTasks() {
  tasks = [];
  nextId = 1;
}

module.exports = { app, resetTasks };
