'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { AuthUserProvider } from '@/app/admin/components/AuthUserContext'

export default function LayoutGestionale({ children }) {

  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [utente, setUtente] = useState(null)

  useEffect(() => {
    async function checkAuth() {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error(error)
        setChecking(false)
        return
      }

      if (!data.session) {
        router.push('admin/login')
      } else {
        setUtente(data.session.user)   // 👈 salvo l'utente
        setChecking(false)
        console.log("layout gestionale",data)
      }
    }
    checkAuth()
  }, [router])

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900">
        <p className="text-neutral-100">Verifica autenticazione...</p>
      </div>
    )
  }

  return (
    <AuthUserProvider value={utente}>
      <div className="min-h-screen dark:bg-neutral-900 text-neutral-100 overflow-hidden">
        <main>{children}</main>
      </div>
    </AuthUserProvider>
  )
}
