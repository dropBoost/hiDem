'use client'

import { useState } from "react";

import ElencoVeicoliRitiratiACCOUNT from "./componenti/elencoVeicoliRitirati";

export default function VeicoliRitiratiAccount() {

  const [statusAziende, setStatusAziende] = useState(false)

  return (
    <>
    <div className="flex flex-col min-h-0 w-full justify-start items-start overflow-auto gap-3">
      <h2>ELENCO VEICOLI RITIRATI</h2>
      <div className="h-[1px] w-full bg-gradient-to-r from-brand to-brandDark"/>
      <div className="flex flex-1 justify-start items-start w-full min-h-0">
        <ElencoVeicoliRitiratiACCOUNT statusAziende={statusAziende} setStatusAziende={setStatusAziende}/>
      </div>
    </div>
    </>
  );
}

export function ButtonSection ({section, nome, click}) {

  return (
    <>
    <button
      onClick={click}
      className={`
      flex items-center justify-center text-xs font-bold border rounded-2xl px-3 py-1 
      ${section === "on" ? `text-neutral-100 bg-brand  border-brand` : `text-brand border border-brand`}
      `}
      >{nome}</button>
    </>
  )
}