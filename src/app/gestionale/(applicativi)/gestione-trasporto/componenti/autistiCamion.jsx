'use client'
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaPlusSquare, FaCar } from "react-icons/fa";

export default function SECTIONautistiCamion({onDisplay, setStatusAziende}) {
    
  const [uploadingByField, setUploadingByField] = useState({});
  const anyUploading = Object.values(uploadingByField).some(Boolean);
  const [formData, setFormData] = useState({
    targaCamion:"",
    marcaCamion:"",
    modelloCamion: "",
  })

  function handleChange(e) {
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value.toUpperCase().trim() })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const payload = {
    targa_camion: formData.targaCamion || null,
    marca_camion: formData.marcaCamion || null,
    modello_camion: formData.modelloCamion || null,
    }

    if (formData.marcaCamion == "" || formData.modelloCamion == "" || formData.targaCamion == ""){
      alert("Campi Vuoti")
    } else {
      const { data, error } = await supabase.from("camion_trasporto_veicoli").insert(payload).select().single()
      if (error) {
          console.error(error)
          alert(`Errore salvataggio: ${error.message}`)
          return
      } else {
        setFormData({
        targaCamion:"",
        marcaCamion: "",
        modelloCamion:"",
        })
      }
      setStatusAziende(prev => !prev)
      setUpdateCamion(prev => !prev)
      console.log("Inserito:", data)
      alert("Camion inserito con successo!")
    }
  }

console.log("formData",formData)

    return (
        <>
        <div className={`${onDisplay === true ? '' : 'hidden'} w-full h-full`}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row w-full gap-4 min-h-0">
              <div className="flex flex-col gap-4 basis-6/12 bg-neutral-950 p-5 rounded-2xl">    
                <div className="col-span-12 flex flex-row justify-between">
                    <h4 className="text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl">INSERIMENTO AUTISTA</h4>
                    <button
                    form="inserimentoCamion"
                    type="submit"
                    disabled={anyUploading}
                    className=' bg-brand px-3 py-2 w-fit rounded-xl h-full'>
                    {anyUploading ? "Caricamento in corso..." : <FaPlusSquare className='font-bold text-dark dark:text-white'/>}
                    </button>
                </div>
                <form id="inserimentoCamion" onSubmit={handleSubmit} className="flex flex-col gap-4 ">
                  <FormField nome="targaCamion" label='Targa' value={formData.targaCamion} colspan="col-span-12" mdcolspan="lg:col-span-4" onchange={handleChange} type='text'/>
                  <FormField nome="marcaCamion" label='Marchio' value={formData.marcaCamion} colspan="col-span-12" mdcolspan="lg:col-span-4" onchange={handleChange} type='text'/>
                  <FormField nome="modelloCamion" label='Modello' value={formData.modelloCamion} colspan="col-span-12" mdcolspan="lg:col-span-4" onchange={handleChange} type='text'/>
                </form>
              </div>
              <div className="flex flex-col gap-4 basis-6/12 border p-5 rounded-2xl">
                <div className="col-span-12 flex flex-row justify-between">
                    <h4 className="text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl">ELENCO CAMION</h4>
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full gap-4 min-h-0 border p-5 rounded-2xl bg-neutral-950">
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