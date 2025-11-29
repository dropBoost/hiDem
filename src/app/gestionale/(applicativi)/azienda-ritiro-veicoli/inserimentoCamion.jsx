'use client'
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaPlusSquare } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

export default function InserimentoCamion({onDisplay, setStatusAziende}) {
    
    const [uploadingByField, setUploadingByField] = useState({});
    const anyUploading = Object.values(uploadingByField).some(Boolean);
    const [aziendaScelta, setAziendaScelta] = useState("")
    const [aziendeRitiro, setAziendeRitiro] = useState([])
    const [veicoliAzienda, setVeicoliAzienda] = useState([])
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({
        uuidAziendaRitiro:"",
        targaCamion: "",
    })
    
    function handleChange(e) {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    useEffect(() => {
    const fetchData = async () => {

      const { data, error } = await supabase
        .from("azienda_ritiro_veicoli")
        .select("*")

      if (error) {
        console.error(error)
        return
      }

      setAziendeRitiro(data)

    }

    fetchData()
    }, [])

    useEffect(() => {

    if (!aziendaScelta) return

    const fetchData = async () => {

      const { data, error } = await supabase
        .from("camion_ritiro")
        .select("*")
        .eq("uuid_azienda_ritiro_veicoli", aziendaScelta)

      if (error) {
        console.error(error)
        return
      }
      setVeicoliAzienda(data)
    }

    fetchData()
    }, [aziendaScelta])

    async function handleSubmit(e) {

        e.preventDefault()

        const payload = {
        uuid_azienda_ritiro_veicoli: aziendaScelta || null,
        targa_camion: formData.targaCamion || null,
        }
        
        if (formData.targaCamion == "" || aziendaScelta == ""){
        alert("Campi Vuoti")
        } else if (formData.targaCamion.length !== 7) {
        alert("Targa Non Corretta")
        } else if (!aziendaScelta) {
        alert("Scegliere un'azienda di ritiro")
        }
        else {
        const { data, error } = await supabase.from("camion_ritiro").insert(payload).select().single()
        if (error) {
            console.error(error)
            alert(`Errore salvataggio: ${error.message}`)
            return
        } else {
            setFormData({
            targaCamion: "",
            uuidAziendaRitiro:"",
            })

            setStatusAziende(prev => !prev)

        }

        console.log("Inserito:", data)
        alert("Azienda Inserita con successo!")
        }
    }

    const optionsAziendeRitiro = aziendeRitiro.map(ar => ({
        value:ar.uuid_azienda_ritiro_veicoli,
        label:`${ar.ragione_sociale_arv}`,
    }))

    return (
        <>
        <div className={`${onDisplay === 'on' ? '' : 'hidden'} w-full h-full`}>
        <div className="flex flex-col gap-4">    
            <div className="col-span-12 flex flex-row justify-between">
                <h4 className="text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl">INSERIMENTO TARGA CAMION</h4>
                <button
                form="inserimentoCamion"
                type="submit"
                disabled={anyUploading}
                className=' bg-brand px-3 py-2 w-fit rounded-xl h-full'>
                {anyUploading ? "Caricamento in corso..." : <FaPlusSquare className='font-bold text-dark dark:text-white'/>}
                </button>
            </div>
            <form id="inserimentoCamion" onSubmit={handleSubmit} className="flex flex-col gap-4 bg-neutral-950 p-5 rounded-2xl">
                <div className="min-w-0">
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
                <FormField nome="targaCamion" label='Targa' value={formData.targaCamion} colspan="col-span-12" mdcolspan="lg:col-span-4" onchange={handleChange} type='text'/>
            </form>
            {veicoliAzienda.length > 0 ? 
            <div className="flex flex-col gap-4 border border-neutral-700 p-5 rounded-2xl">
                <h4 className="text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl">TARGA PRESENTI IN AZIENDA</h4>
                {veicoliAzienda.map(v => (
                    <p>{v.targa_camion}</p>
                ))}
            </div> : "" }
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