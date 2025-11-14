import Link from "next/link"
import { FaFileDownload } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";

export default function DisplayInfoPratiche ({uuid, n, ragioneSociale, piva}) {

    return (
        <>
        <div className="flex lg:flex-row flex-col min-h-0 w-full border lg:items-center items-start border-neutral-700 rounded-xl p-3 shadow-xl">
            <div className="flex flex-col justify-center items-center w-fit h-fit p-2">
                {n == 0
                ? <div className="flex flex-row items-center justify-center gap-2"><span className="flex items-center justify-center border bg-brand rounded-full w-5 h-5 text-[0.6rem]">{null}</span></div>
                : <div className="flex flex-row items-center justify-center gap-2"><span className="flex items-center justify-center border border-red-600 rounded-full w-5 h-5 text-[0.6rem] font-bold">{n}</span></div>
                }
            </div>
            <div className="flex lg:flex-row flex-col">
                <div className="flex flex-col justify-center items-start lg:min-w-[16rem] p-2 h-full">
                    <span className="text-xs font-light truncate">RAGIONE SOCIALE</span>
                    <span className="text-sm font-semibold text-brand uppercase truncate text-ellipsis">{ragioneSociale}</span>
                </div>
                <div className="flex flex-col justify-center items-start min-w-[16rem] p-2 h-full lg:border-s lg:border-t-0 border-t">
                    <span className="text-xs font-light">P.IVA</span>
                    <span className="text-sm font-semibold">{piva}</span>
                </div>
            </div>
            <div className="flex flex-row justify-end items-start lg:gap-3 gap-2 w-full">
                <div className="flex flex-col justify-center items-start w-fit h-full">
                    <Link className="lg:p-2 p-2 bg-brand/70 rounded-md hover:bg-brand" href={`ritiri-demolizioni/${uuid}`}><FaFileDownload /></Link>
                </div>
                <div className="flex flex-col justify-center items-start w-fit h-full">
                    <Link className="lg:p-2 p-2 bg-brand/70 rounded-md hover:bg-brand" href={`ritiri-demolizioni/${uuid}`}><FaFileDownload /></Link>
                </div>
                <div className="flex flex-col justify-center items-start w-fit h-full">
                    <Link className="lg:p-2 p-2 bg-brand/70 rounded-md hover:bg-brand" href={`ritiri-demolizioni/${uuid}`}><RiEyeCloseLine/></Link>
                </div>
            </div>
        </div>
        </>
    )
}