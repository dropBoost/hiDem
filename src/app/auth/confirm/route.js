// app/auth/callback/route.js  (o il tuo path equivalente)
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') // es: 'signup' | 'magiclink' | 'recovery' | 'email_change' | 'invite' | 'reauthentication'
  const next = searchParams.get('next') ?? '/'

  if (token_hash && type) {
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({ type, token_hash })
    if (!error) {
      return redirect(next)
    }
  }

  return redirect('/error')
}
