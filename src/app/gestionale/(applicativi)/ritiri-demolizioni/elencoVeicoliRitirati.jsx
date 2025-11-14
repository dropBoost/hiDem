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
import { RiEyeCloseLine } from "react-icons/ri";
import DisplayInfoPratiche from "./componenti/displayInfoPratiche";

export default function ElencoVeicoliRitirati({ onDisplay, statusAziende, setStatusAziende }) {
  const [aziendaRitiroVeicoli, setAziendaRitiroVeicoli] = useState([])
  const [countByUuid, setCountByUuid] = useState({});
  const [praticheAperte, setPraticheAperte] = useState([])
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

  //PRATICHE APERTE
  useEffect(() => {
    if (!aziendaRitiroVeicoli) return;

    (async () => {
      const { data, error } = await supabase
        .from("v_pratiche_aperte_per_azienda")
        .select("*")

      if (error) {
        console.error(error);
        return;
      }

      setPraticheAperte(data);

    })();

  }, []);

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

      <div className="flex flex-col gap-3">
        {aziendaRitiroVeicoli.length ? aziendaRitiroVeicoli.map((a, index) => {
          
          const n = praticheAperte?.filter(ua => ua.uuid_azienda_ritiro_veicoli == a?.uuid_azienda_ritiro_veicoli).map(pa => (pa.pratiche_aperte))
          const uuid = a?.uuid_azienda_ritiro_veicoli ?? String(index);

          return (
            <DisplayInfoPratiche key={uuid} ragioneSociale={a?.ragione_sociale_arv} piva={a?.piva_arv} uuid={uuid} n={n}/>
          );
        }) : (
            <span colSpan={8} className="h-24 text-center">Nessun risultato.</span>
        )}
      </div>      
    </div>
  )
}
