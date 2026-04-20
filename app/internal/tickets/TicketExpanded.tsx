'use client'

import TicketDetailActions from './[id]/TicketDetailActions'
import TicketComments from './[id]/TicketComments'

type Ticket = {
  id: string
  created_at: string
  title: string
  description: string
  address: string
  phone: string
  email: string
  call_first: boolean
  key_access: string
  status: string
  priority: string
}

type Comment = {
  id: string
  created_at: string
  body: string
  is_internal: boolean
  author_type: string
}

type Props = {
  ticket: Ticket
  comments: Comment[]
}

export function TicketExpanded({ ticket, comments }: Props) {

  return (
    <div className="border-t bg-gray-50 px-4 py-4 space-y-4">
      {/* BESKRIVNING */}
      <section>
        <h4 className="text-sm font-semibold mb-2">Beskrivning</h4>
        <p className="text-sm whitespace-pre-line">{ticket.description}</p>
      </section>

      {/* KONTAKT */}
      <section>
        <h4 className="text-sm font-semibold mb-2">Kontakt</h4>
        <p className="text-sm">Telefon: {ticket.phone}</p>
        <p className="text-sm">E‑post: {ticket.email}</p>
        <p className="text-sm">Ring först: {ticket.call_first ? 'Ja' : 'Nej'}</p>
      </section>

      {/* PLATS */}
      <section>
        <p className="text-sm">Nyckelåtkomst: <b>{ticket.key_access}</b></p>
      </section>

      

      {/* STATUS / PRIORITET */}
      <section>
        <h4 className="text-sm font-semibold mb-2">Hantering</h4>
        <TicketDetailActions
          ticketId={ticket.id}
          initialStatus={ticket.status}
          initialPriority={ticket.priority}
        />
      </section>

      {/* KOMMENTARER */}
      <TicketComments
        ticketId={ticket.id}
        comments={comments}
      />
    </div>
  )
}