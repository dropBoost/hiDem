'use client'

import { useParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { FaFileDownload } from "react-icons/fa";
import { FaUserSlash } from "react-icons/fa";
import { FaCircle, FaDotCircle } from "react-icons/fa";
import { Input } from "@/components/ui/input"
import Link from "next/link";
import ButtonDeleteRow from "@/app/componenti/buttonDeleteSup";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RiEyeCloseLine } from "react-icons/ri";
import ButtonDeletePratica from "@/app/componenti/buttonDeletePratica";

  export default function PraticheAzienda() {

    const params = useParams();
    const uuidAzienda = params?.uuidAzienda;
    const [listPraticheAzienda, setListPraticheAzienda] = useState([])  
    const [datiAzienda, setDatiAzienda] = useState([])  
    // ricerca
    const [dataSearch, setDataSearch] = useState("")        // testo digitato
    const [dataSearchSubmit, setDataSearchSubmit] = useState("") // testo applicato

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

    // CARICAMENTO DATI AZIENDA
    useEffect(() => {
        if (!params.uuidAzienda){
        return
        }
        ;(async () => {
        const { data: aziendaData, error } = await supabase
            .from("azienda_ritiro_veicoli")
            .select('uuid_azienda_ritiro_veicoli,ragione_sociale_arv, piva_arv')
            .eq("uuid_azienda_ritiro_veicoli", uuidAzienda)

        if (error) {
            console.error(error)
            toast.error("Errore nel caricamento Dati Azienda")
            return
        }
        setDatiAzienda(aziendaData ?? [])
        })()
    }, [uuidAzienda])   

    // CARICAMENTO PRATICHE AZIENDA
    useEffect(() => {
        if (!params.uuidAzienda){
        return
        }
        ;(async () => {
        const { data: praticheData, error } = await supabase
            .from("dati_veicolo_ritirato")
            .select("*")
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

  return (
  <>
      <div className={`${listPraticheAzienda ? '' : 'hidden'} w-full min-h-0 flex-1 flex flex-col gap-4`}>
      <h1 className="text-white">{datiAzienda[0]?.ragione_sociale_arv} / {datiAzienda[0]?.piva_arv}</h1>
      {/* Barra ricerca */}
      <div className="flex w-full items-center gap-2">
        <Input
          type="text"
          id="cerca"
          placeholder="Cerca nome, cognome, email o telefono…"
          value={dataSearch}
          onChange={handleChangeSearchBar}
          onKeyDown={handleSearchKeyDown}
          className="appearance-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand
                     focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:border-brand"
        />
        <Button type="button" onClick={handleSearchClick}>Cerca</Button>
        <Button type="button" variant="outline" onClick={handleReset}>Reset</Button>
      </div>

      {/* Tabella */}
      <div className="flex flex-col flex-1 justify-between border border-brand rounded-xl p-5 max-h-full overflow-auto">
        <Table>
          <TableCaption>
            {totalCount > 0
              ? `Trovati ${totalCount} clienti • Pagina ${page} di ${totalPages}`
              : "Nessun risultato"}
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="border-e border-brand text-center truncate">Stato</TableHead>
              <TableHead className="text-left truncate">Targa</TableHead>
              <TableHead className="truncate">Nome</TableHead>
              <TableHead className="truncate">Cognome</TableHead>
              <TableHead className="truncate">Data Inserimento</TableHead>
              <TableHead className="border-e border-brand truncate"></TableHead>
              <TableHead className="place-items-center truncate"><FaFileDownload /></TableHead>
              <TableHead className="place-items-center text-center truncate"><RiEyeCloseLine/></TableHead>
              <TableHead className="place-items-center text-center truncate">Elimina</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
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
                <TableRow key={`${lpa?.targa_veicolo_ritirato ?? index}`}>
                  <TableCell className="text-center border-e border-brand ">
                    <div className=" flex flex-col justify-center items-center w-full h-full">
                      {lpa?.pratica_completata ?
                      <div className="flex flex-row items-center justify-center gap-2"><span className="flex items-center justify-center border border-brand bg-brand rounded-full w-3 h-3 text-[0.6rem]"></span></div> :
                      <div className="flex flex-row items-center justify-center gap-2"><span className="flex items-center justify-center border border-red-700 bg-red-700 rounded-full w-3 h-3 text-[0.6rem]"></span></div>}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-left truncate">{lpa?.targa_veicolo_ritirato}</TableCell>
                  <TableCell className="truncate">{lpa?.nome_detentore}</TableCell>
                  <TableCell className="truncate">{lpa?.cognome_detentore}</TableCell>
                  <TableCell className="truncate">{DataFormat(lpa?.created_at_veicolo_ritirato)} </TableCell>
                  <TableCell className="border-e border-brand"></TableCell>
                  <TableCell className="hover:bg-brand/50 text-brand hover:text-neutral-200 w-16 h-full">
                    <a href={`./${lpa?.uuid_azienda_ritiro_veicoli ?? index}/${lpa?.uuid_veicolo_ritirato}`} className="flex flex-col justify-center items-center w-full h-full p-2">
                      <FaFileDownload/>
                    </a>
                  </TableCell>
                  <TableCell className="hover:bg-brand/50 text-brand hover:text-neutral-200 w-16">
                    <a href={`./${lpa?.uuid_azienda_ritiro_veicoli ?? index}/${lpa?.uuid_veicolo_ritirato}`} className="flex flex-col justify-center items-center w-full h-full p-2">
                      <RiEyeCloseLine/>
                    </a>
                  </TableCell>
                  <TableCell className="hover:bg-brand/50 text-brand hover:text-neutral-200 w-16">
                    <ButtonDeletePratica
                      uuid={lpa?.uuid_veicolo_ritirato}
                      tabella="dati_veicolo_ritirato"
                      nomeAttributo="uuid_veicolo_ritirato"
                      className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                      confirmMessage="Sei sicuro di voler eliminare questa pratica?"
                      onDeleted={(id) => { setPratiche(prev => prev.filter(p => p.uuid_pratica !== id)) }}
                    />
                    <a href={`./${lpa?.uuid_azienda_ritiro_veicoli ?? index}/${lpa?.uuid_veicolo_ritirato}`} className="flex flex-col justify-center items-center w-full h-full p-2">
                      
                    </a>
                  </TableCell>
                              
                </TableRow>
              )
            }) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">Nessun risultato.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination controls */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-sm opacity-80">
            {totalCount > 0 && (
              <>
                Mostrati{" "}
                <strong>
                  {Math.min(totalCount, from + 1)}–{Math.min(totalCount, to + 1)}
                </strong>{" "}
                di <strong>{totalCount}</strong>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              Prev
            </Button>
            <span className="text-sm tabular-nums">Pag. {page} / {totalPages}</span>
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages || totalCount === 0}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}