'use client'

import { useRouter } from 'next/navigation'

export function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="underline text-sm"
    >
      ← Tillbaka
    </button>
  )
}