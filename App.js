import React, { useEffect, useState } from "react";

const initialTasks = [
  {
    id: 1,
    title: "Create project setup",
    status: "done",
    priority: "High",
    assignee: "Sandeep",
    dueDate: "2026-06-01",
    category: "Development"
  },
  {
    id: 2,
    title: "Design Kanban workflow",
    status: "inprogress",
    priority: "High",
    assignee: "Manish",
    dueDate: "2026-06-03",
    category: "Agile"
  },
  {
    id: 3,
    title: "Implement task filters",
    status: "todo",
    priority: "Medium",
    assignee: "Shukur",
    dueDate: "2026-06-06",
    category: "Frontend"
  }
];

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("kanbanTasks");
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignee, setAssignee] = useState("Manish");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("Development");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!title) return;

    const newTask = {
      id: Date.now(),
      title,
      status: "backlog",
      priority,
      assignee,
      dueDate,
      category
    };

    setTasks([...tasks, newTask]);

    setTitle("");
    setPriority("Medium");
    setAssignee("Manish");
    setDueDate("");
    setCategory("Development");
  };

  const moveTask = (id, status) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, status } : task
    );

    setTasks(updated);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const columns = [
    { title: "Backlog", status: "backlog", color: "#8e44ad" },
    { title: "To Do", status: "todo", color: "#e74c3c" },
    { title: "In Progress", status: "inprogress", color: "#f39c12" },
    { title: "Testing", status: "testing", color: "#3498db" },
    { title: "Done", status: "done", color: "#27ae60" }
  ];

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        backgroundColor: "#f5f6fa",
        minHeight: "100vh"
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Agile Team Productivity Board
      </h1>

      {/* Add Task Section */}
      <div
        style={{
          background: "white",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
        }}
      >
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: "8px",
            marginRight: "10px",
            width: "200px"
          }}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        >
          <option>Manish</option>
          <option>Sandeep</option>
          <option>Ismail</option>
          <option>Shukur</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        >
          <option>Development</option>
          <option>Testing</option>
          <option>Research</option>
          <option>Documentation</option>
        </select>

        <button
          onClick={addTask}
          style={{
            padding: "8px 15px",
            background: "#2ecc71",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Add Task
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />
      </div>

      {/* Statistics */}
      <div
        style={{
          marginBottom: "20px",
          background: "white",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
        }}
      >
        <strong>Total Tasks:</strong> {tasks.length} |{" "}
        <strong>Done:</strong>{" "}
        {tasks.filter((t) => t.status === "done").length} |{" "}
        <strong>In Progress:</strong>{" "}
        {tasks.filter((t) => t.status === "inprogress").length}
      </div>

      {/* Kanban Board */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          overflowX: "auto"
        }}
      >
        {columns.map((col) => (
          <div
            key={col.status}
            style={{
              minWidth: "260px",
              background: "#ecf0f1",
              borderRadius: "10px",
              padding: "10px"
            }}
          >
            <h2 style={{ color: col.color, textAlign: "center" }}>
              {col.title}
            </h2>

            {filteredTasks
              .filter((task) => task.status === col.status)
              .map((task) => (
                <div
                  key={task.id}
                  style={{
                    background: "white",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                  }}
                >
                  <h4>{task.title}</h4>

                  <p>
                    <strong>Priority:</strong> {task.priority}
                  </p>

                  <p>
                    <strong>Assignee:</strong> {task.assignee}
                  </p>

                  <p>
                    <strong>Due:</strong> {task.dueDate}
                  </p>

                  <p>
                    <strong>Category:</strong> {task.category}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "5px",
                      marginTop: "10px"
                    }}
                  >
                    <button onClick={() => moveTask(task.id, "backlog")}>
                      Backlog
                    </button>

                    <button onClick={() => moveTask(task.id, "todo")}>
                      To Do
                    </button>

                    <button onClick={() => moveTask(task.id, "inprogress")}>
                      Progress
                    </button>

                    <button onClick={() => moveTask(task.id, "testing")}>
                      Testing
                    </button>

                    <button onClick={() => moveTask(task.id, "done")}>
                      Done
                    </button>

                    <button onClick={() => deleteTask(task.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}