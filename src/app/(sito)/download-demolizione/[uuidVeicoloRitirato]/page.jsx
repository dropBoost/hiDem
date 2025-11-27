'use client'

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient"
import { Timeline,PickDotColor } from "@/app/componenti-sito/trackerStatus";
import { SpanElementList } from "@/app/componenti-sito/theme";
import { FaCaretRight } from "react-icons/fa";
import { DataFormat } from "@/app/componenti-sito/dataFormat";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function StatusDemolizione () {

    const params = useParams();

    const uuidVeicoloRitirato = params?.uuidVeicoloRitirato
    const [veicoloDemolito, setVeicoloDemolito] = useState([]) //DATI PRATICA
    const [veicoloRitirato, setVeicoloRitirato] = useState([]) //DATI VEICOLO
    const [statoAvanzamento, setStatoAvanzamento] = useState([]) //DATI AVANZAMENTO
    const aziendaRitiro = veicoloRitirato[0]?.azienda_ritiro_veicoli
    const datiVeicolo = veicoloRitirato ? veicoloRitirato[0] : []

    // CARICAMENTO DATI VEICOLO
    useEffect(() => {
  
      ;(async () => {
        const { data, error } = await supabase
          .from("dati_veicolo_ritirato")
          .select(`
            *,
            azienda_ritiro_veicoli:azienda_ritiro_veicoli (*),
            modello_veicolo:modello_veicolo (*)
          `)
          .eq("uuid_veicolo_ritirato", `${uuidVeicoloRitirato}`)

        if (error) {
          console.log(error)
          // toast.error("Errore nel caricamento certificati demolizione")
          return
        }
  
        // qui data è un ARRAY
        setVeicoloRitirato(data ?? [])
      })()
    }, [])

    // CARICAMENTO LOG AVANZAMENTO
    useEffect(() => {

    if (!datiVeicolo){
      console.log("status non caricato")
      return
    }

    ;(async () => {
        const { data, error } = await supabase
        .from("log_avanzamento_demolizione")
        .select(`*,
          stato:stati_avanzamento(alias_stato_avanzamento)`)
        .eq("uuid_veicolo_ritirato", `${datiVeicolo.uuid_veicolo_ritirato}`)
        .order("created_at_stato_avanzamento", { ascending: false })

        if (error) {
        console.log("AVANZAMENTO PRATICA:", { error })
        // toast.error("Errore nel caricamento certificati demolizione")
        return
        }
        setStatoAvanzamento(data ?? [])
    })()

    }, [veicoloRitirato])

    // CARICAMENTO DEMOLIZIONE
    useEffect(() => {

      if (datiVeicolo?.pratica_completata == false){
        return
      }
  
      ;(async () => {
        const { data, error } = await supabase
          .from("certificato_demolizione")
          .select(`*`)
          .eq("uuid_veicolo_ritirato", `${uuidVeicoloRitirato}`)

        if (error) {
          console.log(error)
          // toast.error("Errore nel caricamento certificati demolizione")
          return
        }
        // qui data è un ARRAY
        setVeicoloDemolito(data ?? {})
      })()
    }, [veicoloRitirato])

    console.log(veicoloDemolito)

    return (
        <>
        <div className="flex items-center justify-center p-8 bg-neutral-200 w-full">
          <h3 className="">STATUS DEMOLIZIONE: <font className="font-bold">{datiVeicolo?.targa_veicolo_ritirato}</font></h3>
        </div>
        <div className="flex flex-col items-center text-neutral-900 w-full p-5">
            {veicoloRitirato.length > 0 ?
            <div className="flex items-center justify-center bg-neutral-100 w-full max-w-[1100px] h-full border rounded-2xl">
              <div className="flex lg:flex-col flex-col justify-between lg:p-8 p-6 w-full gap-7">
                <div className="flex flex-col gap-3 bg-neutral-100 w-full rounded-xl">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>DATI VEICOLO</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-1">
                          <SpanElementList icon={<FaCaretRight/>} label="Modello:" data={`${datiVeicolo?.modello_veicolo.marca} ${datiVeicolo?.modello_veicolo.modello}`}/>
                          <SpanElementList icon={<FaCaretRight/>} label="Documento:" data={datiVeicolo?.tipologia_documento_veicolo_ritirato}/>
                          <SpanElementList icon={<FaCaretRight/>} label="Anno Immatricolazione:" data={datiVeicolo?.anno_veicolo_ritirato}/>
                          <SpanElementList icon={<FaCaretRight/>} label="Cilindrata:" data={datiVeicolo?.cilindrata_veicolo_ritirato}/>
                          <SpanElementList icon={<FaCaretRight/>} label="KM:" data={datiVeicolo?.km_veicolo_ritirato}/>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>DATI DETENTORE VEICOLO</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-1">
                          <SpanElementList icon={<FaCaretRight/>} label="Detentore Veicolo:" data={`${datiVeicolo?.nome_detentore} ${datiVeicolo?.cognome_detentore}`}/>
                          <SpanElementList icon={<FaCaretRight/>} label="Tipologia Detentore:" data={datiVeicolo?.tipologia_detentore}/>
                          <SpanElementList icon={<FaCaretRight/>} label="Nazionalità:" data={datiVeicolo?.nazionalita_documento_detentore}/>
                          <SpanElementList icon={<FaCaretRight/>} label="Documento Detentore:" data={`${datiVeicolo?.tipologia_documento_detentore} n° ${datiVeicolo?.numero_documento_detentore}`}/>
                          <SpanElementList icon={<FaCaretRight/>} label="Indirizzo Detentore:" data={`${datiVeicolo?.indirizzo_detentore} - ${datiVeicolo?.cap_detentore} ${datiVeicolo?.citta_detentore} ${datiVeicolo?.provincia_detentore}`}/>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>DATI AZIENDA RITIRO</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-1">
                          <SpanElementList icon={<FaCaretRight/>} label="Ritirato da:" data={aziendaRitiro?.ragione_sociale_arv}/>
                          <SpanElementList icon={<FaCaretRight/>} label="Partita Iva:" data={aziendaRitiro?.piva_arv}/>
                          <SpanElementList icon={<FaCaretRight/>} label="SDI:" data={aziendaRitiro?.sdi_arv}/>
                          <SpanElementList icon={<FaCaretRight/>} label="Sede Legale:" data={`${aziendaRitiro?.indirizzo_legale_arv} - ${aziendaRitiro?.cap_legale_arv} ${aziendaRitiro?.citta_legale_arv} ${aziendaRitiro?.provincia_legale_arv}`}/>
                          <SpanElementList icon={<FaCaretRight/>} label="Sede Operativa:" data={`${aziendaRitiro?.indirizzo_operativa_arv} - ${aziendaRitiro?.cap_operativa_arv} ${aziendaRitiro?.citta_operativa_arv} ${aziendaRitiro?.provincia_operativa_arv}`}/>
                          <SpanElementList icon={<FaCaretRight/>} label="Data Ritiro Veicolo:" data={DataFormat(datiVeicolo?.created_at_veicolo_ritirato)}/>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="w-full bg-neutral-400 border rounded-xl px-7 py-7">
                {veicoloDemolito.length == 0 ?
                  <>
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
                  </> : 
                  <div className="flex flex-col gap-5">
                    <span className="text-xs">SCARICA IL CERTIFICATO DI DEMOLIZIONE</span>
                    <a href={`${veicoloDemolito[0]?.documento_demolizione}`}>
                      <button className="rounded-xl px-4 py-1 bg-neutral-100 hover:bg-companyPrimary hover:text-neutral-100">CERTIFICATO</button>
                    </a>
                    <a href={`${veicoloDemolito[0]?.altro_documento_demolizione}`}>
                      <button className="rounded-xl px-4 py-1 bg-neutral-100 hover:bg-companyPrimary hover:text-neutral-100">ALTRO DOCUMENTO</button>
                    </a>
                  </div>
                }
                </div>
              </div>
            </div> : "...attendi" }
        </div>
        </>
    )
}


