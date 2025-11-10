'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signOut() {
  const supabase = await createClient()  // 👈 serve await
  if (!supabase) throw new Error('Supabase client non inizializzato')

  await supabase.auth.signOut()
  redirect('/login')
}
