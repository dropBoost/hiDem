'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { AuthUserProvider } from './components/AuthUserContext'

export default function LayoutGestionale({ children }) {

  const [utente, setUtente] = useState(null)

  return (
    <AuthUserProvider value={utente}>
      <div className="min-h-screen bg-neutral-900 text-neutral-100">
        <main>{children}</main>
      </div>
    </AuthUserProvider>
  )
}
