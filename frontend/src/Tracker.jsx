import { useState, useEffect } from "react"
import KanbanBoard from "./components/KanbanBoard"
import TodoList from "./components/ToDolist"
import CalendarView from "./components/CalendarView"
import StatsDashboard from "./components/StatsDashboard"

export default function Tracker() {
  const [view, setView] = useState("Kanban")
  const [todos, setTodos] = useState([])
  const [cards, setCards] = useState([])
  useEffect(() => {
  fetch('http://localhost:8000/api/tracker')
    .then(res => res.json())
    .then(data => {
      if (data && data.applications) {
        setCards(data.applications);
      }
    })
    .catch(err => console.error('Failed to load tracker:', err));
}, []);

  const views = ["Kanban", "Todo", "Calendar"]

  return (
    <div>
      <StatsDashboard cards={cards} />

      <div style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
        {views.map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === v
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {view === "Kanban" && <KanbanBoard cards={cards} setCards={setCards} />}
      {view === "Todo" && <TodoList todos={todos} setTodos={setTodos} />}
      {view === "Calendar" && <CalendarView todos={todos} />}
    </div>
  )
}
