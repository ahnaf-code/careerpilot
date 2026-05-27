function StatsDashboard({ cards }) {

  const appliedCount =
    cards.filter(
      (card) => card.status === "Applied"
    ).length

  const interviewCount =
    cards.filter(
      (card) => card.status === "Interviewing"
    ).length

  const offerCount =
    cards.filter(
      (card) => card.status === "Offer"
    ).length

  const rejectedCount =
    cards.filter(
      (card) => card.status === "Rejected"
    ).length

  return (

    <div className="stats-dashboard">

      <div className="stat-card applied-stat">
        <h3>{appliedCount}</h3>
        <p>Applied</p>
      </div>

      <div className="stat-card interview-stat">
        <h3>{interviewCount}</h3>
        <p>Interviewing</p>
      </div>

      <div className="stat-card offer-stat">
        <h3>{offerCount}</h3>
        <p>Offers</p>
      </div>

      <div className="stat-card rejected-stat">
        <h3>{rejectedCount}</h3>
        <p>Rejected</p>
      </div>

    </div>

  )
}

export default StatsDashboard