'use client'
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaPlusSquare, FaCar } from "react-icons/fa";

export default function SECTIONcamionTrasporto({onDisplay, setStatusAziende}) {
    
  const [uploadingByField, setUploadingByField] = useState({});
  const anyUploading = Object.values(uploadingByField).some(Boolean);
  const [formDataCamion, setFormDataCamion] = useState({
    targaCamion:"",
    marcaCamion:"",
    modelloCamion: "",
  })

  const [formDataAutista, setFormDataAutista] = useState({
    numeroPatateAutista:"",
    nomeAutista:"",
    cognomeAutista: "",
  })  

  function handleChangeCamion(e) {
      const { name, value } = e.target
      setFormDataCamion({ ...formData, [name]: value.toUpperCase().trim() })
  }

  function handleChangeAutista(e) {
      const { name, value } = e.target
      setFormDataAutista({ ...formData, [name]: value.toUpperCase().trim() })
  }  

  async function handleSubmitCamion(e) {
    e.preventDefault()

    const payload = {
    targa_camion: formData.targaCamion || null,
    marca_camion: formData.marcaCamion || null,
    modello_camion: formData.modelloCamion || null,
    attivo_camion: true,
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

  async function handleSubmitAutista(e) {

    e.preventDefault()

    const payload = {
    targa_camion: formData.targaCamion || null,
    marca_camion: formData.marcaCamion || null,
    modello_camion: formData.modelloCamion || null,
    attivo_camion: true,
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

console.log("formData",formDataCamion)

    return (
        <>
        <div className={`${onDisplay === true ? '' : 'hidden'} w-full h-full`}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row flex-wrap w-full gap-4 min-h-0">
              {/* ELENCO CAMION */}
              <div className="flex flex-col gap-4 basis-6/12 border p-5 rounded-2xl">
                <div className="col-span-12 flex flex-row justify-between">
                    <h4 className="text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl">ELENCO CAMION</h4>
                </div>
              </div>
              {/* ELENCO AUTISTI */}
              <div className="flex flex-col gap-4 basis-5/12 border p-5 rounded-2xl">
                <div className="col-span-12 flex flex-row justify-between">
                    <h4 className="text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl">ELENCO CAMION</h4>
                </div>
              </div>                 
              {/* INSERIMENTO CAMION */}
              <div className="flex flex-col gap-4 w-full bg-neutral-950 p-5 rounded-2xl">    
                <div className="col-span-12 flex flex-row justify-between">
                    <h4 className="text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl">INSERIMENTO CAMION</h4>
                    <button
                    form="inserimentoCamion"
                    type="submit"
                    disabled={anyUploading}
                    className=' bg-brand px-3 py-2 w-fit rounded-xl h-full'>
                    {anyUploading ? "Caricamento in corso..." : <FaPlusSquare className='font-bold text-dark dark:text-white'/>}
                    </button>
                </div>
                <form id="inserimentoCamion" onSubmit={handleSubmitCamion} className="flex gap-4">
                  <FormField nome="targaCamion" label='Targa' value={formDataCamion.targaCamion} basis="basis-4/12" onchange={handleChangeCamion} type='text'/>
                  <FormField nome="marcaCamion" label='Marchio' value={formDataCamion.marcaCamion} basis="basis-4/12" onchange={handleChangeCamion} type='text'/>
                  <FormField nome="modelloCamion" label='Modello' value={formDataCamion.modelloCamion} basis="basis-4/12" onchange={handleChangeCamion} type='text'/>
                </form>
              </div>
              {/* INSERIMENTO AUTISTA */}
              <div className="flex flex-col gap-4 w-full bg-neutral-950 p-5 rounded-2xl">    
                <div className="col-span-12 flex flex-row justify-between">
                    <h4 className="text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl">INSERIMENTO AUTISTA</h4>
                    <button
                    form="inserimentoAutista"
                    type="submit"
                    disabled={anyUploading}
                    className=' bg-brand px-3 py-2 w-fit rounded-xl h-full'>
                    {anyUploading ? "Caricamento in corso..." : <FaPlusSquare className='font-bold text-dark dark:text-white'/>}
                    </button>
                </div>
                <form id="inserimentoAutista" onSubmit={handleSubmitAutista} className="flex gap-4">
                  <FormField nome="nomeAutista" label='Nome' value={formDataAutista.nomeAutista} basis="basis-4/12" onchange={handleChangeAutista} type='text'/>
                  <FormField nome="cognomeAutista" label='Cognome' value={formDataAutista.cognomeAutista} basis="basis-4/12" onchange={handleChangeAutista} type='text'/>
                  <FormField nome="numeroPatateAutista" label='N° Patente' value={formDataAutista.numeroPatateAutista} basis="basis-4/12" onchange={handleChangeAutista} type='text'/>
                </form>
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

export function FormField ({basis, nome, label, value, onchange, type}) {
  return (
    <>
    <div className={`${basis}`}>
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