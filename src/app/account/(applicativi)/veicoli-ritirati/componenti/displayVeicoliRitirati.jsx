import Link from "next/link"
import { FaFileDownload } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";
import { BsFillTelephoneFill } from "react-icons/bs";
import { TbBrandWhatsappFilled } from "react-icons/tb";
import { GiSteeringWheel } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { FaCarAlt } from "react-icons/fa";
import { LinkComponentContact } from "@/app/gestionale/componenti/displayLinkComponentContact";
import TargaDesign from "@/app/componenti/targaDesign";

export default function DisplayVeicoliRitiratiACCOUNT ({
    uuid, targa, modelloVeicolo, telaio, nome, cognome, mobileDetentore,completata,tipologiaD,ragioneSociale, piva, cf, email, documento, data
    }) {

    const datiContratto={
        numeroContratto:uuid,
        targa:targa,
    }

    return (
        <>
        <div className="flex lg:flex-row flex-col min-h-0 w-full border lg:items-center justify-between items-start border-neutral-700 rounded-xl p-3 gap-2 shadow-xl">
            <div className="flex lg:flex-row flex-col lg:w-fit w-full justify-start lg:items-start items-start gap-1 min-h-0 h-full overflow-auto">
                <div className="flex flex-col justify-start items-center lg:w-fit w-full min-h-0 h-full lg:mt-1 m-0">
                    {completata == true
                    ?
                    <div className="flex lg:flex-col flex-row gap-1 lg:items-center lg:justify-between justify-between w-full"> 
                        <span className="flex items-center justify-center border bg-brand rounded-full w-3 h-3 text-[0.6rem]"/>
                    </div>
                    : <div className="flex lg:flex-col flex-row gap-1 lg:items-center lg:justify-between justify-between w-full">
                        <span className="flex items-center justify-center border bg-red-600 rounded-full w-3 h-3 text-[0.6rem] font-bold"/>
                    </div>
                    }
                </div>
                <div className="flex flex-col md:flex-row justify-between w-full h-full">
                    <div className="flex flex-col justify-start items-start lg:min-w-[16rem] h-full gap-1">
                        <div className={`flex flex-row gap-1 items-center border border-neutral-500 w-fit rounded-md px-2`}>
                            <span className={`text-xs text-neutral-400`}>{data}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <TargaDesign targa={targa}/>
                            <span className={`border border-brand rounded-lg px-2 py-1 text-xs truncate text-ellipsis`}>Telaio:<font className="text-xs text-neutral-400 font-medium italic uppercase"> {telaio}</font></span>
                            <div className="flex flex-row gap-1 items-center border border-neutral-500 w-fit rounded-lg px-2">
                                <FaCarAlt className="text-brand text-xs"/>
                                <span className={`text-sm font-semibold uppercase truncate text-ellipsis`}>{modelloVeicolo} <font className="text-xs text-neutral-500 font-medium italic lowercase">{documento}</font></span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                        {tipologiaD == "azienda " ?
                        <>
                            <span className="text-xs font-light truncate">{ragioneSociale}</span>
                            <span className="text-xs font-light truncate">{nome} {cognome} / <font className="italic text-yellow-600">{tipologiaD}</font></span>
                            <span className="text-xs font-light truncate">{piva}</span>
                        </>    
                            :
                        <>    
                            <span className="text-xs font-light truncate">{nome} {cognome} / <font className="italic text-blue-600">{tipologiaD}</font></span>
                            <span className="text-xs font-light truncate">{cf}</span>
                        </>    
                        }
                        </div>
                    </div>
                    <div className="flex flex-col justify-start items-start h-full gap-1 md:border-s md:border-t-0 border-t md:ps-3 md:mt-0 md:pt-0 mt-2 pt-2">
                        <LinkComponentContact label="mobile" icon={<TbBrandWhatsappFilled/>} info={mobileDetentore} linkHref={`https://wa.me/`}/>
                        <LinkComponentContact label="email" icon={<MdEmail/>} info={email} linkHref={`mailto:`}/>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-end items-start lg:gap-3 gap-3 lg:w-fit w-full bg-brand/50 rounded-md lg:p-1 p-2">
                <div className="flex flex-col justify-center items-start w-fit h-full">
                    <DownloadRitiroVeicoloDOC datiContratto={datiContratto}/>
                </div>
            </div>
        </div>
        </>
    )
}