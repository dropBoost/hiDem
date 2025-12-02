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
        router.push('/admin/login')
        return
      }

      setUtente(data.session.user)
      setChecking(false)
      console.log('layout gestionale', data)

      // 🔹 QUERY AZIENDA
      const { data: dataAzienda, error: errorAzienda } = await supabase
        .from('azienda_ritiro_veicoli')
        .select(`
          *,
          uuid_rules(*)
        `)
        .eq('uuid_azienda_ritiro_veicoli', data.session.user.id)
        .maybeSingle()

      if (errorAzienda) {
        console.error(errorAzienda)
        toast.error('Errore nel caricamento Azienda Dati')
        return
      }

      setAzienda(dataAzienda ?? null)

      const rules = dataAzienda?.uuid_rules?.alias_rules

      if (!rules || (rules !== 'company' && rules !== 'admin')) {
        router.push('/admin/login')
        return
      }
    }

    checkAuth()
  }, [router])

  return (
    <AdminContext.Provider value={{ utente, azienda, checking }}>
      {children}
    </AdminContext.Provider>
  )
}
