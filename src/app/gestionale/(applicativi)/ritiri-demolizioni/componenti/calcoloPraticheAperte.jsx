import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient"

export default function CalcoloPraticheAperte ({uuidAzienda}) {

    const [uuidRitiroVeicolo, setUuidRitiroVeicolo] = useState([])
    const [praticheAperte, setPraticheAperte] = useState([])

    useEffect(() => {
        // if (!uuidRitiroVeicolo) return
        ;(async () => {

        const { data, count, error } = await supabase
        .from("v_pratiche_aperte_per_azienda")
        .select("*")

        if (error) {
            console.error(error)
            toast.error("Errore nel caricamento timeline")
            setLoading(false)
            return
        }

        const countMap = new Map(count.map(c => [c.uuid_azienda_ritiro_veicoli, c.pratiche_aperte]));

        setPraticheAperte(countMap ?? [])
        
        })()
    }, [])
console.log("count",praticheAperte)
    return (<span>{praticheAperte}</span>)
}