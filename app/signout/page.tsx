'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/client'

export default function SignOutPage() {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function signOut() {
      await supabase.auth.signOut()

      // Efter logout: skicka användaren till login
      router.replace('/login')
    }

    signOut()
  }, [supabase, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Loggar ut…</p>
    </div>
  )
}