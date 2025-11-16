
import { FaFileDownload } from "react-icons/fa";
import { TbBrandWhatsappFilled } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { FaCarAlt } from "react-icons/fa";
import { LinkComponentContact } from "@/app/gestionale/componenti/displayLinkComponentContact";
import { ButtonLinkDisplayDownloadDOC } from "@/app/gestionale/componenti/displayButtonComponentDownloadDoc";
import { FaCaretRight } from "react-icons/fa";
import { HiMiniPencilSquare } from "react-icons/hi2";


export default function CertificatoDemolizione ({ uuid, targa, telaio, mobile,completata,tipologiaDemolizione, email, data, note, docDemolizione, altroDocDemolizione, uuidAzienda, datiV }) {

    const arv = datiV.azienda_ritiro_veicoli

    function DataFormat(value) {
        if (!value) return '—'
        const d = new Date(value)
        if (isNaN(d)) return '—'
        return d.toLocaleString('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        })
    } 

    return (
        <>
        <div className="flex flex-col min-h-0 w-full border lg:items-center justify-between items-start border-neutral-700 rounded-xl p-3 gap-2 shadow-xl">
                <div className="flex lg:flex-row flex-col justify-between gap-2 w-full h-full">

                    <div className="flex flex-col flex-1 justify-start items-start lg:min-w-[16rem] h-full gap-1">
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-row gap-1 items-center border border-brand w-fit rounded-lg px-2">
                                <FaCarAlt className="text-brand text-xs"/> 
                                <span className={`text-base font-semibold uppercase truncate text-ellipsis`}>{datiV.targa_veicolo_ritirato} <font className="text-xs text-neutral-500 font-medium italic uppercase">{datiV.vin_veicolo_ritirato}</font></span> 
                            </div>
                        </div>
                        <div className={`flex flex-row gap-1 items-center border border-neutral-500 w-fit rounded-md px-2`}>
                            <span className={`text-xs text-neutral-400`}>Demolizione <font className={`font-bold uppercase ${tipologiaDemolizione == "totale" ? "text-red-600" : "text-brand"}`}> {tipologiaDemolizione} </font> in data<span className={`text-xs text-neutral-400`}>: {data}</span></span>
                        </div>
                        {note == "" ? "" :
                        <div className={`flex flex-row gap-1 items-center w-fit rounded-md px-2`}>
                            <p className={`text-xs text-neutral-400 `}><font className="text-red-600">Note:</font> {note}</p>
                        </div>
                        }
                        <hr className="w-full border-brand my-2"/>
                        <div className="flex flex-row items-center border border-brand text-neutral-300 w-fit rounded-lg px-3 py-1 text-xs mb-2">
                            <span>DATI AZIENDA RITIRO</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <SpanElementList icon={<FaCaretRight/>} label={`Ritirato da:`} data={`${arv?.ragione_sociale_arv}`}/>
                            <SpanElementList icon={<FaCaretRight/>} label={`Partita Iva:`} data={`${arv?.piva_arv}`}/>
                            <SpanElementList icon={<FaCaretRight/>} label={`SDI:`} data={`${arv?.sdi_arv}`}/>
                            <SpanElementList icon={<FaCaretRight/>} label={`Sede Legale:`} data={`${arv?.indirizzo_legale_arv} - ${arv?.cap_legale_arv} ${arv?.citta_legale_arv} ${arv?.provincia_legale_arv}`}/>
                            <SpanElementList icon={<FaCaretRight/>} label={`Sede Operativa:`} data={`${arv?.indirizzo_operativa_arv} - ${arv?.cap_operativa_arv} ${arv?.citta_operativa_arv} ${arv?.provincia_operativa_arv}`}/>
                            <SpanElementList icon={<FaCaretRight/>} label={`Data Ritiro Veicolo:`} data={DataFormat(datiV?.created_at_veicolo_ritirato)}/>
                        </div>
                        <div className="flex flex-row items-center border border-brand text-neutral-300 w-fit rounded-lg px-3 py-1 text-xs my-2">
                            <span>FORMA LEGALE DETENTORE VEICOLO</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <SpanElementList icon={<FaCaretRight/>} label={`Forma Legale Detentore:`} data={datiV?.forma_legale_detentore}/>
                            {datiV?.forma_legale_detentore == "azienda" ?
                            <> 
                            <SpanElementList icon={<FaCaretRight/>} label={`Ragione Sociale:`} data={datiV?.ragione_sociale_detentore}/>
                            <SpanElementList icon={<FaCaretRight/>} label={`Partita Iva:`} data={datiV?.piva_detentore}/>
                            </>
                            : <SpanElementList icon={<FaCaretRight/>} label={`Codice Fiscale:`} data={datiV?.cf_detentore}/>
                            }
                        </div>
                        <div className="flex flex-row items-center border border-brand text-neutral-300 w-fit rounded-lg px-3 py-1 text-xs my-2">
                            <span>DATI DETENTORE VEICOLO</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <SpanElementList icon={<FaCaretRight/>} label={`Detentore Veicolo:`} data={`${datiV?.nome_detentore} ${datiV?.cognome_detentore}`}/>
                            <SpanElementList icon={<FaCaretRight/>} label={`Tipologia Detentore:`} data={datiV?.tipologia_detentore}/>
                            <SpanElementList icon={<FaCaretRight/>} label={`Nazionalità:`} data={datiV?.nazionalita_documento_detentore}/>
                            <SpanElementList icon={<FaCaretRight/>} label={`Documento Detentore:`} data={`${datiV?.tipologia_documento_detentore} n° ${datiV?.numero_documento_detentore}`}/>
                            <SpanElementList icon={<FaCaretRight/>} label={`Indirizzo Detentore:`} data={`${datiV?.indirizzo_detentore} - ${datiV?.cap_detentore} ${datiV?.citta_detentore} ${datiV?.provincia_detentore}`}/>
                        </div>
                        <div className="flex flex-row items-center border border-brand text-neutral-300 w-fit rounded-lg px-3 py-1 text-xs my-2">
                            <span>DATI VEICOLO</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <SpanElementList icon={<FaCaretRight/>} label={`Modelo:`} data={`${datiV?.modello_veicolo.marca} ${datiV?.modello_veicolo.modello}`}/>
                            <SpanElementList icon={<FaCaretRight/>} label={`Documento:`} data={datiV?.tipologia_documento_veicolo_ritirato}/>
                            <SpanElementList icon={<FaCaretRight/>} label={`Anno Immatricolazione:`} data={datiV?.anno_veicolo_ritirato}/>
                            <SpanElementList icon={<FaCaretRight/>} label={`Cilindrata:`} data={datiV?.cilindrata_veicolo_ritirato}/>
                            <SpanElementList icon={<FaCaretRight/>} label={`KM:`} data={datiV?.km_veicolo_ritirato}/>
                        </div>
                    </div>

                    <div className="flex flex-col justify-start items-start h-full gap-1 lg:min-w-[20rem] lg:border-neutral-800 border border-brand rounded-xl p-3 shadow-xl">
                        <div className="flex flex-row items-center border border-brand text-neutral-300 w-fit rounded-lg px-2 py-1 text-[0.6rem] my-2">
                            <span>AZIENDA RITIRO</span>
                        </div>
                        <LinkComponentContact label="Mobile" icon={<TbBrandWhatsappFilled/>} info={arv?.mobile_arv} linkHref={`https://wa.me/`}/>
                        <LinkComponentContact label="Telefono" icon={<TbBrandWhatsappFilled/>} info={arv?.telefono_arv} linkHref={`https://wa.me/`}/>
                        <LinkComponentContact label="Email" icon={<MdEmail/>} info={arv?.email_arv} linkHref={`mailto:`}/>
                        <div className="flex flex-row items-center border border-brand text-neutral-300 w-fit rounded-lg px-2 py-1 text-[0.6rem] my-2">
                            <span>DETENTORE VEICOLO</span>
                        </div>
                        <LinkComponentContact label="mobile detentore" icon={<TbBrandWhatsappFilled/>} info={datiV?.mobile_detentore} linkHref={`https://wa.me/`}/>
                        <LinkComponentContact label="email detentore" icon={<MdEmail/>} info={datiV?.email_detentore} linkHref={`mailto:`}/>
                        <div className="flex flex-row items-center border border-brand text-neutral-300 w-fit rounded-lg px-2 py-1 text-[0.6rem] my-2">
                            <span>DOCUMENTI DETENTORE</span>
                        </div>
                        <ButtonLinkDisplayDownloadDOC targetType={`_blank`} linkHref={datiV?.foto_documento_detentore_f} info={"DETENTORE F"} icon={<FaFileDownload/>}/>    
                        <ButtonLinkDisplayDownloadDOC targetType={`_blank`} linkHref={datiV?.foto_documento_detentore_r} info={"DETENTORE R"} icon={<FaFileDownload/>}/>   
                        <div className="flex flex-row items-center border border-brand text-neutral-300 w-fit rounded-lg px-2 py-1 text-[0.6rem] my-2">
                            <span>DOCUMENTI VEICOLO</span>
                        </div>
                        <ButtonLinkDisplayDownloadDOC targetType={`_blank`} linkHref={datiV?.foto_documento_veicolo_ritirato_f} info={"VEICOLO F"} icon={<FaFileDownload/>}/>    
                        <ButtonLinkDisplayDownloadDOC targetType={`_blank`} linkHref={datiV?.foto_documento_veicolo_ritirato_r} info={"VEICOLO R"} icon={<FaFileDownload/>}/> 
                        <div className="flex flex-row items-center border border-brand text-neutral-300 w-fit rounded-lg px-2 py-1 text-[0.6rem] my-2">
                            <span>DOCUMENTI DEMOLIZIONE</span>
                        </div>
                        <ButtonLinkDisplayDownloadDOC targetType={`_blank`} linkHref={docDemolizione} info={"DEMOLIZIONE"} icon={<FaFileDownload/>}/>
                        {altroDocDemolizione ? <ButtonLinkDisplayDownloadDOC targetType={`_blank`} linkHref={altroDocDemolizione} info={"ALTRO"} icon={<FaFileDownload/>}/> : ""}
                    </div>
                </div>
        </div>
        </>
    )
}

export function SpanElementList ({icon, label, data}) {
    return(
        <div className="flex flex-row border border-neutral-800 rounded-md p-1 px-3 gap-1 items-center justify-start text-sm text-neutral-400">
        <div className="text-brand">{icon}</div>
        <span className="">{label}</span>
        <span className="text-neutral-300 font-bold">{data}</span>
        </div>
    )
}