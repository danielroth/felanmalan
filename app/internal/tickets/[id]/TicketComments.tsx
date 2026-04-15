'use client'

import { useState } from 'react'
import { addTicketComment } from '../actions'

type Comment = {
  id: string
  created_at: string
  body: string
  is_internal: boolean
  author_type: string
}

type Props = {
  ticketId: string
  comments: Comment[]
}

export default function TicketComments({ ticketId, comments }: Props) {
  const [text, setText] = useState('')
  const [isInternal, setIsInternal] = useState(true)
  const [saving, setSaving] = useState(false)

  async function submit() {
    if (!text.trim()) return

    setSaving(true)
    await addTicketComment(ticketId, text, isInternal)
    setText('')
    setSaving(false)
  }

  return (
    <section className="border rounded p-4 space-y-4">
      <h2 className="font-semibold">Kommentarer</h2>

      <div className="space-y-3">
        {comments.map(c => (
          <div
            key={c.id}
            className={`p-3 rounded text-sm ${
              c.is_internal
                ? 'bg-gray-100 border border-dashed'
                : 'bg-blue-50'
            }`}
          >
            <div className="opacity-70 mb-1">
              {new Date(c.created_at).toLocaleString('sv-SE')}
              {c.is_internal && ' • Intern kommentar'}
            </div>

            <div className="whitespace-pre-line">{c.body}</div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="Skriv en kommentar…"
          className="w-full border p-2"
        />

        <div className="flex items-center gap-4">
          <label className="text-sm">
            <input
              type="checkbox"
              checked={isInternal}
              onChange={(e) => setIsInternal(e.target.checked)}
              className="mr-1"
            />
            Intern kommentar
          </label>

          <button
            onClick={submit}
            disabled={saving}
            className="ml-auto px-3 py-1 bg-black text-white rounded"
          >
            {saving ? 'Skickar…' : 'Skicka'}
          </button>
        </div>
      </div>
    </section>
  )
}