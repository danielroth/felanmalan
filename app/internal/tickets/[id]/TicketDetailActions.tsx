'use client'

import { useState } from 'react'
import { updateTicketStatusAndPriority } from '../actions'

type Props = {
  ticketId: string
  initialStatus: string
  initialPriority: string
}

export default function TicketDetailActions({
  ticketId,
  initialStatus,
  initialPriority,
}: Props) {
  const [status, setStatus] = useState(initialStatus)
  const [priority, setPriority] = useState(initialPriority)
  const [saving, setSaving] = useState(false)

  async function save() {
    setSaving(true)
    await updateTicketStatusAndPriority(ticketId, status, priority)
    setSaving(false)
  }

  return (
    <div className="flex gap-4 items-center">
      <label>
        Status
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="ml-2 border"
        >
          <option value="new">Ny</option>
          <option value="in_progress">Pågår</option>
          <option value="waiting">Väntar</option>
          <option value="done">Klar</option>
        </select>
      </label>

      <label>
        Prioritet
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="ml-2 border"
        >
          <option value="low">Låg</option>
          <option value="normal">Normal</option>
          <option value="high">Hög</option>
          <option value="critical">Akut</option>
        </select>
      </label>

      <button
        onClick={save}
        disabled={saving}
        className="ml-auto px-3 py-1 bg-black text-white rounded"
      >
        {saving ? 'Sparar…' : 'Spara'}
      </button>
    </div>
  )
}