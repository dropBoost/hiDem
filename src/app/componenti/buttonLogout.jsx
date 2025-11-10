// src/app/componenti/buttonLogout.jsx
'use client'

import { useTransition } from 'react'
import { signOut } from '@/app/actions/auth'

export default function LogoutButton({ className = '' }) {
  const [pending, start] = useTransition()
  return (
    <button
      type="button"
      onClick={() => start(() => signOut())}
      disabled={pending}
      aria-busy={pending}
      className={`rounded px-3 py-2 border disabled:opacity-60 ${className}`}
    >
      {pending ? 'Uscita…' : 'Esci'}
    </button>
  )
}