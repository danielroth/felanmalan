'use client'

import { useState } from 'react'
import TicketRow from './TicketRow'

// 1. Definiera Section UTANFÖR huvudkomponenten
function Section({
  title,
  children,
  expandedIds,
  onToggle,
  comments,
}: {
  title: string
  children: any[]
  expandedIds: string[]
  onToggle: (id: string) => void
  comments: any[]
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
          onToggle={onToggle}
          comments={comments.filter((c: any) => c.ticket_id === t.id)}
        />
      ))}
    </section>
  )
}

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
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  // Hjälpfunktion för att slippa skicka med alla props manuellt varje gång
  const renderSection = (title: string, data: any[]) => (
    <Section 
      title={title} 
      children={data} 
      expandedIds={expandedIds} 
      onToggle={toggle} 
      comments={comments} 
    />
  )

  return (
    <div className="space-y-8">
      {renderSection("Nya ärenden", newTickets)}
      {renderSection("Hög prioritet", highPriority)}
      {renderSection("Normal prioritet", normalPriority)}
      {renderSection("Låg prioritet", lowPriority)}

      <button
        onClick={() => setShowDone(v => !v)}
        className="underline text-sm"
      >
        {showDone ? 'Dölj avslutade ärenden' : 'Visa avslutade ärenden'}
      </button>

      {showDone && renderSection("Avslutade ärenden", doneTickets)}
    </div>
  )
}