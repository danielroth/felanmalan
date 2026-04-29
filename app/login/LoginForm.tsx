'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/client'

export default function LoginForm() {
  const supabase = createClient()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function signIn(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    // ✅ Tvinga cookie-sync
    router.refresh()

    // ✅ Gå till internvy
    router.replace('/internal/tickets')
  }

  return (
    <form
      onSubmit={signIn}
      className="w-full max-w-sm p-6 border rounded space-y-4 bg-white"
    >
      <h1 className="text-xl font-bold">Personalinloggning</h1>

      <div>
        <label className="block text-sm mb-1">E‑post</label>
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Lösenord</label>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-2"
      >
        {loading ? 'Loggar in…' : 'Logga in'}
      </button>
    </form>
  )
}
``