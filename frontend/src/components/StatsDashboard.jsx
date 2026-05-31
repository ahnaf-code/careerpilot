import { useState } from "react"

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
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
      <div style={{ backgroundColor: "#2563eb", borderRadius: "12px", padding: "24px", textAlign: "center" }}>
        <h3 style={{ fontSize: "36px", fontWeight: "bold", color: "white", margin: 0 }}>{appliedCount}</h3>
        <p style={{ color: "white", fontWeight: "500", marginTop: "8px" }}>Applied</p>
      </div>
      <div style={{ backgroundColor: "#eab308", borderRadius: "12px", padding: "24px", textAlign: "center" }}>
        <h3 style={{ fontSize: "36px", fontWeight: "bold", color: "white", margin: 0 }}>{interviewCount}</h3>
        <p style={{ color: "white", fontWeight: "500", marginTop: "8px" }}>Interviewing</p>
      </div>
      <div style={{ backgroundColor: "#16a34a", borderRadius: "12px", padding: "24px", textAlign: "center" }}>
        <h3 style={{ fontSize: "36px", fontWeight: "bold", color: "white", margin: 0 }}>{offerCount}</h3>
        <p style={{ color: "white", fontWeight: "500", marginTop: "8px" }}>Offers</p>
      </div>
      <div style={{ backgroundColor: "#dc2626", borderRadius: "12px", padding: "24px", textAlign: "center" }}>
        <h3 style={{ fontSize: "36px", fontWeight: "bold", color: "white", margin: 0 }}>{rejectedCount}</h3>
        <p style={{ color: "white", fontWeight: "500", marginTop: "8px" }}>Rejected</p>
      </div>
    </div>
  )
}

export default StatsDashboard