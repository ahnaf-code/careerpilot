import { useState } from "react"
import { saveApplication } from "../api"
import Column from "./Column"

function KanbanBoard({
  cards = [],
  setCards = () => {}
}) {

  const [jobTitle, setJobTitle] =
    useState("")

  const [company, setCompany] =
    useState("")

  const [status, setStatus] =
    useState("Applied")

  const columns = [
    "Applied",
    "Interviewing",
    "Offer",
    "Rejected"
  ]

  async function addCard() {

    if (
      company.trim() === "" ||
      jobTitle.trim() === ""
    ) {
      return
    }

    const newCard = {
      id: Date.now(),
      title: jobTitle,
      company: company,
      status: status
    }

    try {

      await saveApplication({
        title: jobTitle,
        company: company
      })

      console.log("Saved to backend")

    } catch (error) {

      console.error(
        "Backend save failed:",
        error
      )

    }

    setCards([...cards, newCard])

    setJobTitle("")
    setCompany("")
    setStatus("Applied")
  }

  function moveCard(id, direction) {

    const statusOrder = [
      "Applied",
      "Interviewing",
      "Offer",
      "Rejected"
    ]

    setCards(

      cards.map((card) => {

        if (card.id === id) {

          const currentIndex =
            statusOrder.indexOf(card.status)

          const newIndex =
            currentIndex + direction

          if (
            newIndex >= 0 &&
            newIndex < statusOrder.length
          ) {

            return {
              ...card,
              status:
                statusOrder[newIndex]
            }

          }

        }

        return card

      })

    )
  }

  function deleteCard(id) {

    setCards(

      cards.filter(
        (card) => card.id !== id
      )

    )
  }

  return (

    <div>

      <div className="add-card-form">

        <input
          type="text"
          placeholder="Job title"
          value={jobTitle}
          onChange={(e) =>
            setJobTitle(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Company name"
          value={company}
          onChange={(e) =>
            setCompany(e.target.value)
          }
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >

          {columns.map((column) => (

            <option
              key={column}
              value={column}
            >
              {column}
            </option>

          ))}

        </select>

        <button onClick={addCard}>
          Add Card
        </button>

      </div>

      <div className="board">

        {columns.map((column) => (

          <Column
            key={column}
            title={column}
            cards={
              cards.filter(
                (card) =>
                  card.status === column
              )
            }
            moveCard={moveCard}
            deleteCard={deleteCard}
          />

        ))}

      </div>

    </div>

  )
}

export default KanbanBoard