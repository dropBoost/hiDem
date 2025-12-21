'use client'

import { supabase } from "@/lib/supabaseClient"

export default function BTNapprovazionePratica ({uuidPratica, setSUpdateComponent}) {


    async function handleSubmit(value) {

    const payload = {
        demolizione_approvata: value,
    }

    const { data, error } = await supabase
    .from("dati_veicolo_ritirato")
    .update(payload)
    .eq("uuid_veicolo_ritirato", uuidPratica)
    .select()
    .single()

    if (error) {
        console.error(error)
        alert(`Errore salvataggio: ${error.message}`)
        return
    }

    // aggiorno lo stato avanzamento
    // await StatusUpdate(data.uuid_veicolo_ritirato, "3a936e04-5e62-488a-8310-6fa81998fb5b")

    alert("Pratica accettata con successo!")

    }

    function handleChangeTrue(e) {
        e.preventDefault()
        handleSubmit(true)
        setSUpdateComponent(prev=>!prev)

    }
    function handleChangeFalse(e) {
        e.preventDefault()
        handleSubmit(false)
        setSUpdateComponent(prev=>!prev)
    }
    function handleChangeNull(e) {
        e.preventDefault()
        handleSubmit(null)
        setSUpdateComponent(prev=>!prev)
    }

    return (
        <>
        <div className="flex flex-row gap-4 ">
            <button onClick={handleChangeTrue} className="bg-brand hover:bg-neutral-50 hover:text-neutral-900 transition-colors py-1 px-3 rounded-lg text-xs font-semibold">APPROVA</button>
            <button onClick={handleChangeFalse} className="bg-red-800 hover:bg-neutral-50 hover:text-neutral-900 transition-colors py-1 px-3 rounded-lg text-xs font-semibold">RIFIUTA</button>
            <button onClick={handleChangeNull} className="border border-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 transition-colors py-1 px-3 rounded-lg text-xs font-semibold">IN ATTESA</button>
        </div>
        </>
    )
}