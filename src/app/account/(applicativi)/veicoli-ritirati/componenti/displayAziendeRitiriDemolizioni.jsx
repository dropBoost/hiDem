import Link from "next/link"
import { FaFileDownload } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";

export default function DisplayAziendeRitiriDemolizioni ({uuid, n, ragioneSociale, piva}) {

    return (
        <>
        <div className="flex lg:flex-row flex-col min-h-0 w-full border lg:items-center justify-between items-start border-neutral-200 dark:border-neutral-700 rounded-xl p-3 gap-2 dark:shadow-xl">
            <div className="flex lg:flex-row flex-col lg:w-fit w-full justify-start lg:items-center items-start gap-3">
                <div className="flex flex-col justify-center items-center lg:w-fit w-full h-fit">
                    {n == 0
                    ?
                    <div className="flex lg:flex-col flex-row gap-1 lg:items-center lg:justify-between justify-between w-full"> 
                        <span className="flex items-center justify-center border bg-brand rounded-full w-3 h-3 text-[0.6rem]">{null}</span>
                    </div>
                    : <div className="flex lg:flex-col flex-row gap-1 lg:items-center lg:justify-between justify-between w-full">
                        <span className="flex items-center justify-center border bg-red-600 rounded-full w-3 h-3 text-[0.6rem] font-bold">{null}</span>
                        <span className="flex items-center justify-center w-3 h-3 text-[0.6rem] font-bold">{n}</span>
                    </div>
                    }
                </div>
                <div className="flex lg:flex-row flex-col">
                    <div className="flex flex-col justify-center lg:items-center items-start lg:min-w-[16rem] h-full">
                        <span className="text-xs font-light truncate">RAGIONE SOCIALE</span>
                        <span className="text-sm font-semibold text-brand uppercase truncate text-ellipsis">{ragioneSociale}</span>
                    </div>
                    <div className="flex flex-col justify-center items-start min-w-[16rem] h-full lg:border-s lg:border-t-0 border-t lg:ps-3 lg:pt-0 pt-1 ps-0">
                        <span className="text-xs font-light">P.IVA</span>
                        <span className="text-sm font-semibold">{piva}</span>
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