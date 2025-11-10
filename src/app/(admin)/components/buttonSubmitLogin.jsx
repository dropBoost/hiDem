'use client'

import { useFormStatus } from 'react-dom'

export default function ButtonLoginFormSubmit({messaggio, label, }) {

  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending} className={`${!pending ? `border-brand hover:bg-brand` : `bg-dark`} border px-3 py-2 rounded-lg text-xs`}>
      {pending ? `${messaggio}` : `${label}`}
    </button>
  )

}