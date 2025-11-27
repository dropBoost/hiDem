import Link from "next/link"
import { FaFileDownload } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";
import { BsFillTelephoneFill } from "react-icons/bs";
import { TbBrandWhatsappFilled } from "react-icons/tb";
import { GiSteeringWheel } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { LinkComponentContact } from "@/app/gestionale/componenti/displayLinkComponentContact";


export default function DisplayAziendeRitiro ({uuid, ragioneSociale, piva, stato, sdi, email, tel, mobile, autista, sedeLegale, rules}) {

    return (
        <>
        <div className="flex lg:flex-row flex-col min-h-0 w-full border lg:items-center justify-between items-start border-neutral-200 dark:border-neutral-700 rounded-xl p-3 gap-2 dark:shadow-xl">
            <div className="flex lg:flex-row flex-col lg:w-fit w-full justify-start lg:items-start items-start gap-1 min-h-0 h-full overflow-auto">
                <div className="flex flex-col justify-start items-center lg:w-fit w-full min-h-0 h-full lg:mt-1 m-0">
                    {stato == true
                    ?
                    <div className="flex lg:flex-col flex-row gap-1 lg:items-center lg:justify-between justify-between w-full"> 
                        <span className="flex items-center justify-center border bg-brand rounded-full w-3 h-3 text-[0.6rem]"/>
                    </div>
                    : <div className="flex lg:flex-col flex-row gap-1 lg:items-center lg:justify-between justify-between w-full">
                        <span className="flex items-center justify-center border bg-red-600 rounded-full w-3 h-3 text-[0.6rem] font-bold"/>
                    </div>
                    }
                </div>
                <div className="flex flex-row justify-between w-full h-full">
                    <div className="flex flex-col justify-start items-start lg:min-w-[16rem] h-full gap-1">
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-brand uppercase truncate text-ellipsis">{ragioneSociale} <font className="text-xs lowercase text-neutral-600 font-medium italic">{rules}</font></span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-light truncate">{sedeLegale}</span>
                            <span className="text-xs font-light truncate">{piva} / {sdi}</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start items-start lg:min-w-[16rem] h-full gap-1 border-s ps-3">
                        <LinkComponentContact label="telefono" icon={<BsFillTelephoneFill/>} info={tel} linkHref={`tel:`}/>
                        <LinkComponentContact label="mobile" icon={<TbBrandWhatsappFilled/>} info={mobile} linkHref={`https://wa.me/`}/>
                        <LinkComponentContact label="autista" icon={<GiSteeringWheel/>} info={autista} linkHref={`tel:`}/>
                        <LinkComponentContact label="email" icon={<MdEmail/>} info={email} linkHref={`mailto:`}/>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-end items-start lg:gap-3 gap-3 lg:w-fit w-full bg-brand/50 rounded-md lg:p-1 p-2">
                <div className="flex flex-col justify-center items-start w-fit h-full">
                    <Link className="lg:p-2 p-1 bg-brand/70 rounded-md hover:bg-brand" href={`ritiri-demolizioni/${uuid}`}><FaFileDownload /></Link>
                </div>
                <div className="flex flex-col justify-center items-start w-fit h-full">
                    <Link className="lg:p-2 p-1 bg-brand/70 rounded-md hover:bg-brand" href={`ritiri-demolizioni/${uuid}`}><FaFileDownload /></Link>
                </div>
                <div className="flex flex-col justify-center items-start w-fit h-full">
                    <Link className="lg:p-2 p-1 bg-brand/70 rounded-md hover:bg-brand" href={`ritiri-demolizioni/${uuid}`}><RiEyeCloseLine/></Link>
                </div>
            </div>
        </div>
        </>
    )
}