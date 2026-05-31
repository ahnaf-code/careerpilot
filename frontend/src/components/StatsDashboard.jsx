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
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-blue-600 rounded-xl p-6 text-center">
        <h3 className="text-4xl font-bold text-white">{appliedCount}</h3>
        <p className="text-white font-medium mt-2">Applied</p>
      </div>
      <div className="bg-yellow-500 rounded-xl p-6 text-center">
        <h3 className="text-4xl font-bold text-white">{interviewCount}</h3>
        <p className="text-white font-medium mt-2">Interviewing</p>
      </div>
      <div className="bg-green-600 rounded-xl p-6 text-center">
        <h3 className="text-4xl font-bold text-white">{offerCount}</h3>
        <p className="text-white font-medium mt-2">Offers</p>
      </div>
      <div className="bg-red-600 rounded-xl p-6 text-center">
        <h3 className="text-4xl font-bold text-white">{rejectedCount}</h3>
        <p className="text-white font-medium mt-2">Rejected</p>
      </div>
    </div>
  )
}

export default StatsDashboard