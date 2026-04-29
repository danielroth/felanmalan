'use server'

import { createClient } from '@/lib/supabase-server'

type CreateTicketInput = {
  name: string
  email: string
  phone?: string
  address: string
  title: string
  description: string
  callFirst: boolean
  keyAccess: 'yes' | 'no' | 'not_needed'
}

export async function createTicket(data: CreateTicketInput) {
  const supabase = await createClient()

  const { error } = await supabase.from('tickets').insert({
    title: data.title,
    description: data.description,
    address: data.address,
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    call_first: data.callFirst,
    key_access: data.keyAccess,
    status: 'new',
    priority: 'normal',
    source: 'tenant',
  })

  if (error) {
    console.error(error)
    throw new Error('Kunde inte skapa felanmälan')
  }
}
