import { useState } from "react"
import KanbanBoard from "./components/KanbanBoard"
import TodoList from "./components/ToDolist"
import CalendarView from "./components/CalendarView"

export default function Tracker() {
  const [view, setView] = useState("Kanban")
  const [todos, setTodos] = useState([])

  const views = ["Kanban", "Todo", "Calendar"]

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
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

      {view === "Kanban" && <KanbanBoard />}
      {view === "Todo" && <TodoList todos={todos} setTodos={setTodos} />}
      {view === "Calendar" && <CalendarView todos={todos} />}
    </div>
  )
}
