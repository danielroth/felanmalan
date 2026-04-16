'use client'

import { useState } from 'react'
import TicketRow from './TicketRow'

export default function TicketList({
  newTickets,
  highPriority,
  normalPriority,
  lowPriority,
  doneTickets,
}: any) {
  const [showDone, setShowDone] = useState(false)

  return (
    <div className="space-y-8">
      <Section title="Nya ärenden" tickets={newTickets} />
      <Section title="Hög prioritet" tickets={highPriority} />
      <Section title="Normal prioritet" tickets={normalPriority} />
      <Section title="Låg prioritet" tickets={lowPriority} />

      <button
        onClick={() => setShowDone(v => !v)}
        className="underline text-sm"
      >
        {showDone
          ? 'Dölj avslutade ärenden'
          : 'Visa avslutade ärenden'}
      </button>

      {showDone && (
        <Section
          title="Avslutade ärenden"
          tickets={doneTickets}
        />
      )}
    </div>
  )
}

function Section({ title, tickets }: any) {
  if (!tickets || tickets.length === 0) return null

  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold sticky top-0 bg-gray-50 py-2 z-10">{title}</h2>
      {tickets.map((t: any) => (
        <TicketRow key={t.id} ticket={t} />
      ))}
    </section>
  )
}