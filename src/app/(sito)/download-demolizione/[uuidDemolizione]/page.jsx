'use client'

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient"

export default function StatusDemolizione ({uuidDemolizione}) {

    const params = useParams();
    const uuidDemolizioneStatus = params?.uuidDemolizione;
    const [demolizione, setDemolizione] = useState() //DATI PRATICA
    const [statoAvanzamento, setStatoAvanzamento] = useState([]) //DATI AVANZAMENTO

    // CARICAMENTO DEMOLIZIONE
      useEffect(() => {
    
        ;(async () => {
          const { data, error } = await supabase
            .from("certificato_demolizione")
            .select(`
              *,
              dati_veicolo_ritirato!inner (*)
            `)
            .eq("uuid_certificato_demolizione", `${uuidDemolizioneStatus}`)
            .maybeSingle()

          console.log("DEMOLIZIONE SUPABASE:", { data, error })
    
          if (error) {
            console.error(error)
            // toast.error("Errore nel caricamento certificati demolizione")
            return
          }
    
          // qui data è un ARRAY
          setDemolizione(data ?? {})
        })()
      }, [])

    // CARICAMENTO LOG AVANZAMENTO
    useEffect(() => {

    ;(async () => {
        const { data, error } = await supabase
        .from("log_avanzamento_demolizione")
        .select(`*`)
        .eq("uuid_veicolo_ritirato", `${demolizione?.uuid_veicolo_ritirato}`)
        .order("created_at_stato_avanzamento", { ascending: false })

        console.log("AVANZAMENTO PRATICA:", { data, error })

        if (error) {
        console.error(error)
        // toast.error("Errore nel caricamento certificati demolizione")
        return
        }
        // qui data è un ARRAY
        setStatoAvanzamento(data ?? [])
    })()
    }, [demolizione])  

      console.log("TESTDEM",demolizione)
      console.log("DemVeic", demolizione?.uuid_veicolo_ritirato)
      console.log("stat", statoAvanzamento)

    return (
        <>
        <div className="text-neutral-900">
        {demolizione?.uuid_veicolo_ritirato}<br></br>
        StatusDemolizione
        {statoAvanzamento[0]?.created_at_stato_avanzamento}
        </div>
        </>
    )
}