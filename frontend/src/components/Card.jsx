function Card({
  card,
  moveCard,
  deleteCard
}) {

  return (

    <div
      className={`card ${card.status.toLowerCase()}`}
    >

      <h3>{card.title}</h3>

      <p className="company-name">
        {card.company}
      </p>

      <p
        className={`status-tag ${card.status.toLowerCase()}`}
      >
        {card.status}
      </p>

      <div className="button-group">

        {card.status !== "Applied" && (

          <button
            onClick={() =>
              moveCard(card.id, -1)
            }
          >
            ←
          </button>

        )}

        <button
          onClick={() =>
            deleteCard(card.id)
          }
        >
          X
        </button>

        {card.status !== "Rejected" && (

          <button
            onClick={() =>
              moveCard(card.id, 1)
            }
          >
            →
          </button>

        )}

      </div>

    </div>

  )
}

export default Card 