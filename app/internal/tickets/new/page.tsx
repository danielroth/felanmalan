'use client'

import { useState } from 'react'
import { createInternalTicket } from '../actions'
import { useRouter } from 'next/navigation'

export default function NewInternalTicketPage() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [priority, setPriority] = useState('normal')
  const [saving, setSaving] = useState(false)

  async function submit() {
    if (!title.trim()) return

    setSaving(true)
    await createInternalTicket({
      title,
      address,
      priority,
    })
    setSaving(false)

    router.push('/internal/tickets')
  }

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-xl font-bold">Ny intern felanmälan</h1>

      <input
        placeholder="Vad är fel?"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full border p-3"
        autoFocus
      />

      <input
        placeholder="Plats (valfritt)"
        value={address}
        onChange={e => setAddress(e.target.value)}
        className="w-full border p-3"
      />

      <div className="flex gap-2">
        {['low', 'normal', 'high', 'critical'].map(p => (
          <button
            key={p}
            onClick={() => setPriority(p)}
            className={`px-3 py-1 border rounded ${
              priority === p ? 'bg-black text-white' : ''
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        onClick={submit}
        disabled={saving}
        className="bg-black text-white px-4 py-2"
      >
        {saving ? 'Skapar…' : 'Skapa'}
      </button>
    </div>
  )
}