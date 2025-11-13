'use client'

import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 text-neutral-50 text-sm"
    >
      Logout
    </button>
  )
}
