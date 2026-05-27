import { useState } from "react"

function TodoList({
  todos,
  setTodos
}) {

  const [task, setTask] = useState("")
  const [deadline, setDeadline] = useState("")

  function addTodo() {

    if (task.trim() === "") {
      return
    }

    const newTodo = {
      id: Date.now(),
      task: task,
      deadline: deadline,
      completed: false
    }

    setTodos([...todos, newTodo])

    setTask("")
    setDeadline("")
  }

  function toggleComplete(id) {

    setTodos(

      todos.map((todo) => {

        if (todo.id === id) {

          return {
            ...todo,
            completed: !todo.completed
          }

        }

        return todo
      })

    )
  }

  function deleteTodo(id) {

  setTodos(

    todos.filter(
      (todo) => todo.id !== id
    )

  )
}

  return (

    <div className="todo-container">

      <h2>Todo List</h2>

      <div className="todo-inputs">

        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) =>
            setTask(e.target.value)
          }
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) =>
            setDeadline(e.target.value)
          }
        />

        <button onClick={addTodo}>
          Add Task
        </button>

      </div>

      <div className="todo-list">

        {todos.length === 0 ? (

          <p>No tasks added</p>

        ) : (

          todos.map((todo) => (

            <div
              key={todo.id}
              className="todo-item"
            >

              <div>

                <h3
                  className={
                    todo.completed
                      ? "completed"
                      : ""
                  }
                >
                  {todo.task}
                </h3>

                <p>
                  Deadline:
                  {" "}
                  {todo.deadline || "No date"}
                </p>

              </div>

              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  toggleComplete(todo.id)
                }
              />
              <button
  className="delete-btn"
  onClick={() =>
    deleteTodo(todo.id)
  }
>
  Delete
</button>

            </div>

          ))

        )}

      </div>

    </div>

  )
}

export default TodoList