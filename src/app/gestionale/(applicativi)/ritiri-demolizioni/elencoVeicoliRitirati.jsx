'use client'
import { useEffect, useMemo, useState } from "react"
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient"
import { FaUserSlash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { FaFileDownload } from "react-icons/fa";
import { FaCircle, FaDotCircle } from "react-icons/fa";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ButtonDeleteRow from "@/app/componenti/buttonDeleteSup";
import CalcoloPraticheAperte from "./componenti/calcoloPraticheAperte";

export default function ElencoVeicoliRitirati({ onDisplay, statusAziende, setStatusAziende }) {
  const [aziendaRitiroVeicoli, setAziendaRitiroVeicoli] = useState([])
  const [countByUuid, setCountByUuid] = useState({});

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

  const handleCount = (uuid, count) => {
    setCountByUuid(prev => ({ ...prev, [uuid]: count }));
  };

  useEffect(() => {
    const fetchData = async () => {
      let query = supabase
        .from("azienda_ritiro_veicoli")
        .select(`
        uuid_azienda_ritiro_veicoli,
        ragione_sociale_arv,
        piva_arv
        `, { count: "exact" })
        .order("ragione_sociale_arv", { ascending: false })
        .range(from, to)

      if (dataSearchSubmit) {
        const q = escapeLike(dataSearchSubmit)
        query = query.or(
          `ragione_sociale_arv.ilike.%${q}%,piva_arv.ilike.%${q}%`
        );
      }

      const { data, error, count } = await query
      if (error) {
        console.error("Errore:", error)
        setAziendaRitiroVeicoli([])
        setTotalCount(0)
        return
      }
      setAziendaRitiroVeicoli(data ?? [])
      setTotalCount(count ?? 0)

      // se filtro/pagina porta fuori range, riporta a ultima pagina valida
      if ((count ?? 0) > 0 && page > Math.ceil((count ?? 0) / pageSize)) {
        setPage(1)
      }
    }

    fetchData()
  }, [dataSearchSubmit, page, pageSize, from, to, statusAziende])

  const iconaCestino = <FaUserSlash/>
    
  return (
    <div className={`${onDisplay === 'on' ? '' : 'hidden'}
      w-full h-full
      flex-1 flex flex-col
      md:p-0 md:pe-3 px-4 gap-4`}>
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
              <TableHead className="border-e border-brand text-left truncate">PA</TableHead>
              <TableHead className="text-left truncate">Ragione Sociale</TableHead>
              <TableHead className="truncate">P.Iva</TableHead>
              <TableHead className="border-e border-brand truncate"></TableHead>
              <TableHead className="text-center truncate">R</TableHead>
              <TableHead className="text-center truncate">M</TableHead>
            </TableRow>
          </TableHeader>

<TableBody>
  {aziendaRitiroVeicoli.length ? aziendaRitiroVeicoli.map((a, index) => {
    const uuid = a?.uuid_azienda_ritiro_veicoli ?? String(index);
    const n = countByUuid[uuid] ?? 0; // <-- fallback

    return (
      <TableRow key={uuid}>
        <TableCell className="border-e border-brand w-10">
          <CalcoloPraticheAperte uuidAzienda={uuid} onChange={handleCount} />
          <div className="flex flex-col justify-center items-center w-fit h-fit">
            {n === 0
              ? <div className="flex flex-row items-center justify-center gap-2"><span className="flex items-center justify-center border border-brand rounded-full w-5 h-5 text-[0.6rem]">{n}</span></div>
              : <div className="flex flex-row items-center justify-center gap-2"><span className="flex items-center justify-center border border-red-600 rounded-full w-5 h-5 text-[0.6rem]">{n}</span></div>
            }
          </div>
        </TableCell>

        <TableCell className="font-medium text-left truncate">{a.ragione_sociale_arv}</TableCell>
        <TableCell className="truncate">{a?.piva_arv}</TableCell>
        <TableCell className="border-e border-brand"></TableCell>
        <TableCell className="hover:bg-green-700 text-green-700 hover:text-neutral-200">
          <div className="flex flex-col justify-center items-center w-full h-full">
            <FaFileDownload />
          </div>
        </TableCell>
        <TableCell className="hover:bg-brand/50 text-brand/70 hover:text-neutral-200">
          <div className="flex flex-col justify-center items-center w-full h-full">
            <Link href={`ritiri-demolizioni/${uuid}`}>CLICK</Link>
          </div>
        </TableCell>
      </TableRow>
    );
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
  )
}
