
import { FaFileDownload } from "react-icons/fa";
import { TbBrandWhatsappFilled } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { FaCarAlt } from "react-icons/fa";
import { LinkComponentContact } from "@/app/gestionale/componenti/displayLinkComponentContact";
import { ButtonLinkDisplayDownloadDOC } from "@/app/gestionale/componenti/displayButtonComponentDownloadDoc";

export default function DisplayCertificatiDemolizioni ({
    uuid, targa, telaio, mobile,completata,tipologiaDemolizione, email, data, note, docDemolizione, altroDocDemolizione
    }) {

    return (
        <>
        <div className="flex lg:flex-row flex-col min-h-0 w-full border lg:items-center justify-between items-start border-neutral-700 rounded-xl p-3 gap-2 shadow-xl">
            <div className="flex lg:flex-row flex-col lg:w-fit w-full justify-start lg:items-start items-start gap-1 min-h-0 h-full overflow-auto">
                <div className="flex flex-row justify-between w-full h-full">
                    <div className="flex flex-col justify-start items-start lg:min-w-[16rem] h-full gap-1">
                        <div className={`flex flex-row gap-1 items-center border border-neutral-500 w-fit rounded-md px-2`}>
                            <span className={`text-xs text-neutral-400`}>{data}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-row gap-1 items-center border border-brand w-fit rounded-lg px-2">
                                <FaCarAlt className="text-brand text-xs"/> 
                                <span className={`text-sm font-semibold uppercase truncate text-ellipsis`}>{targa} <font className="text-xs text-neutral-500 font-medium italic uppercase">{telaio}</font></span> 
                            </div>
                        </div>
                        <div className={`flex flex-row gap-1 items-center border border-neutral-500 w-fit rounded-md px-2`}>
                            <span className={`text-xs text-neutral-400 uppercase`}>{tipologiaDemolizione}</span>
                        </div>
                        {note == "" ? "" :
                        <div className={`flex flex-row gap-1 items-center w-fit rounded-md px-2`}>
                            <p className={`text-xs text-neutral-400 `}><font className="text-red-600">Note:</font> {note}</p>
                        </div>
                        }
                    </div>
                    <div className="flex flex-col justify-start items-start h-full gap-1 border-s ps-3">
                        <LinkComponentContact label="mobile detentore" icon={<TbBrandWhatsappFilled/>} info={mobile} linkHref={`https://wa.me/`}/>
                        <LinkComponentContact label="email detentore" icon={<MdEmail/>} info={email} linkHref={`mailto:`}/>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-end items-start lg:gap-3 gap-3 lg:w-fit w-full lg:p-1 p-2 lg:border-t-0 border-t">
                <ButtonLinkDisplayDownloadDOC linkHref={docDemolizione} info={"DEMOLIZIONE"} icon={<FaFileDownload/>}/>
                {altroDocDemolizione ? <ButtonLinkDisplayDownloadDOC linkHref={altroDocDemolizione} info={"ALTRO"} icon={<FaFileDownload/>}/> : ""}
            </div>
        </div>
        </>
    )
}