import Card from "./Card"

function Column({
  title,
  cards,
  moveCard,
  deleteCard
}) {

  return (
    <div className="column">

      <h2>{title}</h2>

      {cards.length === 0 ? (

        <div className="card-placeholder">
          No cards yet
        </div>

      ) : (

        cards.map((card) => (

          <Card
            key={card.id}
            card={card}
            moveCard={moveCard}
            deleteCard={deleteCard}
          />

        ))

      )}

    </div>
  )
}

export default Column