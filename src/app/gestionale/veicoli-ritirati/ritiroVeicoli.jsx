'use client'
import { useEffect, useMemo, useState } from 'react'
import comuni from "@/app/componenti/comuni.json"
import { supabase } from "@/lib/supabaseClient"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { FaFacebookSquare } from "react-icons/fa";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { AiOutlineLoading3Quarters, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'

export default function InserimentoVeicoliRitirati({onDisplay, statusAziende, setStatusAziende}) {
  const dataOggi = new Date().toISOString().split("T")[0]

  // VARIABILI GESTIONE INSERIMENTO INDIRIZZO LEGALE
  const [provinciaLegale, setProvinciaLegale] = useState([])
  const [cittaLegale, setCittaLegale] = useState([])
  const [capLegale, setCapLegale] = useState([])
  const [cittaSelezionataLegale, setCittaSelezionataLegale] = useState([])

  // VARIABILI GESTIONE INSERIMENTO INDIRIZZO OPERATIVO
  const [provinciaOperativa, setProvinciaOperativa] = useState([])
  const [cittaOperativa, setCittaOperativa] = useState([])
  const [capOperativa, setCapOperativa] = useState([])
  const [cittaSelezionataOperativa, setCittaSelezionataOperativa] = useState([])

  const [aziendeRitiro, setAziendeRitiro] = useState([])
  const [ruoliUtente, setRuoliUtente] = useState([])
  const [aziendaInserimento, setAziendaInserimento] = useState(true)

  const [sottoscrizioni, setSottoscrizioni] = useState([])
  const [datasetAllenamenti, setDatasetAllenamenti] = useState([])
  const [loadingSchedaAllenamento, setLoadingSchedaAllenamento] = useState(false)
  const [open, setOpen] = useState(false)
  const [statusSend, setStatusSend] = useState(false)
  const [aziendaScelta, setAziendaScelta] = useState("")
  const [modelliAuto, setModelliAuto] = useState([])
  const [marchiAuto, setMarchiAuto] = useState([])
  const [modelloSelect, setModelloSelect] = useState("")
  const [marchioSelect, setMarchioSelect] = useState("")
  const [uploadingByField, setUploadingByField] = useState({});
  const anyUploading = Object.values(uploadingByField).some(Boolean);
  
  const [formData, setFormData] = useState({
    uuid_modello:"",
    targa:"",
    vin: "",
    anno: "",
    cilindrata:"",
    km:"",
    tipologiaDetentore: "",
    formaLegale:"",
    ragioneSociale:"",
    nome:"",
    cognome:"",
    cf:"",
    piva:"",
    tipologiaDocumentoD:"",
    numeroDocumento: "",
    nazionalita:"",
    provincia:"",
    citta: "",
    cap: "",
    indirizzo: "",
    email: "",
    mobile:"",
    documentoVeicolo:"",
    fronteDOCveicolo:"",
    retroDOCveicolo:"",
    fronteDOCdetentore:"",
    retroDOCdetentore:"",
    completato: false,
  })

  const targa = formData.targa
  console.log(formData.targa)

  const province = comuni.flatMap(c => c.sigla)
  const provinceSet = [...new Set(province)].sort()

  // CARICAMENTO RUOLI
  useEffect(() => {
    ;(async () => {
      const { data: ruoliData, error } = await supabase
        .from("rules_user")
        .select("*")
        .order("alias_rules", { ascending: false })

      if (error) {
        console.error(error)
        toast.error("Errore nel caricamento personal Trainer")
        return
      }
      setRuoliUtente(ruoliData ?? [])
    })()
  }, [])

  // CARICAMENTO AZIENDE
  useEffect(() => {
    ;(async () => {
      const { data: aziendeData, error } = await supabase
        .from("azienda_ritiro_veicoli")
        .select("*")
        .order("ragione_sociale_arv", { ascending: false })

      if (error) {
        console.error(error)
        toast.error("Errore nel caricamento Aziende")
        return
      }
      setAziendeRitiro(aziendeData ?? [])
    })()
  }, [])

  const optionsAziendeRitiro = aziendeRitiro.map(ar => ({
    value:ar.uuid_azienda_ritiro_veicoli,
    label:`${ar.ragione_sociale_arv}`,
  }))

  // CARICAMENTO MARCA VEICOLI
  useEffect(() => {
    ;(async () => {
      const { data: marchiAutoData, error } = await supabase
        .from("modello_veicolo")
        .select("marca_veicolo")
        .order("marca_veicolo", { ascending: false })

      if (error) {
        console.error(error)
        toast.error("Errore nel caricamento Marchi Auto")
        return
      }
      setMarchiAuto(marchiAutoData ?? [])
    })()
  }, [])

  const optionsMarcaVeicolo = [
    ...new Set(marchiAuto.map(ma => ma?.marca_veicolo).filter(Boolean))
  ].sort((a, b) => a.localeCompare(b, 'it', { sensitivity: 'base' })).map(marca => ({ value: marca, label: marca }))

  // CARICAMENTO MODELLO VEICOLI
  useEffect(() => {
    if (!marchioSelect){
      return
    }
    ;(async () => {
      const { data: modelliAutoData, error } = await supabase
        .from("modello_veicolo")
        .select("marca_veicolo,modello_veicolo,uuid_modello_veicolo")
        .eq("marca_veicolo", marchioSelect)

      if (error) {
        console.error(error)
        toast.error("Errore nel caricamento Modelli Marchio Auto")
        return
      }
      setModelliAuto(modelliAutoData ?? [])
    })()
  }, [marchioSelect])

  const optionsModelliMarchio = modelliAuto.sort((a, b) => a.modello_veicolo.localeCompare(b.modello_veicolo, 'it', { sensitivity: 'base' })).map(m => ({
    value: `${m.uuid_modello_veicolo}`,
    label: `${m.modello_veicolo}`
  }))

  console.log("formdata",formData)
  // SELECT OPTION
  const tipologiaDetentoreOption = [
    { label:'Proprietario', value:'proprietario' },
    { label:'Delegato', value:'delegato' }
  ]
  const formaLegaleOption = [
    { label:'Privato', value:'privato' },
    { label:'Azienda', value:'azienda' }
  ]
  const tipologiaDocumentoOption = [
    { label:'Patente di Guida', value:'patente' },
    { label:'Carta Identità', value:'cie' },
    { label:'Passaporto', value:'passaporto' },
    { label:'Altro', value:'altro' }
  ]
  const nazionalitaDetentoreOption = [
    { label:'Italiana', value:'it' },
    { label:'Europea', value:'eu' },
    { label:'Altro', value:'altro' }
  ]
  const tipologiaDocumentoVeicoloOption = [
    { label:'Libretto', value:'libretto' },
    { label:'Denuncia', value:'denuncia' }
  ]
  // DATI SEDE LEGALE
  useEffect(() => {
    const cittaFiltrata = comuni
      .filter(c => c.sigla === provinciaLegale)
      .map(c => c.nome)
      .sort((a, b) => a.localeCompare(b))
    setCittaLegale(cittaFiltrata)
  }, [provinciaLegale])

  useEffect(() => {
    const capFiltrati = comuni
      .filter(c => c.nome === cittaSelezionataLegale)
      .flatMap(c => c.cap)
      .sort((a, b) => a.localeCompare(b))
    setCapLegale(capFiltrati)
  }, [cittaSelezionataLegale])

  function handleChangeProvinciaLegale(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setProvinciaLegale(value)
  }
  function handleChangeCittaLegale(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setCittaSelezionataLegale(value)
  }
  function handleChangeCapLegale(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setCapLegale([value])
  }

  // DATI SEDE OPERATIVA
  useEffect(() => {
    const cittaFiltrata = comuni
      .filter(c => c.sigla === provinciaOperativa)
      .map(c => c.nome)
      .sort((a, b) => a.localeCompare(b))
    setCittaOperativa(cittaFiltrata)
  }, [provinciaOperativa])

  useEffect(() => {
    const capFiltrati = comuni
      .filter(c => c.nome === cittaSelezionataOperativa)
      .flatMap(c => c.cap)
      .sort((a, b) => a.localeCompare(b))
    setCapOperativa(capFiltrati)
  }, [cittaSelezionataOperativa])

  function handleChange(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  function handleChangeNumerico(e) {
    const { name, value } = e.target
    const digitsOnly = value.trim().replace(/\D/g, "")
    setFormData(prev => ({ ...prev, [name]: digitsOnly }))
  }
  function handleChangePiva(e) {
    const { name, value } = e.target
    const digitsOnly = value.trim().replace(/\D/g, "").slice(0, 11).toUpperCase()
    setFormData(prev => ({ ...prev, [name]: digitsOnly }))
  }
  function handleChangeRagioneSociale(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value.toUpperCase() })
  }
  function handleChangeMarcaVeicolo(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setMarchioSelect(value)
  }
  function handleChangeModelloVeicolo(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setModelloSelect(value)
  }
function handleChangeUpload(e) {
  const { name, files } = e.target || {};
  const first = Array.isArray(files) ? files[0] : undefined;
  if (!name) return;
  if (!first) {
    console.warn(`[handleChangeUpload] nessun file caricato per ${name}`);
    return;
  }
  // salva il path nel campo giusto (es. fronteDOCveicolo, retroDOCdetentore, …)
  setFormData(prev => ({ ...prev, [name]: first.url || '' }));
}
  function handleBusyChange(nomeCampo, isBusy) {
    setUploadingByField(prev => ({ ...prev, [nomeCampo]: isBusy }));
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const payload = {
      uuid_azienda_ritiro_veicoli: aziendaScelta || null,
      uuid_modello_veicolo: modelloSelect || null,
      anno_veicolo_ritirato: formData.anno || null,
      cilindrata_veicolo_ritirato:formData.cilindrata,
      vin_veicolo_ritirato:formData.vin,
      targa_veicolo_ritirato: formData.targa || null,
      km_veicolo_ritirato: formData.km || null,
      tipologia_detentore: formData.tipologiaDetentore || null,
      forma_legale_detentore:formData.formaLegale,
      ragione_sociale_detentore: formData.ragioneSociale || null,
      nome_detentore: formData.nome || null,
      cognome_detentore: formData.cognome || null,
      cf_detentore: formData.cf || null,
      piva_detentore: formData.piva || null,
      tipologia_documento_detentore: formData.tipologiaDocumentoD || null,
      numero_documento_detentore: formData.numeroDocumento || null,
      nazionalita_documento_detentore: formData.nazionalita || null,
      email_detentore: formData.email || null,
      mobile_detentore: formData.mobile || null,
      cap_detentore: formData.cap || null,
      provincia_detentore: formData.provincia || null,
      indirizzo_detentore: formData.indirizzo || null,
      citta_detentore: formData.citta || null,
      tipologia_documento_veicolo_ritirato: formData.documentoVeicolo || null,
      foto_documento_veicolo_ritirato_f: formData.fronteDOCveicolo || null,
      foto_documento_veicolo_ritirato_r: formData.retroDOCveicolo || null,
      foto_documento_detentore_f: formData.fronteDOCdetentore || null,
      foto_documento_detentore_r: formData.retroDOCdetentore || null,
      ritiro_completato: formData.completato,
    }

    if (formData.email === "" ){
      alert("Campi Vuoti")
    } 
    // else if (formData.piva.length !== 11) {
    //   alert("Partita IVA Non corretta")
    // } 
    else {
      const { data, error } = await supabase.from("dati_veicolo_ritirato").insert(payload).select().single()
      if (error) {
        console.error(error)
        alert(`Errore salvataggio: ${error.message}`)
        return
      } else {
        setFormData({
          uuid_modello:"",
          targa:"",
          vin: "",
          anno: "",
          cilindrata:"",
          km:"",
          tipologiaDetentore: "",
          formaLegale:"",
          ragioneSociale:"",
          nome:"",
          cognome:"",
          cf:"",
          piva:"",
          tipologiaDocumentoD:"",
          numeroDocumento: "",
          nazionalita:"",
          provincia:"",
          citta: "",
          cap: "",
          indirizzo: "",
          email: "",
          mobile:"",
          documentoVeicolo:"",
          fronteDOCveicolo:"",
          retroDOCveicolo:"",
          fronteDOCdetentore:"",
          retroDOCdetentore:"",
          completato: false,
        })
        setStatusAziende(prev => !prev)
      }
      console.log("Inserito:", data)
      alert("Azienda Inserita con successo!")
    }
  }

  console.log("formData", formData)

  return (
    <>
      <div className={`${onDisplay === 'on' ? '' : 'hidden'} w-full flex-1 min-h-full flex flex-col`}>
          <form onSubmit={handleSubmit} className="grid h-full grid-cols-12 gap-4">
            <div className="col-span-12">
                <h4 className="text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl">AZIENDA RITIRO VEICOLO</h4>
            </div>
            <div className='grid grid-cols-12 gap-4 p-6 col-span-12 rounded-2xl shadow-lg min-w-0 h-full bg-brand/50'>
              <div className="col-span-12 lg:col-span-3 min-w-0">
                <label className="block text-sm font-semibold mb-1">Azienda Ritiro</label>
                <Popover open={open} onOpenChange={setOpen} className="w-full">
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full min-w-0 justify-between outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background data-[state=open]:ring-2 data-[state=open]:ring-ring data-[state=open]:ring-offset-2">
                      {aziendaScelta ? optionsAziendeRitiro.find((ar) => ar.value === aziendaScelta)?.label  : "seleziona un azienda..."}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" sideOffset={4} className="p-0 w-[var(--radix-popover-trigger-width)]">
                    <Command className="p-1">
                      <CommandInput placeholder="Cerca..." className="h-8 focus:ring-1 focus:ring-brand focus:border-brand outline-none focus:outline-none my-2" />
                      <CommandList className="my-1">
                        <CommandEmpty>Nessun risultato</CommandEmpty>
                        <CommandGroup>
                          {optionsAziendeRitiro.map((opt) => (
                            <CommandItem
                              key={opt.value}
                              value={`${opt.value}`}
                              onSelect={() => { setAziendaScelta(opt.value); setOpen(false) }}
                            >
                              {opt.label}
                              <Check className={cn("ml-auto", optionsAziendeRitiro === opt.value ? "opacity-100" : "opacity-0")} />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <FormSelectRuoli nome="marca" label='Marca' value={formData.marca} colspan="col-span-10" mdcolspan="lg:col-span-2" onchange={handleChangeMarcaVeicolo} options={optionsMarcaVeicolo}/>
              <FormSelectRuoli nome="uuid_modello" label='Modello' value={formData.uuid_modello} colspan="col-span-10" mdcolspan="lg:col-span-2" onchange={handleChangeModelloVeicolo} options={optionsModelliMarchio}/>
            </div>

            <div className="col-span-12">
              <h4 className="text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl">SPECIFICHE VEICOLO</h4>
            </div>
            <div className='grid grid-cols-12 gap-4 p-6 col-span-12 rounded-2xl shadow-lg min-w-0 h-full bg-white dark:bg-neutral-900'>
              <FormField nome="targa" label='Targa' value={formData.targa} colspan="col-span-6" mdcolspan="lg:col-span-2" onchange={handleChange} type='text'/>
              <FormField nome="vin" label='VIN' value={formData.vin} colspan="col-span-6" mdcolspan="lg:col-span-4" onchange={handleChange} type='text'/>
              <FormField nome="anno" label='Anno' value={formData.anno} colspan="col-span-12" mdcolspan="lg:col-span-2" onchange={handleChange} type='text'/>
              <FormField nome="cilindrata" label='Cilindrata' value={formData.cilindrata} colspan="col-span-6" mdcolspan="lg:col-span-2" onchange={handleChange} type='text'/>
              <FormField nome="km" label='KM' value={formData.km} colspan="col-span-6" mdcolspan="lg:col-span-2" onchange={handleChange} type='text'/>
            </div>

            <div className="col-span-12">
              <h4 className="text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl">DETENTORE</h4>
            </div>
            <div className='grid grid-cols-12 gap-4 p-6 col-span-12 rounded-2xl shadow-lg min-w-0 h-full bg-white dark:bg-neutral-900'>
              <FormSelectRuoli nome="tipologiaDetentore" label='Tipologia Detentore' value={formData.tipologiaDetentore} colspan="col-span-10" mdcolspan="lg:col-span-3" onchange={handleChange} options={tipologiaDetentoreOption}/>
              <FormSelectRuoli nome="formaLegale" label='Forma Legale' value={formData.formaLegale} colspan="col-span-10" mdcolspan="lg:col-span-3" onchange={handleChange} options={formaLegaleOption}/>
              <FormField nome="ragioneSociale" label='Ragione Sociale' value={formData.ragioneSociale} colspan="col-span-6" mdcolspan="lg:col-span-6" onchange={handleChangeRagioneSociale} type='text'/>
              <FormField nome="nome" label='Nome' value={formData.nome} colspan="col-span-6" mdcolspan="lg:col-span-3" onchange={handleChange} type='text'/>
              <FormField nome="cognome" label='Cognome' value={formData.cognome} colspan="col-span-6" mdcolspan="lg:col-span-3" onchange={handleChange} type='text'/>
              <FormField nome="cf" label='Codice Fiscale' value={formData.cf} colspan="col-span-6" mdcolspan="lg:col-span-3" onchange={handleChange} type='text'/>
              <FormField nome="piva" label='Partita IVA' value={formData.piva} colspan="col-span-6" mdcolspan="lg:col-span-3" onchange={handleChangePiva} type='text'/>
              <FormSelectRuoli nome="tipologiaDocumentoD" label='Tipologia Documento' value={formData.tipologiaDocumentoD}  colspan="col-span-10" mdcolspan="lg:col-span-3" onchange={handleChange} options={tipologiaDocumentoOption}/>
              <FormField nome="numeroDocumento" label='Numero Documento' value={formData.numeroDocumento} colspan="col-span-6" mdcolspan="lg:col-span-2" onchange={handleChange} type='text'/>
              <FormSelectRuoli nome="nazionalita" label='Nazionalità' value={formData.nazionalita} colspan="col-span-10" mdcolspan="lg:col-span-2" onchange={handleChange} options={nazionalitaDetentoreOption}/>
              <FormSelect nome="provincia" label='Provincia' value={formData.provincia} colspan="col-span-3" mdcolspan="lg:col-span-2" onchange={handleChangeProvinciaLegale} options={provinceSet}/>
              <FormSelect nome="citta" label='Città' value={formData.citta} colspan="col-span-5" mdcolspan="lg:col-span-2" onchange={handleChangeCittaLegale} options={cittaLegale}/>
              <FormSelect nome="cap" label='Cap' value={formData.cap} colspan="col-span-4" mdcolspan="lg:col-span-1" onchange={handleChangeCapLegale} options={capLegale}/>
              <FormField nome="indirizzo" label='Indirizzo' value={formData.indirizzo} colspan="col-span-12" mdcolspan="lg:col-span-12" onchange={handleChange} type='text'/>
            </div>

            <div className="col-span-12">
              <h4 className="text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl">CONTATTI</h4>
            </div>
            <div className='grid grid-cols-12 gap-4 p-6 col-span-12 rounded-2xl shadow-lg min-w-0 h-full bg-white dark:bg-neutral-900'>
              <FormField nome="email" label='Email' value={formData.email} colspan="col-span-6" mdcolspan="lg:col-span-3" onchange={handleChange} type='email'/>
              <FormField nome="mobile" label='Mobile' value={formData.mobile} colspan="col-span-6" mdcolspan="lg:col-span-3" onchange={handleChange} type='tel'/>
            </div>

            <div className="col-span-12">
              <h4 className="text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl">DOCUMENTI</h4>
            </div>
            <div className='grid grid-cols-12 gap-4 p-6 col-span-12 rounded-2xl shadow-lg min-w-0 h-full bg-white dark:bg-neutral-900'>
              <FormSelectRuoli nome="documentoVeicolo" label='Documento Veicolo' value={formData.documentoVeicolo} colspan="col-span-10" mdcolspan="lg:col-span-12" onchange={handleChange} options={tipologiaDocumentoVeicoloOption}/>
            </div>

            <div className={formData.targa.length === 7 ? "col-span-12" : "hidden"}>
              <h4 className="text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl">FOTO</h4>
            </div>

            <div className={formData.targa.length === 7 ? 'grid grid-cols-12 gap-4 p-6 col-span-12 rounded-2xl shadow-lg min-w-0 min-h-0 bg-white dark:bg-neutral-900' : `hidden`}>
              <FormFileUpload
                nome="fronteDOCveicolo"
                label="Documento Veicolo - Fronte"
                bucket="documentiveicoli"
                accept="image/*"
                campo="DOCVEICFronte"
                colspan="col-span-12"
                mdcolspan="lg:col-span-3"
                targa={formData.targa}
                makePublic={true}
                onchange={handleChangeUpload}
                onBusyChange={handleBusyChange}
              />
              <FormFileUpload
                nome="retroDOCveicolo"
                label="Documento Veicolo - Retro"
                bucket="documentiveicoli"
                accept="image/*"
                campo="DOCVEICRetro"
                colspan="col-span-12"
                mdcolspan="lg:col-span-3"
                targa={formData.targa}
                makePublic={true}
                onchange={handleChangeUpload}
                onBusyChange={handleBusyChange}
              />
              <FormFileUpload
                nome="fronteDOCdetentore"
                label="Documento Detentore - Fronte"
                bucket="documentidetentori"
                accept="image/*"
                campo="DOCDETENTFronte"
                colspan="col-span-12"
                mdcolspan="lg:col-span-3"
                targa={formData.targa}
                makePublic={true}
                onchange={handleChangeUpload}
                onBusyChange={handleBusyChange}
              />
              <FormFileUpload
                nome="retroDOCdetentore"
                label="Documento Detentore - Retro"
                bucket="documentidetentori"
                accept="image/*"
                campo="DOCDETENTFronte"
                colspan="col-span-12"
                mdcolspan="lg:col-span-3"
                targa={formData.targa}
                makePublic={true}
                onchange={handleChangeUpload}
                onBusyChange={handleBusyChange}
              />
            </div>

            <div className="col-span-12 flex justify-end">
              <button
                type="submit"
                disabled={anyUploading}
                className="border border-brand hover:bg-brand text-white px-6 py-1 text-xs rounded-xl font-semibold transition disabled:opacity-60"
              >
                {anyUploading ? "Caricamento in corso..." : "Inserisci"}
              </button>
            </div>
          </form>
      </div>
    </>
  )
}

export function FormField ({colspan, mdcolspan, nome,label, value, onchange, type}) {
  return (
    <div className={`${colspan} ${mdcolspan} min-w-0`}>
      <Label htmlFor={nome}>{label}</Label>
      <Input
        type={type}
        id={nome}
        placeholder={label}
        name={nome}
        value={value}
        onChange={onchange}
        className="w-full min-w-0 appearance-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:border-brand"
      />
    </div>
  )
}

export function FormSelect({ colspan, mdcolspan, nome, label, value, onchange, options = [] }) {
  const handleValueChange = (val) => {
    onchange?.({ target: { name: nome, value: val } })
  }
  return (
    <div className={`${colspan} ${mdcolspan} min-w-0`}>
      <label className="block text-sm font-semibold mb-1" htmlFor={nome}>{label}</label>
      <Select value={value ?? ""} onValueChange={handleValueChange}>
        <SelectTrigger id={nome} className=" rounded-lg">
          <SelectValue placeholder={`-- Seleziona ${label} --`} />
        </SelectTrigger>
        <SelectContent position="popper" className="z-[70]">
          <SelectGroup>
            {options.map((opt, idx) => (
              <SelectItem key={idx} value={String(opt)} className="data-[state=checked]:bg-brand data-[state=checked]:text-foreground focus:bg-brand">
                {String(opt)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <input type="hidden" name={nome} value={value ?? ""} />
    </div>
  )
}

export function FormCheckBox({ colspan, mdcolspan, nome, label, value, onchange }) {
  return (
    <div className={`${colspan} ${mdcolspan} min-w-0 flex flex-col md:flex-col items-start md:items-start justify-between gap-2`}>
      <Label htmlFor={nome}>{label}</Label>
      <div className="flex justify-start items-center h-full w-full">
        <Checkbox
          id={nome}
          checked={!!value}
          onCheckedChange={(checked) => {
            const bool = checked === true
            onchange?.({ target: { name: nome, checked: bool } })
          }}
          className="h-4 w-4 shrink-0 rounded border border-gray-400 data-[state=checked]:bg-brand data-[state=checked]:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        />
      </div>
      <input type="hidden" name={nome} value={value ? 'true' : 'false'} />
    </div>
  )
}

export function FormSelectRuoli({ colspan, mdcolspan, nome, label, value, onchange, options = [] }) {
  const handleValueChange = (val) => {
    onchange?.({ target: { name: nome, value: val } })
  }
  return (
    <div className={`${colspan ?? ""} ${mdcolspan ?? ""} min-w-0`}>
      <label className="block text-sm font-semibold mb-1" htmlFor={nome}>{label}</label>
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

export function FormFileUpload({
  targa = '',
  colspan,
  mdcolspan,
  campo = '',
  nome,
  label,
  bucket,
  pathPrefix = 'public',      // usa "public" di default per rispettare le policy di read
  accept = '',
  multiple = false,
  maxSizeMB = 15,
  makePublic = true,
  signedUrlSeconds = 3600,
  onchange,
  onBusyChange,
  helpText = '',
}) {
  const [queue, setQueue] = useState([]);      // solo per UI: [{file, status, path?, url?, err?, tooBig?}]
  const [previews, setPreviews] = useState([]); // preview locali

  if (!bucket) console.error('FormFileUpload: prop "bucket" è obbligatoria.');

  const bytesToMB = (b) => (b / (1024 * 1024)).toFixed(2);
  const slugify = (s) =>
    String(s).normalize('NFKD').replace(/[^\w.\-]+/g, '-').replace(/-+/g, '-').toLowerCase();

  useEffect(() => {
    return () => previews.forEach(p => URL.revokeObjectURL(p.url));
  }, [previews]);

  async function bucketExists(name) {
    const { error } = await supabase.storage.from(name).list('', { limit: 1 });
    if (error) {
      console.error(`[bucketExists] "${name}" non accessibile:`, error.message);
      return false;
    }
    return true;
  }

  async function uploadOne(file, idx, finalPath) {
    try {
      // segna “uploading” per UI
      setQueue(q => q.map((it, i) => (i === idx ? { ...it, status: 'uploading' } : it)));

      const { error: upErr } = await supabase
        .storage
        .from(bucket)
        .upload(finalPath, file, {
          cacheControl: '3600',
          upsert: true, // metti false se NON vuoi sovrascrivere
          contentType: file.type || 'application/octet-stream',
        });

      if (upErr) {
        console.error('[uploadOne] storage.upload error:', upErr.message);
        setQueue(q => q.map((it, i) => (i === idx ? { ...it, status: 'error', err: upErr } : it)));
        return null;
      }

      let url = '';
      if (makePublic) {
        const { data: pub, error: pubErr } = supabase.storage.from(bucket).getPublicUrl(finalPath);
        if (pubErr) {
          console.warn('[uploadOne] getPublicUrl warning:', pubErr.message);
        }
        url = pub?.publicUrl || '';
      } else {
        const { data: signed, error: sErr } =
          await supabase.storage.from(bucket).createSignedUrl(finalPath, parseInt(signedUrlSeconds, 10));
        if (s_err) {
          console.error('[uploadOne] createSignedUrl error:', sErr?.message || sErr);
        } else {
          url = signed?.signedUrl || '';
        }
      }

      setQueue(q => q.map((it, i) => (i === idx ? { ...it, status: 'done', path: finalPath, url } : it)));
      return { path: finalPath, url, name: file.name, size: file.size, type: file.type };
    } catch (e) {
      console.error('[uploadOne] catch:', e);
      setQueue(q => q.map((it, i) => (i === idx ? { ...it, status: 'error', err: e } : it)));
      return null;
    }
  }

  async function handleFilesSelected(e) {
    const list = e.target.files || [];
    const files = Array.from(list);
    if (!files.length) return;

    onBusyChange?.(nome, true);

    // pre-check bucket
    const ok = await bucketExists(bucket);
    if (!ok) {
      onBusyChange?.(nome, false);
      return;
    }

    const maxBytes = maxSizeMB * 1024 * 1024;
    const initial = files.map(f => ({
      file: f,
      tooBig: f.size > maxBytes,
      status: f.size > maxBytes ? 'error' : 'pending',
    }));

    // preview
    setPreviews(prev => {
      prev.forEach(p => URL.revokeObjectURL(p.url));
      return files
        .filter(f => f.type?.startsWith('image/'))
        .map(f => ({ name: f.name, url: URL.createObjectURL(f) }));
    });
    setQueue(initial);

    // genera nomi finali e carica
    const today = new Date();
    const date = `${String(today.getDate()).padStart(2,'0')}${String(
      today.getMonth() + 1
    ).padStart(2,'0')}${today.getFullYear()}`;
    const safeTarga = slugify(targa || 'no-targa');
    const safeCampo = slugify(campo || 'file');
    const base = pathPrefix ? `${String(pathPrefix).replace(/\/+$/, '')}/` : '';

    const uploadedResults = [];
    for (let i = 0; i < initial.length; i++) {
      const it = initial[i];
      if (it.tooBig) {
        console.warn(`[upload] "${it.file.name}" supera ${maxBytes / (1024*1024)}MB`);
        continue;
      }
      const ext = (it.file.name.split('.').pop() || 'jpg').toLowerCase();
      const finalPath = `${base}${safeTarga}-${date}-${safeCampo}${multiple ? `-${i+1}` : ''}.${ext}`;
      console.log(`📤 Upload → bucket=${bucket}, path=${finalPath}`);

      const res = await uploadOne(it.file, i, finalPath);
      if (res) uploadedResults.push(res);
    }

    console.log('[FormFileUpload] uploaded ->', { nome, uploaded: uploadedResults });
    // Notifica il parent (abbiamo i path reali)
    onchange?.({ target: { name: nome, files: uploadedResults } });

    onBusyChange?.(nome, false);
  }

  return (
    <div className={targa.length === 7 ? cn(colspan ?? '', mdcolspan ?? '', 'min-w-0') : `hidden`}>
      <Label htmlFor={nome}>{label}</Label>

      <Input
        id={nome}
        name={nome}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFilesSelected}
        className="
          w-full min-w-0
          file:mr-3 file:rounded-lg file:border file:px-3 file:py-1 file:text-xs
          file:bg-brand file:text-white file:border-brand
          hover:file:opacity-90
          focus:outline-none
          focus-visible:ring-2 focus-visible:ring-brand
          focus-visible:ring-offset-2
        "
      />

      {helpText && <p className="mt-1 text-xs text-muted-foreground">{helpText}</p>}
      <p className="mt-1 text-[0.65rem] text-neutral-500">
        Max {maxSizeMB} MB per file{multiple ? ' (no. multipli consentiti)' : ''}
      </p>

      {queue.length > 0 && (
        <div className="mt-3 space-y-2">
          {queue.map((item, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border p-2 text-sm">
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium">{item.file.name}</div>
                <div className="text-xs text-neutral-500">
                  {bytesToMB(item.file.size)} MB • {item.file.type || 'file'}
                </div>
              </div>
              <div className="ml-3 w-28 flex items-center justify-end">
                {item.status === 'pending'   && <span className="text-xs">in coda…</span>}
                {item.status === 'uploading' && (
                  <div className="flex items-center gap-1 text-xs">
                    <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" />
                    <span>carico…</span>
                  </div>
                )}
                {item.status === 'done'      && (
                  <div className="flex items-center gap-1 text-green-600">
                    <AiOutlineCheck className="h-4 w-4" />
                    <span>ok</span>
                  </div>
                )}
                {item.status === 'error'     && (
                  <div className="flex items-center gap-1 text-red-600">
                    <AiOutlineClose className="h-4 w-4" />
                    <span>errore</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {previews.length > 0 && (
        <div className="mt-3 grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
          {previews.map((p, i) => (
            <div key={i} className="w-36 border rounded-lg p-2 bg-neutral-50 dark:bg-neutral-900">
              <div className="aspect-video overflow-hidden rounded">
                <img src={p.url} alt={p.name} className="h-full w-full object-cover" />
              </div>
              <div className="mt-1 truncate text-[0.7rem]">{p.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
