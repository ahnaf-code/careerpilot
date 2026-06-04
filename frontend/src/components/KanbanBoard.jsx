import { useState } from "react"
import { saveApplication } from "../api"

const STATUS_COLORS = {
  Applied: "border-blue-500/50 bg-blue-950/20",
  Interviewing: "border-yellow-500/50 bg-yellow-950/20",
  Offer: "border-green-500/50 bg-green-950/20",
  Rejected: "border-red-500/50 bg-red-950/20",
}

const STATUS_BADGES = {
  Applied: "bg-blue-900/50 text-blue-300 border border-blue-700",
  Interviewing: "bg-yellow-900/50 text-yellow-300 border border-yellow-700",
  Offer: "bg-green-900/50 text-green-300 border border-green-700",
  Rejected: "bg-red-900/50 text-red-300 border border-red-700",
}

function KanbanBoard({ cards = [], setCards = () => {} }) {
  const [jobTitle, setJobTitle] = useState("")
  const [company, setCompany] = useState("")
  const [status, setStatus] = useState("Applied")
  const [adding, setAdding] = useState(false)

  const columns = ["Applied", "Interviewing", "Offer", "Rejected"]

  async function addCard() {
    if (company.trim() === "" || jobTitle.trim() === "") return
    setAdding(true)
    const newCard = {
      id: Date.now(),
      title: jobTitle,
      company: company,
      status: status
    }
    try {
      await saveApplication({ title: jobTitle, company: company })
    } catch (error) {
      console.error("Backend save failed:", error)
    }
    setCards([...cards, newCard])
    setJobTitle("")
    setCompany("")
    setStatus("Applied")
    setAdding(false)
  }

  function moveCard(id, direction) {
    const statusOrder = ["Applied", "Interviewing", "Offer", "Rejected"]
    setCards(cards.map((card) => {
      if (card.id === id) {
        const currentIndex = statusOrder.indexOf(card.status)
        const newIndex = currentIndex + direction
        if (newIndex >= 0 && newIndex < statusOrder.length) {
          return { ...card, status: statusOrder[newIndex] }
        }
      }
      return card
    }))
  }

  function deleteCard(id) {
    setCards(cards.filter((card) => card.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Add Card Form */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">➕ Add New Application</h3>
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Job title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="flex-1 min-w-[150px] bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="flex-1 min-w-[150px] bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
          >
            {columns.map((column) => (
              <option key={column} value={column}>{column}</option>
            ))}
          </select>
          <button
            onClick={addCard}
            disabled={adding}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 text-white text-sm font-medium px-6 py-2 rounded-lg transition-all"
          >
            {adding ? "Adding..." : "Add Card"}
          </button>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map((column) => {
          const columnCards = cards.filter((card) => card.status === column)
          return (
            <div key={column} className={`rounded-xl border p-4 space-y-3 ${STATUS_COLORS[column]}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-200">{column}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_BADGES[column]}`}>
                  {columnCards.length}
                </span>
              </div>
              {columnCards.length === 0 ? (
                <p className="text-xs text-gray-600 text-center py-4">No applications</p>
              ) : (
                columnCards.map((card) => (
                  <div key={card.id} className="bg-gray-900 border border-gray-700 rounded-lg p-3 space-y-2">
                    <p className="text-sm font-semibold text-gray-100">{card.title}</p>
                    <p className="text-xs text-blue-400">{card.company}</p>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => moveCard(card.id, -1)}
                        className="flex-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 py-1 rounded transition-all"
                      >
                        ← Back
                      </button>
                      <button
                        onClick={() => moveCard(card.id, 1)}
                        className="flex-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 py-1 rounded transition-all"
                      >
                        Next →
                      </button>
                      <button
                        onClick={() => deleteCard(card.id)}
                        className="text-xs bg-red-900/40 hover:bg-red-900/70 text-red-400 px-2 py-1 rounded transition-all"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default KanbanBoard
