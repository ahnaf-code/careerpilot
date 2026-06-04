import Calendar from "react-calendar"

function CalendarView({ todos }) {
  function tileContent({ date, view }) {
    if (view !== "month") return null
    const formatted = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`
    const matches = todos.filter((t) => t.deadline === formatted)
    if (matches.length === 0) return null
    const done = matches.filter((t) => t.completed).length
    const pending = matches.length - done
    return (
      <div className="flex justify-center gap-0.5 mt-0.5">
        {pending > 0 && <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block" />}
        {done > 0 && <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />}
      </div>
    )
  }

  return (
    <div className="p-4">
      <style>{`
        .react-calendar {
          width: 100%;
          max-width: 600px;
          background: #1e2433;
          border: 1px solid #2e3650;
          border-radius: 12px;
          padding: 16px;
          font-family: inherit;
          color: #e2e8f0;
        }
        .react-calendar__navigation button {
          color: #e2e8f0;
          background: none;
          font-size: 14px;
          font-weight: 500;
          padding: 8px;
          border-radius: 8px;
        }
        .react-calendar__navigation button:hover {
          background: #2e3650;
        }
        .react-calendar__month-view__weekdays {
          color: #6b7280;
          font-size: 11px;
          text-transform: uppercase;
          font-weight: 500;
        }
        .react-calendar__month-view__weekdays abbr {
          text-decoration: none;
        }
        .react-calendar__tile {
          color: #e2e8f0;
          background: none;
          border-radius: 8px;
          padding: 10px 4px;
          font-size: 13px;
        }
        .react-calendar__tile:hover {
          background: #2e3650;
        }
        .react-calendar__tile--now {
          background: #2563eb22 !important;
          color: #60a5fa !important;
          font-weight: 600;
        }
        .react-calendar__tile--active {
          background: #2563eb !important;
          color: white !important;
        }
        .react-calendar__month-view__days__day--neighboringMonth {
          color: #4b5563;
        }
      `}</style>
      <Calendar tileContent={tileContent} />
      <div className="flex gap-4 mt-4 text-xs text-gray-400">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" /> Pending task</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400 inline-block" /> Completed</span>
      </div>
    </div>
  )
}

export default CalendarView
