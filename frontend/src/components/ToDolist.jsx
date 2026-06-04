import { useState } from "react"

function TodoList({ todos, setTodos }) {
  const [task, setTask] = useState("")
  const [deadline, setDeadline] = useState("")

  function addTodo() {
    if (task.trim() === "") return
    setTodos([...todos, { id: Date.now(), task, deadline, completed: false }])
    setTask("")
    setDeadline("")
  }

  function toggleComplete(id) {
    setTodos(todos.map((t) => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id))
  }

  return (
    <div className="p-4">
      {/* Input row */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          className="flex-1 bg-[#1e2433] border border-[#2e3650] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="bg-[#1e2433] border border-[#2e3650] rounded-lg px-4 py-2.5 text-gray-300 text-sm focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          + Add Task
        </button>
      </div>

      {/* List */}
      {todos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <div className="text-4xl mb-3">✓</div>
          <p className="text-sm">No tasks yet. Add one above.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-4 bg-[#1e2433] border border-[#2e3650] rounded-lg px-4 py-3"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="w-4 h-4 accent-blue-500 cursor-pointer flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${todo.completed ? "line-through text-gray-500" : "text-white"}`}>
                  {todo.task}
                </p>
                {todo.deadline && (
                  <p className="text-xs text-gray-500 mt-0.5">Due: {todo.deadline}</p>
                )}
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-gray-500 hover:text-red-400 text-xs px-2 py-1 rounded transition-colors flex-shrink-0"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TodoList
