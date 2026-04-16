import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'

export default async function InternalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
            <Link href="/internal/tickets" className="text-lg font-bold">
                <h1 className="text-lg font-bold">Felanmälningar</h1>
            </Link>

          <div className="text-sm flex items-center gap-4">
            <span className="opacity-70">
              Inloggad som <b>{user?.email}</b>
            </span>

            <Link href="/signout" className="underline">
              Logga ut
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}
