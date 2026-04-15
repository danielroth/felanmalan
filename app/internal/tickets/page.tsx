import { createClient } from '@/lib/supabase-server'
import TicketList from './TicketList'

export default async function TicketsPage() {
  const supabase = await createClient()

  const { data: tickets } = await supabase
    .from('tickets')
    .select('id, title, address, status, priority, created_at')
    .order('created_at', { ascending: true })

  if (!tickets) {
    return <p>Något gick fel.</p>
  }

  // Gruppindelning
  const newTickets = tickets.filter(t => t.status === 'new')
  const highPriority = tickets.filter(
    t => t.status !== 'done' && t.priority === 'high'
  )
  const normalPriority = tickets.filter(
    t => t.status !== 'done' && t.priority === 'normal'
  )
  const lowPriority = tickets.filter(
    t => t.status !== 'done' && t.priority === 'low'
  )
  const doneTickets = tickets.filter(t => t.status === 'done')

  return (
    <TicketList
      newTickets={newTickets}
      highPriority={highPriority}
      normalPriority={normalPriority}
      lowPriority={lowPriority}
      doneTickets={doneTickets}
    />
  )
}