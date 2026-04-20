'use client'

import { useState } from 'react'
import TicketRow from './TicketRow'

export default function TicketList({
  newTickets,
  highPriority,
  normalPriority,
  lowPriority,
  doneTickets,
  comments,
}: any) {
  const [showDone, setShowDone] = useState(false)
  const [expandedIds, setExpandedIds] = useState<string[]>([])

  function toggle(id: string) {
    setExpandedIds(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="space-y-8">
      <Section title="Nya ärenden">
        {newTickets}
      </Section>

      <Section title="Hög prioritet">
        {highPriority}
      </Section>

      <Section title="Normal prioritet">
        {normalPriority}
      </Section>

      <Section title="Låg prioritet">
        {lowPriority}
      </Section>

      <button
        onClick={() => setShowDone(v => !v)}
        className="underline text-sm"
      >
        {showDone
          ? 'Dölj avslutade ärenden'
          : 'Visa avslutade ärenden'}
      </button>

      {showDone && (
        <Section title="Avslutade ärenden">
          {doneTickets}
        </Section>
      )}
    </div>
  )

  function Section({
    title,
    children,
  }: {
    title: string
    children: any[]
  }) {
    if (!children || children.length === 0) return null

    return (
      <section className="space-y-2">
        <h2 className="text-lg font-semibold sticky top-0 bg-gray-50 py-2 z-10">
          {title}
        </h2>

        {children.map((t: any) => (
          <TicketRow
            key={t.id}
            ticket={t}
            expanded={expandedIds.includes(t.id)}
            onToggle={toggle}
            comments={comments.filter((c: any) => c.ticket_id === t.id)}
          />
        ))}
      </section>
    )
  }
}