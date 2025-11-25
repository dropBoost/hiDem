'use client'

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient"
import { Timeline,PickDotColor } from "@/app/componenti-sito/trackerStatus";
import { SpanElementList } from "@/app/componenti-sito/theme";
import { FaCaretRight } from "react-icons/fa";
import { DataFormat } from "@/app/componenti-sito/dataFormat";

export default function StatusDemolizione ({uuidDemolizione}) {

    const params = useParams();
    const uuidDemolizioneStatus = params?.uuidDemolizione;
    const [demolizione, setDemolizione] = useState() //DATI PRATICA
    const [statoAvanzamento, setStatoAvanzamento] = useState([]) //DATI AVANZAMENTO
    const aziendaRitiro = demolizione?.dati_veicolo_ritirato.azienda_ritiro_veicoli
    const datiVeicolo = demolizione?.dati_veicolo_ritirato
    // CARICAMENTO DEMOLIZIONE
    useEffect(() => {
  
      ;(async () => {
        const { data, error } = await supabase
          .from("certificato_demolizione")
          .select(`
            *,
            dati_veicolo_ritirato!inner (
              *,
              azienda_ritiro_veicoli:azienda_ritiro_veicoli (*),
              modello_veicolo:modello_veicolo (*)
            )
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
        .select(`*,
          stato:stati_avanzamento(alias_stato_avanzamento)`)
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
        <div className="flex flex-col text-neutral-900">
          <div className="flex items-center justify-center p-8 bg-neutral-200">
            <h3 className="">STATUS DEMOLIZIONE: <font className="font-bold">{datiVeicolo?.targa_veicolo_ritirato}</font></h3>
          </div>
          <div className="flex items-center justify-center bg-neutral-100 w-full">
            <div className="flex lg:flex-row flex-col justify-between lg:p-8 p-6 w-full gap-7">
              <div className="flex flex-col gap-3 bg-neutral-100 w-full rounded-xl">
                <h3 className="text-xs">DATI VEICOLO</h3>
                <div className="flex flex-col gap-1">
                  <SpanElementList icon={<FaCaretRight/>} label="Modello:" data={`${datiVeicolo?.modello_veicolo.marca} ${datiVeicolo?.modello_veicolo.modello}`}/>
                  <SpanElementList icon={<FaCaretRight/>} label="Documento:" data={datiVeicolo?.tipologia_documento_veicolo_ritirato}/>
                  <SpanElementList icon={<FaCaretRight/>} label="Anno Immatricolazione:" data={datiVeicolo?.anno_veicolo_ritirato}/>
                  <SpanElementList icon={<FaCaretRight/>} label="Cilindrata:" data={datiVeicolo?.cilindrata_veicolo_ritirato}/>
                  <SpanElementList icon={<FaCaretRight/>} label="KM:" data={datiVeicolo?.km_veicolo_ritirato}/>
                </div>
                <h3 className="text-xs">DATI AZIENDA RITIRO</h3>
                <div className="flex flex-col gap-3">
                  <SpanElementList icon={<FaCaretRight/>} label="Ritirato da:" data={aziendaRitiro?.ragione_sociale_arv}/>
                  <SpanElementList icon={<FaCaretRight/>} label="Partita Iva:" data={aziendaRitiro?.piva_arv}/>
                  <SpanElementList icon={<FaCaretRight/>} label="SDI:" data={aziendaRitiro?.sdi_arv}/>
                  <SpanElementList icon={<FaCaretRight/>} label="Sede Legale:" data={`${aziendaRitiro?.indirizzo_legale_arv} - ${aziendaRitiro?.cap_legale_arv} ${aziendaRitiro?.citta_legale_arv} ${aziendaRitiro?.provincia_legale_arv}`}/>
                  <SpanElementList icon={<FaCaretRight/>} label="Sede Operativa:" data={`${aziendaRitiro?.indirizzo_operativa_arv} - ${aziendaRitiro?.cap_operativa_arv} ${aziendaRitiro?.citta_operativa_arv} ${aziendaRitiro?.provincia_operativa_arv}`}/>
                  <SpanElementList icon={<FaCaretRight/>} label="Data Ritiro Veicolo:" data={DataFormat(datiVeicolo?.created_at_veicolo_ritirato)}/>
                </div>
                <h3 className="text-xs">DATI DETENTORE VEICOLO</h3>
                <div className="flex flex-col gap-3">
                  <SpanElementList icon={<FaCaretRight/>} label="Detentore Veicolo:" data={`${datiVeicolo?.nome_detentore} ${datiVeicolo?.cognome_detentore}`}/>
                  <SpanElementList icon={<FaCaretRight/>} label="Tipologia Detentore:" data={datiVeicolo?.tipologia_detentore}/>
                  <SpanElementList icon={<FaCaretRight/>} label="Nazionalità:" data={datiVeicolo?.nazionalita_documento_detentore}/>
                  <SpanElementList icon={<FaCaretRight/>} label="Documento Detentore:" data={`${datiVeicolo?.tipologia_documento_detentore} n° ${datiVeicolo?.numero_documento_detentore}`}/>
                  <SpanElementList icon={<FaCaretRight/>} label="Indirizzo Detentore:" data={`${datiVeicolo?.indirizzo_detentore} - ${datiVeicolo?.cap_detentore} ${datiVeicolo?.citta_detentore} ${datiVeicolo?.provincia_detentore}`}/>
                </div>
              </div>
              <div className="border rounded-xl px-7 py-7 lg:w-96 w-full bg-neutral-300">
                <div className="border rounded-xl p-3 bg-companyPrimary text-neutral-300 mb-5">
                  <h3 className="text-xs">STATO AVANZAMENTO DEMOLIZIONE</h3>
                </div>
                <Timeline
                  items={(statoAvanzamento ?? []).map(t => ({
                    id: t.uuid_log_avanzamento_demolizione,
                    title: t?.stato?.alias_stato_avanzamento || "Stato",
                    datetime: t.created_at_stato_avanzamento,
                    description: t.note_log_stato_avanzamento,
                    dotClassName: PickDotColor(t?.stato?.alias_stato_avanzamento || "")
                  }))}
                  className="ml-2"
                />
              </div>
            </div>
          </div>
        </div>
        </>
    )
}


