import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import LoginForm from './LoginForm'

export default async function LoginPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // ✅ OM redan inloggad → skicka direkt till internvy
  if (user) {
    redirect('/internal/tickets')
  }

  // ❌ annars: visa login-formuläret
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  )
}
