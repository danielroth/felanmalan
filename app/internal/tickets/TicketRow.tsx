'use client'

import { markTicketDone } from './actions'
import { TicketExpanded } from './TicketExpanded'

export default function TicketRow({
  ticket,
  expanded,
  onToggle,
  comments,
}: {
  ticket: any
  expanded: boolean
  onToggle: (id: string) => void
  comments: any[]
}) {
  return (
    <div className="border rounded bg-white">
      {/* HEADER */}
      <button
        type="button"
        onClick={() => onToggle(ticket.id)}
        className="w-full text-left px-4 py-3 flex gap-4 items-start hover:bg-gray-50"
      >
        {/* BADGES */}
        {/* <div className="flex flex-col gap-1 min-w-[64px]">
          <Badge
            label={PRIORITY_LABELS[ticket.priority]}
            className={PRIORITY_STYLES[ticket.priority]}
          />
          <Badge
            label={STATUS_LABELS[ticket.status]}
            className={STATUS_STYLES[ticket.status]}
          />
        </div> */}

        {/* CONTENT */}
        <div className="flex-1">
          <div className="font-medium">{ticket.title}</div>
          <div className="text-sm opacity-70">{ticket.address}</div>
          <div className="text-xs opacity-50 mt-1">
            Skapad{' '}
            {new Date(ticket.created_at).toLocaleString('sv-SE')}
          </div>
        </div>

        {/* INDICATOR */}
        <div className="text-sm opacity-50">
          {expanded ? '▲' : '▼'}
        </div>
      </button>

      {/* EXPANDED */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          expanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <TicketExpanded ticket={ticket} comments={comments} />

        <div className="px-4 pb-4">
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              markTicketDone(ticket.id)
            }}
            className="text-xs underline opacity-60 hover:opacity-100"
          >
            Markera klar
          </button>
        </div>
      </div>
    </div>
  )
}


function Badge({
  label,
  className,
}: {
  label: string
  className: string
}) {
  return (
    <span
      className={`px-2 py-0.5 rounded text-[11px] font-semibold text-center ${className}`}
    >
      {label}
    </span>
  )
}