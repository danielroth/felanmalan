import Link from 'next/link'
import { markTicketDone } from './actions'



const PRIORITY_STYLES: Record<string, string> = {
  critical: 'bg-red-100 text-red-700',
  high: 'bg-orange-100 text-orange-700',
  normal: 'bg-blue-100 text-blue-700',
  low: 'bg-gray-100 text-gray-600',
}

const PRIORITY_LABELS: Record<string, string> = {
  critical: 'AKUT',
  high: 'HÖG',
  normal: 'NORMAL',
  low: 'LÅG',
}

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-purple-100 text-purple-700',
  in_progress: 'bg-slate-100 text-slate-700',
  waiting: 'bg-yellow-100 text-yellow-700',
  done: 'bg-green-100 text-green-700',
}

const STATUS_LABELS: Record<string, string> = {
  new: 'NY',
  in_progress: 'PÅGÅR',
  waiting: 'VÄNTAR',
  done: 'KLAR',
}


export default function TicketRow({ ticket }: any) {
  return (
    <Link
      href={`/internal/tickets/${ticket.id}`}
      scroll={false}
      className="block"
    >
        <div className="border rounded px-4 py-3 flex gap-4 items-start bg-white">
        {/* BADGES */}
        <div className="flex flex-col gap-1 min-w-[64px]">
            <Badge
            label={PRIORITY_LABELS[ticket.priority]}
            className={PRIORITY_STYLES[ticket.priority]}
            />
            <Badge
            label={STATUS_LABELS[ticket.status]}
            className={STATUS_STYLES[ticket.status]}
            />
        </div>

        {/* CONTENT */}
        <div className="flex-1">
            {ticket.title}

            <div className="text-sm opacity-70">
            {ticket.address}
            </div>

            <div className="text-xs opacity-50 mt-1">
            Skapad{' '}
            {new Date(ticket.created_at).toLocaleString('sv-SE')}
            </div>
        </div>
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
    </Link>
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