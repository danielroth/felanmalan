import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import TicketDetailActions from './TicketDetailActions'
import TicketComments from './TicketComments'
import { BackButton } from './BackButton'

type Props = {
	params: Promise<{ id: string }>
}

export default async function TicketDetailPage({ params }: Props) {
	const { id } = await params

	const supabase = await createClient()

	const { data: ticket, error } = await supabase
	.from('tickets')
	.select(`
		id,
		created_at,
		title,
		description,
		address,
		phone,
		email,
		call_first,
		key_access,
		status,
		priority
	`)
	.eq('id', id)
	.single()

	const { data: comments } = await supabase
	.from('ticket_comments')
	.select(`
		id,
		created_at,
		body,
		is_internal,
		author_type
	`)
	.eq('ticket_id', id)
	.order('created_at', { ascending: true })

	if (error || !ticket) {
		return (
			<div className="p-6">
			<p>Ärendet hittades inte.</p>
			<Link href="/internal/tickets" className="underline">
				Tillbaka till listan
			</Link>
			</div>
		)
	}

	return (
	<div className="space-y-6">
		<div className="flex justify-between items-start">
		<h1 className="text-2xl font-bold">{ticket.title}</h1>

		
			<div className="mb-4">
				<BackButton />
			</div>

		</div>

		{/* META */}
		<div className="text-sm opacity-70">
		Skapat:{' '}
		{new Date(ticket.created_at).toLocaleString('sv-SE')}
		</div>

		{/* PLATS */}
		<section className="border rounded p-4">
		<h2 className="font-semibold mb-2">Plats</h2>
		<p>{ticket.address}</p>
		<p>Nyckelåtkomst: <b>{ticket.key_access}</b></p>
		</section>

		{/* KONTAKT */}
		<section className="border rounded p-4">
		<h2 className="font-semibold mb-2">Kontakt</h2>
		<p>Telefon: {ticket.phone}</p>
		<p>E‑post: {ticket.email}</p>
		<p>Ring först: {ticket.call_first ? 'Ja' : 'Nej'}</p>
		</section>

		{/* BESKRIVNING */}
		<section className="border rounded p-4">
		<h2 className="font-semibold mb-2">Beskrivning</h2>
		<p className="whitespace-pre-line">{ticket.description}</p>
		</section>

		{/* STATUS / PRIORITET */}
		<section className="border rounded p-4">
		<h2 className="font-semibold mb-2">Hantering</h2>

		<TicketDetailActions
			ticketId={ticket.id}
			initialStatus={ticket.status}
			initialPriority={ticket.priority}
		/>

		<TicketComments
			ticketId={ticket.id}
			comments={comments ?? []}
		/>
		</section>
	</div>
	)
}