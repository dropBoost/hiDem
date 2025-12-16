'use client'

import { moduliGestionale } from "@/app/cosetting"
import { usePathname } from "next/navigation"
import { useAdmin } from "@/app/admin/components/AdminContext"

export default function PAGEpos () {

    const pathname = usePathname()
    const moduloAttivo = moduliGestionale.find(m => m.link === pathname)
    const utente = useAdmin().utente
    const ruolo = utente?.user_metadata.ruolo

    if (moduloAttivo?.attivo == "false" && ruolo != "superadmin") {
        return (
            <>
            <span>MODULO</span> <span className="uppercase">{moduloAttivo.name}</span> <span>NON ATTIVO - contattare l'assistenza</span>
            </>
        )
    }

    return (
        <>
        {moduloAttivo.name}
        </>
    )
}