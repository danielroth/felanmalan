'use server'

import { createClient } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'

export async function updateTicketStatusAndPriority(
  ticketId: string,
  status: string,
  priority: string
) {
  const supabase = await createClient()

  // 1. Hämta nuvarande status
  const { data: existing } = await supabase
    .from('tickets')
    .select('status, email, title')
    .eq('id', ticketId)
    .single()

  if (!existing) {
    throw new Error('Ticket saknas')
  }

  // 2. Uppdatera ticket
  const { error } = await supabase
    .from('tickets')
    .update({ status, priority })
    .eq('id', ticketId)

  if (error) {
    console.error(error)
    throw new Error('Kunde inte uppdatera ärendet')
  }

  // 3. Skicka avslutsmail ENDAST vid övergång till done
  if (existing.status !== 'done' && status === 'done') {
    await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-ticket-closed-mail`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          email: existing.email,
          title: existing.title,
        }),
      }
    )
  }

  revalidatePath('/internal/tickets')
  revalidatePath(`/internal/tickets/${ticketId}`)
}

export async function addTicketComment(
  ticketId: string,
  body: string,
  isInternal: boolean
) {
  const supabase = await createClient()

  // 1. Hämta ticket (för email & titel)
  const { data: ticket } = await supabase
    .from('tickets')
    .select('email, title')
    .eq('id', ticketId)
    .single()

  if (!ticket) {
    throw new Error('Ticket saknas')
  }

  // 2. Spara kommentaren
  const { error } = await supabase
    .from('ticket_comments')
    .insert({
      ticket_id: ticketId,
      body,
      is_internal: isInternal,
      author_type: 'staff',
    })

  if (error) {
    console.error(error)
    throw new Error('Kunde inte spara kommentaren')
  }

  // 3. Skicka mail om extern kommentar
  if (!isInternal) {
    await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-external-comment-mail`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          email: ticket.email,
          title: ticket.title,
          comment: body,
        }),
      }
    )
  }

  // 4. Uppdatera vyn
  revalidatePath(`/internal/tickets/${ticketId}`)
}


export async function markTicketDone(ticketId: string) {
  const supabase = await createClient()

  await supabase
    .from('tickets')
    .update({ status: 'done' })
    .eq('id', ticketId)

  revalidatePath('/internal/tickets')
}

export async function createInternalTicket({
  title,
  address,
  priority,
}: {
  title: string
  address?: string
  priority: string
}) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('tickets')
    .insert({
      title,
      address: address || null,
      priority,
      status: 'new',
      source: 'internal',
    })

  if (error) {
    throw new Error('Kunde inte skapa internt ärende')
  }

  revalidatePath('/internal/tickets')
}
