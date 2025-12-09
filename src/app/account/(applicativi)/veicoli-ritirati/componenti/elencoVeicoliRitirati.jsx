'use client'

import { useParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAdmin } from "@/app/admin/components/AdminContext";
import DisplayVeicoliRitiratiACCOUNT from "./displayVeicoliRitirati";

  export default function PraticheAziendaACCOUNT() {

    const params = useParams();
    
    const [listPraticheAzienda, setListPraticheAzienda] = useState([])  
    const [datiAzienda, setDatiAzienda] = useState([])  
    // ricerca
    const [dataSearch, setDataSearch] = useState("")        // testo digitato
    const [dataSearchSubmit, setDataSearchSubmit] = useState("") // testo applicato

    const utente = useAdmin()
    const uuidAzienda = utente?.utente?.id

    console.log("veicoli ritirati",utente, uuidAzienda)

    // paginazione
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(20)
    const [totalCount, setTotalCount] = useState(0)

    // calcolo indici per Supabase range (inclusivo)
    const { from, to } = useMemo(() => {
        const start = (page - 1) * pageSize
        return { from: start, to: start + pageSize - 1 }
    }, [page, pageSize])

    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))

    const escapeLike = (s) => s.replace(/([%_\\])/g, "\\$1")

    // CARICAMENTO PRATICHE AZIENDA
    useEffect(() => {
        if (!uuidAzienda){
        return
        }
        ;(async () => {
        const { data: praticheData, error } = await supabase
            .from("dati_veicolo_ritirato")
            .select(`
              *,
              modello:modello_veicolo(
              marca,
              modello
              )
              `)
            .eq("uuid_azienda_ritiro_veicoli", uuidAzienda)
            .order("created_at_veicolo_ritirato", {ascending: false})

        if (error) {
            console.error(error)
            toast.error("Errore nel caricamento Modelli Marchio Auto")
            return
        }
        setListPraticheAzienda(praticheData ?? [])
        })()
    }, [uuidAzienda])  

    // handlers ricerca
    function handleChangeSearchBar(e) {
        setDataSearch(e.target.value)
    }
    function handleSearchClick() {
        setDataSearchSubmit(dataSearch.trim())
        setPage(1) // 🔑 reset pagina quando applichi filtro
    }
    function handleSearchKeyDown(e) {
        if (e.key === "Enter") {
        setDataSearchSubmit(dataSearch.trim())
        setPage(1)
        }
    }
    function handleReset() {
        setDataSearch("")
        setDataSearchSubmit("")
        setPage(1)
    }

  console.log("lista",listPraticheAzienda)

  return (
  <>
      <div className={`${listPraticheAzienda ? '' : 'hidden'} w-full min-h-0 flex-1 flex flex-col gap-4`}>
      <div className="col-span-12">
        <h4 className="text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl">{datiAzienda[0]?.ragione_sociale_arv} / {datiAzienda[0]?.piva_arv}</h4>
      </div>
      {/* Barra ricerca */}
      <div className="flex w-full items-center gap-2">
        <Input
          type="text"
          id="cerca"
          placeholder="Cerca nome, cognome, email o telefono…"
          value={dataSearch}
          onChange={handleChangeSearchBar}
          onKeyDown={handleSearchKeyDown}
          className="appearance-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand placeholder:text-xs
                     focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:border-brand"
        />
        <Button type="button" onClick={handleSearchClick}>Cerca</Button>
        <Button type="button" variant="outline" onClick={handleReset}>Reset</Button>
      </div>


      <div className="flex flex-col gap-3">
        {listPraticheAzienda?.length ? listPraticheAzienda?.map((lpa, index) => {
          
          function DataFormat(value) {
            if (!value) return '—'
            const d = new Date(value)
            if (isNaN(d)) return '—'
            return d.toLocaleString('it-IT', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            })
        } 

          return (
            <DisplayVeicoliRitiratiACCOUNT
            key={lpa?.uuid_veicolo_ritirato} uuid={lpa?.uuid_veicolo_ritirato} data={DataFormat(lpa?.created_at_veicolo_ritirato)}
            completata={lpa?.pratica_completata} targa={lpa?.targa_veicolo_ritirato} telaio={lpa?.vin_veicolo_ritirato}
            tipologiaD={lpa?.forma_legale_detentore} ragioneSociale={lpa?.ragione_sociale_detentore} nome={lpa?.nome_detentore} cognome={lpa?.cognome_detentore} piva={lpa?.piva_detentore}
            cf={lpa?.cf_detentore} modelloVeicolo={`${lpa?.modello.marca} ${lpa?.modello.modello}`} documento={lpa?.tipologia_documento_veicolo_ritirato}
            mobileDetentore={lpa?.mobile_detentore} email={lpa?.email_detentore}
            />
          );
          
        }) : (
            <span colSpan={8} className="h-24 text-center">Nessun veicolo ritirato.</span>
        )}
      </div> 
    </div>
  </>
  )
}