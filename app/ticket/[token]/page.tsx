// app/ärende/[token]/page.tsx
import { createClient } from '@/lib/supabase-server'

type Props = {
  params: Promise<{ token: string }>
}

export default async function PublicTicketPage({ params }: Props) {
  const { token } = await params
  const supabase = await createClient()

  const { data: ticket } = await supabase
    .from('tickets')
    .select(`
      title,
      description,
      status,
      created_at,
      ticket_comments (
        body,
        created_at,
        is_internal
      )
    `)
    .eq('public_token', token)
    .single()


    const { data: { user }, } = await supabase.auth.getUser()


  if (!ticket) {
    return (
      <div className="p-6">
        <h1>Ärendet hittades inte</h1>
        <p>Länken kan vara felaktig eller ha gått ut.</p>
      </div>
    )
  }

  const externalComments =
    (ticket.ticket_comments ?? []).filter(
      (c: any) => c.is_internal === false
    )

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">{ticket.title}</h1>

        <div className="text-sm opacity-70">
            Skapat:{' '}
            {new Date(ticket.created_at).toLocaleString('sv-SE')}
        </div>

        <section>
            <h2 className="font-semibold">Beskrivning</h2>
            <p className="whitespace-pre-line">
            {ticket.description}
            </p>
        </section>

        <section>
            <h2 className="font-semibold">Status</h2>
            <p>{ticket.status}</p>
        </section>

        <section>
            <h2 className="font-semibold">Meddelanden</h2>

            {externalComments.length === 0 && (
            <p className="text-sm opacity-70">
                Inga nya meddelanden ännu.
            </p>
            )}

            <div className="space-y-3">
            {externalComments.map((c: any, i: number) => (
                <div
                key={i}
                className="bg-gray-100 p-3 rounded text-sm"
                >
                <div className="opacity-70 mb-1">
                    {new Date(c.created_at).toLocaleString('sv-SE')}
                </div>
                <div className="whitespace-pre-line">{c.body}</div>
                </div>
            ))}
            </div>
        </section>
        </div>
    </div>
  )
}