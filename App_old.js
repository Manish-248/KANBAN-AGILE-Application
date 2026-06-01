import React, { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input) return;
    setTasks([...tasks, { text: input, status: "todo" }]);
    setInput("");
  };

  const moveTask = (index, newStatus) => {
    const updated = [...tasks];
    updated[index].status = newStatus;
    setTasks(updated);
  };

  const Column = ({ title, status, color }) => (
    <div style={{
      width: "30%",
      background: "#f5f7fa",
      padding: "15px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ color }}>{title}</h2>

      {tasks.map((task, i) =>
        task.status === status ? (
          <div key={i} style={{
            background: "white",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}>
            <div>{task.text}</div>

            <div style={{ marginTop: "8px" }}>
              <button onClick={() => moveTask(i, "todo")}>←</button>
              <button onClick={() => moveTask(i, "inprogress")}>→</button>
              <button onClick={() => moveTask(i, "done")}>✔</button>
            </div>
          </div>
        ) : null
      )}
    </div>
  );

  return (
    <div style={{
      textAlign: "center",
      fontFamily: "Arial",
      padding: "20px"
    }}>
      <h1>🚀 Kanban Board</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task..."
          style={{ padding: "8px", width: "200px" }}
        />
        <button onClick={addTask} style={{ marginLeft: "10px" }}>
          Add
        </button>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "space-around",
        gap: "10px"
      }}>
        <Column title="To Do" status="todo" color="#ff6b6b" />
        <Column title="In Progress" status="inprogress" color="#f7b731" />
        <Column title="Done" status="done" color="#20bf6b" />
      </div>
    </div>
  );
}