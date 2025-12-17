'use client'
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaPlusSquare, FaCar } from "react-icons/fa";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function SECTIONddtDemolizioni({onDisplay, setStatusAziende}) {
    
  const [uploadingByField, setUploadingByField] = useState({});
  const anyUploading = Object.values(uploadingByField).some(Boolean);
  const [formData, setFormData] = useState({
    camion:"",
    autista:"",
    dataConsegnaDDT: "",
    dataRitiroDDT:"",
    noteDDT:"",
  })
  const [camion, setCamion] = useState([])
  const [autisti, setAutisti] = useState([])

  // CARICAMENTO CAMION
  useEffect(() => {
    ;(async () => {
      const { data: camionData, error } = await supabase
        .from("camion_trasporto_veicoli")
        .select("*")
        .eq("attivo_camion", true)
        .order("targa_camion", { ascending: false })

      if (error) {
        console.error(error)
        toast.error("Errore nel caricamento dei Camion")
        return
      }
      setCamion(camionData ?? [])
    })()
  }, [])

  // CARICAMENTO AUTISTI
  useEffect(() => {
    ;(async () => {
      const { data: autistiData, error } = await supabase
        .from("autista_camion_trasporto_veicoli")
        .select("*")
        .eq("attivo_autista", true)
        .order("cognome_autista", { ascending: true })

      if (error) {
        console.error(error)
        toast.error("Errore nel caricamento degli Autisti")
        return
      }
      setAutisti(autistiData ?? [])
    })()
  }, [])


  const optionCamion = camion?.map(c => ({
    value: c.uuid_camion_trasporto_veicoli,
    label: `${c.targa_camion} | ${c.marca_camion} ${c.modello_camion}` 
  }))

  const optionAutisti = autisti?.map(a => ({
    value: a.uuid_autista_ctv,
    label: `${a.cognome_autista} ${a.nome_autista} | ${a.n_patente_autista}` 
  }))

  function handleChange(e) {
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value.toUpperCase().trim() })
  }

  function handleChangeSelect(e) {
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const payload = {
    uuid_camion_tv: formData.camion,
    uuid_autista_ctv: formData.autista,
    data_ritiro_ddt: formData.dataRitiroDDT || null,
    data_consegna_ddt: formData.dataConsegnaDDT || null,
    note_ddt: formData.noteDDT || null,
    stato_ddt: "attivo",
    }

    if (formData.camion == "" || formData.autista == "" || formData.dataRitiroDDT == "" || formData.dataConsegnaDDT == "" ){
      alert("Campi Vuoti")
    } else {
      const { data, error } = await supabase.from("ddt_trasporto_veicoli").insert(payload).select().single()
      if (error) {
          console.error(error)
          alert(`Errore salvataggio: ${error.message}`)
          return
      } else {
        setFormData({
        camion:"",
        autista: "",
        dataRitiroDDT:"",
        dataConsegnaDDT:"",
        noteDDT:"",
        })
      }
      setStatusAziende(prev => !prev)
      console.log("Inserito:", data)
      alert("DDT inserito con successo!")
    }
  }
  console.log("FF", formData)
  return (
    <>
    <div className={`${onDisplay === true ? '' : 'hidden'} w-full h-full`}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row w-full gap-4 min-h-0">
          <div className="flex flex-col gap-4 basis-4/12 bg-neutral-950 p-5 rounded-2xl">    
            <div className="col-span-12 flex flex-row justify-between">
                <h4 className="text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl">INSERIMENTO DDT</h4>
                <button
                form="inserimentoDDTritiro"
                type="submit"
                disabled={anyUploading}
                className=' bg-brand px-3 py-2 w-fit rounded-xl h-full'>
                {anyUploading ? "Caricamento in corso..." : <FaPlusSquare className='font-bold text-dark dark:text-white'/>}
                </button>
            </div>
            <form id="inserimentoDDTritiro" onSubmit={handleSubmit} className="flex flex-col gap-4 ">
              <FormSelect nome="camion" label='Camion' value={formData.camion} colspan="col-span-10" mdcolspan="lg:col-span-12" onchange={handleChangeSelect} options={optionCamion}/>
              <FormSelect nome="autista" label='Autista' value={formData.autista} colspan="col-span-10" mdcolspan="lg:col-span-12" onchange={handleChangeSelect} options={optionAutisti}/>
              <FormField nome="dataRitiroDDT" label='Data Ritiro' value={formData.dataRitiroDDT} colspan="col-span-12" mdcolspan="lg:col-span-4" onchange={handleChange} type='date'/>
              <FormField nome="dataConsegnaDDT" label='Data Consegna' value={formData.dataConsegnaDDT} colspan="col-span-12" mdcolspan="lg:col-span-4" onchange={handleChange} type='date'/>
              <FormField nome="noteDDT" label='Note' value={formData.noteDDT} colspan="col-span-12" mdcolspan="lg:col-span-4" onchange={handleChange} type='text'/>
            </form>
          </div>
          <div className="flex flex-col gap-4 basis-4/12 border p-5 rounded-2xl">
            <div className="col-span-12 flex flex-row justify-between">
                <h4 className="text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl">ASSOCIA VEICOLI</h4>
            </div>
          </div>
          <div className="flex flex-col gap-4 basis-4/12 border p-5 rounded-2xl">
            <div className="col-span-12 flex flex-row justify-between">
                <h4 className="text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl">ELENCO DDT CREATI</h4>
            </div>
            Elenco ddt creati con bottone che richiama uudi e visualizza in un altro popup sidebar i veicoli associati al ddt
          </div>
        </div>
        <div className="flex flex-row w-full gap-4 min-h-0 p-5 rounded-2xl bg-neutral-950">
          <div className="col-span-12 flex flex-row justify-between">
            <h4 className="text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl">CRUSCOTTO</h4>
          </div>
        </div>
      </div>
    </div>
    </>
  )

}

export function FormField ({colspan, mdcolspan, nome,label, value, onchange, type}) {
  return (
    <>
    <div className={`${colspan} ${mdcolspan}`}>
      <Label htmlFor={nome}>{label}</Label>
      <Input type={type} id={nome} placeholder={label} name={nome} value={value}  onChange={onchange} className="
        appearance-none
        focus:outline-none
        focus-visible:ring-2
      focus-visible:ring-brand
        focus-visible:ring-offset-2
        focus-visible:ring-offset-background
      focus-visible:border-brand
          "/>
    </div>
    </>
  )
}

export function FormSelect({ colspan, mdcolspan, nome, label, value, onchange, options = [] }) {
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