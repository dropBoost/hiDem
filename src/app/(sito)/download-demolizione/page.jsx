'use client'

import { FormField } from "@/app/componenti-sito/formComponents"
import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default function Download () {

  const [loading, setLoading] = useState(false)
  const [targa, setTarga] = useState("")
  const [codiceFiscale, setCodiceFiscale] = useState("")
  const [veicoloRitirato, setVeicoloRitirato] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    if (name == "targa") {
      setTarga(value.toUpperCase().trim().slice(0, 7))
    } else {
      setCodiceFiscale(value.toUpperCase().trim().slice(0, 16))
    }
  }

  // CARICAMENTO DEMOLIZIONI
  useEffect(() => {
    // se la targa non è completa, non fare query
    if (!targa) return

    ;(async () => {
      const { data, error } = await supabase
        .from("dati_veicolo_ritirato")
        .select(`*`)
        .eq("targa_veicolo_ritirato", `${targa}`)
        .eq("cf_detentore", `${codiceFiscale}`)

      if (error) {
        console.error(error)
        // toast.error("Errore nel caricamento certificati demolizione")
        return
      }

      // qui data è un ARRAY
      setVeicoloRitirato(data ?? [])
    })()
  }, [targa, codiceFiscale])

    return(
        <>
        {/* CONTENUTO PAGINA */}
        <div id="pageContenent" className="w-full">
            <img src={`/download-demolizione.jpg`} alt="test" className="w-full object-cover h-96"/>
            <div className="flex flex-col items-center justify-center bg-neutral-700 p-5">
                <h6 className="font-semibold uppercase">SCARICA LA TUA DEMOLIZIONE</h6>
            </div>
            <div className="flex flex-col items-center px-48 py-10 bg-neutral-300">
                <p className="text-neutral-700">Compila il modulo ed ottieni il certificato di demolizione della tua auto</p>
            </div>
            <div className="flex flex-col items-center justify-center w-full p-28">
                <form className="flex flex-col  gap-3 border border-neutral-200 p-5 rounded-xl shadow-xl w-96">
                    <FormField nome="codiceFiscale" label='Codice Fiscale' value={codiceFiscale} onchange={handleChange} type='text' colorLabel={`text-companyPrimary`}/>
                    <FormField nome="targa" label='Targa' value={targa} onchange={handleChange} type='text' colorLabel={`text-companyPrimary`}/>
                    {veicoloRitirato.length > 0 ?
                    <Link href={`/download-demolizione/${veicoloRitirato[0]?.uuid_veicolo_ritirato}`}>
                        <button className="border border-companyPrimary hover:bg-companyPrimary text-neutral-800 px-6 py-1 text-xs rounded-xl font-semibold transition disabled:opacity-60 lg:w-fit w-full h-8">
                            SCARICA
                        </button>
                    </Link> : "... compila i campi" }
                </form>
            </div>
        </div>
        {/* FINE PAGINA */}
        </>
    )
}