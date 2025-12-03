// app/admin/AdminContext.jsx
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { toast } from 'sonner' // o da dove lo importi tu

const AdminContext = createContext(null)

export function useAdmin() {
  return useContext(AdminContext)
}

export function AdminProvider({ children }) {
  const router = useRouter()
  const [utente, setUtente] = useState(null)
  const [azienda, setAzienda] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error(error)
        setChecking(false)
        return
      }

      if (!data.session) {
        setChecking(false)
        router.push('/admin/login')
        return
      }

      setUtente(data.session.user)
      setChecking(false)

      const rules = data?.session.user.user_metadata.ruolo

      console.log("ruolo",rules)

      if (rules !== 'company' && rules !== 'admin' && rules !== 'superadmin') {
        router.push('/admin/login')
        return
      } else if (rules == 'company'){
        router.push('/admin/account')
      } else if (rules == 'admin' && rules == 'superadmin'){
        router.push('/gestionale')
      } 
    }

    checkAuth()
  }, [router])

  // DATI AZIENDA
  useEffect(() => {

    if (!utente?.id) return

    async function checkRules() {
      const { data, error } = await supabase
        .from('azienda_ritiro_veicoli')
        .select(`*, uuid_rules(*)`)
        .eq('uuid_azienda_ritiro_veicoli', utente.id)
        .maybeSingle()

      if (error) {
        console.error(error)
        toast.error('Errore nel caricamento Azienda Dati')
        return
      }

      setAzienda(data)

    }

    checkRules()

  }, [utente?.id, router])

  return (
    <AdminContext.Provider value={{ utente, azienda, checking }}>
      {children}
    </AdminContext.Provider>
  )
}
