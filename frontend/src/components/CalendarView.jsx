import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

function CalendarView({ todos }) {

  function tileContent({ date, view }) {

    if (view === "month") {

      const formattedDate =
        date.toISOString().split("T")[0]

      const matchingTodos =
        todos.filter(
          (todo) =>
            todo.deadline === formattedDate
        )

      if (matchingTodos.length > 0) {


  const completedCount =
    matchingTodos.filter(
      (todo) => todo.completed
    ).length

  const pendingCount =
    matchingTodos.length -
    completedCount

  return (

    <div className="calendar-indicators">

      {pendingCount > 0 && (

        <div className="pending-dot">
          {pendingCount}
        </div>

      )}

      {completedCount > 0 && (

        <div className="completed-dot">
          {completedCount}
        </div>

      )}

    </div>

  )
}
    }
  }

  return (

    <div className="calendar-container">

      <h2>Task Calendar</h2>

      <Calendar
        tileContent={tileContent}
      />

    </div>

  )
}


export default CalendarView