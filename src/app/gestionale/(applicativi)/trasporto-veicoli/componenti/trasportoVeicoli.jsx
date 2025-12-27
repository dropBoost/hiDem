'use client'
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaPlusSquare, FaCar, FaMinusSquare } from "react-icons/fa";
import { useAdmin } from "@/app/admin/components/AdminContext"
import TargaDesign from "@/app/componenti/targaDesign"
import ButtonDeletePratica from "@/app/componenti/buttonDeletePratica"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup} from "@/components/ui/select"

export default function SECTIONtrasportoVeicoli({onDisplay, setStatusAziende}) {

    const utente = useAdmin()
    const role = utente?.utente?.user_metadata.ruolo
    const uuidUtente = utente?.utente?.id
    const [updateList, setUpdateList] = useState(true)
    const [veicoliDaRitirare, setVeicoliDaRitirare] = useState([])
    const [veicoliRitirati, setVeicoliRitirati] = useState([])
    const [camion, setCamion] = useState([])
    const [autisti, setAutisti] = useState([])
    const [formData, setFormData] = useState({
        camionRitiro: '',
        autistaRitiro: '',
        filtroData:dataOggiItalia(),
    })
    const isAdmin = role === "admin" || role === "superadmin"
    const isTrasporter = role === "transporter"
    const isCompany = role === "company"

    //GESTIONE DATA PER QUERY

    function dataOggiItalia() {
        return new Intl.DateTimeFormat("en-CA", {
            timeZone: "Europe/Rome",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(new Date())
    }

    function toUtcIsoFromRomeLocal(dateStr, timeStr = "00:00:00") {
        if (!dateStr || typeof dateStr !== "string") return null

        const partsDate = dateStr.split("-")
        if (partsDate.length !== 3) return null

        const [y, m, d] = partsDate.map(Number)
        if (!y || !m || !d) return null

        const [hh, mm, ss] = timeStr.split(":").map(Number)

        const naiveUtc = new Date(Date.UTC(y, m - 1, d, hh, mm, ss))

        const fmt = new Intl.DateTimeFormat("en-GB", {
            timeZone: "Europe/Rome",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hourCycle: "h23",
        })

        const parts = Object.fromEntries(fmt.formatToParts(naiveUtc).map(p => [p.type, p.value]))
        const romeAsIfUtc = Date.UTC(
            Number(parts.year),
            Number(parts.month) - 1,
            Number(parts.day),
            Number(parts.hour),
            Number(parts.minute),
            Number(parts.second)
        )

        const offsetMs = romeAsIfUtc - naiveUtc.getTime()
        return new Date(naiveUtc.getTime() - offsetMs).toISOString()
    }

    function addOneDay(dateStr) {
        if (!dateStr || typeof dateStr !== "string") return null

        const m = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/)
        if (!m) return null

        const y = Number(m[1])
        const mo = Number(m[2])
        const d = Number(m[3])

        const dt = new Date(Date.UTC(y, mo - 1, d))
        dt.setUTCDate(dt.getUTCDate() + 1)

        return dt.toISOString().slice(0, 10)
    }

    //GESTIONE FORM
    function handleChange(e) {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    //CARICAMENTO VEICOLI DA RITIRARE
    useEffect(() => {

        if (!role) return
        if ((!isAdmin || !isTrasporter || isCompany) && !uuidUtente) return

        const fetchData = async () => {
            let query = supabase
            .from("dati_veicolo_ritirato")
            .select(`*,
                aziendaRitiro:azienda_ritiro_veicoli(ragione_sociale_arv)
                )`)
            .eq("pratica_completata", false)
            .eq("demolizione_approvata", true)
            .eq("veicolo_ritirato", false)

            if (isCompany) {
            query = query.eq("uuid_azienda_ritiro_veicoli", uuidUtente)
            }

            const { data, error } = await query

            if (error) {
            console.error(error)
            return
            }

            setVeicoliDaRitirare(data ?? [])
        }

        fetchData()

    }, [role, uuidUtente, updateList])

    //CARICAMENTO VEICOLI RITIRATI
    useEffect(() => {
        if (!role) return
        if ((!isAdmin || !isTrasporter || isCompany) && !uuidUtente) return
        if (!formData.filtroData) return

        const day = formData.filtroData
        if (!day) return

        const nextDayStr = addOneDay(day)
        if (!nextDayStr) return

        const startIso = toUtcIsoFromRomeLocal(day, "00:00:00")
        const endIso = toUtcIsoFromRomeLocal(nextDayStr, "00:00:00")
        if (!startIso || !endIso) return

        const fetchData = async () => {
            let query = supabase
            .from("log_trasporto_veicolo")
            .select(`*, veicoloRitirato:dati_veicolo_ritirato(targa_veicolo_ritirato,uuid_azienda_ritiro_veicoli,aziendaRitiro:azienda_ritiro_veicoli(ragione_sociale_arv))`)
            .eq("veicolo_consegnato", false)
            .gte("created_at_log_trasporto_veicolo", startIso)
            .lt("created_at_log_trasporto_veicolo", endIso)

            if (isTrasporter) {
            query = query.eq("uuid_autista_ctv", uuidUtente)
            }

            const { data, error } = await query

            if (error) {
            console.error(error)
            return
            }

            setVeicoliRitirati(data ?? [])
        }

        fetchData()
    }, [role, uuidUtente, updateList, formData.filtroData])

    //CARICAMENTO CAMION
    useEffect(() => {

        (async () => {
        const { data, error } = await supabase
            .from("camion_trasporto_veicoli")
            .select("*")
            .eq("attivo_camion", true)

        if (error) {
            console.error(error);
            return;
        }

        setCamion(data);

        })();

    }, []);

    const optionCamion = (camion ?? []).map(c => ({
    value: c.uuid_camion_trasporto_veicoli,
    label: c.targa_camion,
    }))

    //CARICAMENTO AUTISTI
    useEffect(() => {

        if (!role) return
        if ((!isAdmin && !uuidUtente) || (!isTrasporter && !uuidUtente)) return

        const fetchData = async () => {
            let query = supabase
            .from("autista_camion_trasporto_veicoli")
            .select("*")
            .eq("attivo_autista", true)

            if (isTrasporter) {
            query = query.eq("uuid_autista_ctv", uuidUtente)
            }

            const { data, error } = await query

            if (error) {
            console.error(error)
            return
            }

            setAutisti(data ?? [])
        }

        fetchData()

    }, [role, uuidUtente])

    const optionAutisti = (autisti ?? []).map(c => ({
    value: c.uuid_autista_ctv,
    label: `${c.cognome_autista} ${c.nome_autista}`,
    }))

    // INSERIMENTO RITIRO VEICOLO
    async function RitiroVeicolo(uuidVeicolo, uuidCamion, uuidAutista) {

        if (!uuidVeicolo) return alert("seleziona un veicolo")
        if (!uuidCamion) return alert("seleziona un camion")
        if (!uuidAutista) return alert("seleziona l'autista")

        const payloadVR = {
            veicolo_ritirato: true,
        }

        const { data: vrData, error: vrError } = await supabase
        .from("dati_veicolo_ritirato")
        .update(payloadVR)
        .eq("uuid_veicolo_ritirato", uuidVeicolo)
        .select()
        .single()

        if (vrError) {
            console.error(vrError)
            alert(`Errore salvataggio: ${vrError.message}`)
            return
        }

        const payloadT = {
            uuid_veicolo_ritirato: uuidVeicolo,
            uuid_camion_tv: uuidCamion,
            uuid_autista_ctv: uuidAutista,
            veicolo_consegnato: false,
        }

        const { data: trasportoData, error: trasportoError } = await supabase
        .from("log_trasporto_veicolo")
        .insert(payloadT)
        .select()
        .single()

        if (trasportoError) {
            console.error(trasportoError)
            alert(`Errore salvataggio: ${trasportoError.message}`)
            return
        }

        setUpdateList(prev => !prev)

    alert("Trasporto Inserito con successo")

    }

    // ELIMINA RITIRO VEICOLO
    async function EliminaRitiro(uuidVeicolo, uuidLog) {

        if (!uuidVeicolo) return alert("seleziona un veicolo")
        if (!uuidLog) return alert("seleziona Log")

        const payloadVR = {
            veicolo_ritirato: false,
        }

        const { data: vrData, error: vrError } = await supabase
        .from("dati_veicolo_ritirato")
        .update(payloadVR)
        .eq("uuid_veicolo_ritirato", uuidVeicolo)
        .select()
        .single()

        if (vrError) {
            console.error(vrError)
            alert(`Errore salvataggio: ${vrError.message}`)
            return
        }


        const { data: trasportoData, error: trasportoError } = await supabase
        .from('log_trasporto_veicolo')
        .delete()
        .eq('uuid_log_trasporto_veicolo', uuidLog)
        .eq('veicolo_consegnato', false)
        .select()
        .single()

        if (trasportoError) {
            console.error(trasportoError)
            alert("Errore eliminazione trasporto")
            return
        }

        setUpdateList(prev => !prev)

    alert("Trasporto Eliminato")

    }

    console.log(veicoliRitirati, "vr")
    return (
        <>
        <div className={`${onDisplay === true ? '' : 'hidden'} w-full h-full`}>
            <div className="flex lg:flex-row flex-col flex-wrap lg:gap-y-3 gap-y-1 w-full min-h-0">
                {/* CRUSCOTTO */}
                <div className="flex flex-row w-full gap-4 min-h-0 p-5 rounded-2xl bg-neutral-950">
                    <div className="flex flex-row justify-between">
                    <h4 className="text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl">CRUSCOTTO</h4>
                    </div>
                </div>
                {/* SELEZIONA CAMION */}
                <div className="flex flex-row justify-between w-full gap-4 min-h-0 p-5 rounded-2xl border">
                    <div className="flex flex-row basis-6/12">
                        <FormSelect nome="camionRitiro" label='Camion' value={formData.camionRitiro} onchange={handleChange} options={optionCamion}/>
                    </div>
                    <div className="flex flex-row basis-6/12">
                        <FormSelect nome="autistaRitiro" label='Autista' value={formData.autistaRitiro} onchange={handleChange} options={optionAutisti}/>
                    </div>
                </div>
                {/* VEICOLI DA RITIRARE */}
                <div className="flex flex-col gap-4 xl:basis-6/12 w-full p-1 h-60 overflow-auto">
                    <div className="flex flex-col border border-brand p-5 rounded-2xl h-full gap-2">
                        <div className="flex flex-row justify-between">
                            <h4 className="text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl">VEICOLI DA RITIRARE</h4>
                        </div>
                        <div className="flex flex-col gap-2">
                            {veicoliDaRitirare?.map((c, i) => (
                                <div key={c.uuid_veicolo_ritirato} className="flex flex-row justify-between border py-2 px-4 rounded-xl">
                                    <div className="flex flex-row items-center gap-3">
                                        <div className="w-36">
                                            <TargaDesign targa={c?.targa_veicolo_ritirato}/>
                                        </div>
                                        <span className="text-xs">{c?.aziendaRitiro?.ragione_sociale_arv}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <ButtonRitiraVeicolo onClick={()=>RitiroVeicolo(c?.uuid_veicolo_ritirato, formData?.camionRitiro, formData?.autistaRitiro)}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* VEICOLI RITIRATI */}
                <div className="flex flex-col gap-2 xl:basis-6/12 w-full p-1 h-60">
                    <div className="flex flex-col border border-brand p-5 rounded-2xl h-full gap-2">
                        <div className="flex flex-row justify-between items-start">
                            <h4 className="h-fit text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl">VEICOLI RITIRATI</h4>
                            <FormField nome="filtroData" label="data" value={formData.filtroData} onchange={handleChange} type="date"/>
                        </div>
                        <div className="flex flex-col gap-2 overflow-auto">
                            {veicoliRitirati?.map((vr, i) => (
                                <div key={vr.uuid_log_trasporto_veicolo} className="flex flex-row justify-between border py-2 px-4 rounded-xl">
                                    <div className="flex flex-row items-center gap-3">
                                        <div className="w-36">
                                            <TargaDesign targa={vr?.veicoloRitirato?.targa_veicolo_ritirato}/>
                                        </div>
                                        <span className="text-xs">{vr?.veicoloRitirato?.aziendaRitiro?.ragione_sociale_arv}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <ButtonEliminaRitira onClick={()=>EliminaRitiro(vr?.uuid_veicolo_ritirato, vr?.uuid_log_trasporto_veicolo)}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>                
                {/* INSERIMENTO CAMION */}
                <div className="flex flex-col gap-4 w-full bg-neutral-950 p-5 rounded-2xl">    
                    ciao
                </div>
                {/* INSERIMENTO AUTISTA */}
                <div className="flex flex-col gap-4 w-full bg-neutral-950 p-5 rounded-2xl">    
                    ciaoii
                </div>
            </div>
        </div>
        </>
    )

}

export function ButtonRitiraVeicolo ( { onClick }) {
    return (
        <>
        <button onClick={onClick}><FaPlusSquare/></button>
        </>
    )
}

export function ButtonEliminaRitira ( { onClick }) {
    return (
        <>
        <button onClick={onClick} className="text-red-500"><FaMinusSquare/></button>
        </>
    )
}

export function FormSelect({ nome, label, value, onchange, options = [] }) {
  const handleValueChange = (val) => {
    onchange?.({ target: { name: nome, value: val } })
  }
  return (
    <div className={`flex flex-col gap-2 w-full`}>
      <label className="text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl uppercase" htmlFor={nome}>{label}</label>
      <Select value={value ?? ""} onValueChange={handleValueChange}>
        <SelectTrigger id={nome} className="w-full rounded-lg">
          <SelectValue placeholder={`-- Seleziona ${label} --`} />
        </SelectTrigger>
        <SelectContent position="popper" className="z-[70]">
          <SelectGroup>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="data-[state=checked]:bg-brand data-[state=checked]:text-foreground focus:bg-brand">
                {opt.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <input type="hidden" name={nome} value={value ?? ""} />
    </div>
  )
}

export function FormField ({ nome, label, value, onchange, type }) {
  return (
    <div className={`w-fit`}>
       <Input
        type={type}
        id={nome}
        placeholder={label}
        name={nome}
        value={value}
        onChange={onchange}
        
        className={`appearance-none rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:border-brand`}
      />
    </div>
  )
}