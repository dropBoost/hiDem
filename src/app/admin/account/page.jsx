'use client'

import { useState } from "react";

import InserimentoVeicoliRitiratiAccount from "./componenti/inserimentoRitiro";
// import ElencoVeicoliRitirati from "./elencoVeicoliRitirati";

export default function InserimentoRitiroAccountPAGE() {

  const [onDisplaySectionOne, setOnDisplaySectionOne] = useState("off")
  const [onDisplaySectionTwo, setOnDisplaySectionTwo] = useState("on")
  const [statusAziende, setStatusAziende] = useState(false)

  function ClickSectionOne () {
    setOnDisplaySectionOne("on")
    setOnDisplaySectionTwo("off")
  }

  function ClickSectionTwo () {
    setOnDisplaySectionOne("off")
    setOnDisplaySectionTwo("on")
  }

  return (
    <>
    <div className="flex flex-row items-start justify-between h-full">
        <div className="flex basis-2/12 border h-full">
            <div className="flex flex-col items-start md:justify-start justify-center w-full gap-3">
                <ButtonSection click={ClickSectionOne} nome="INSERIMENTO RITIRO VEICOLO" section={onDisplaySectionOne}/>
                <ButtonSection click={ClickSectionTwo} nome="ELENCO RITIRI" section={onDisplaySectionTwo}/>
            </div>
        </div>
        <div className="flex basis-10/12 border flex-col h-full w-full justify-start items-start overflow-auto gap-3 p-5">
            {/* <div className="h-[1px] w-full bg-gradient-to-r from-brand to-brandDark"/> */}
            <div className="flex flex-1 justify-start items-start w-full min-h-0">
                <InserimentoVeicoliRitiratiAccount statusAziende={statusAziende} setStatusAziende={setStatusAziende} onDisplay={onDisplaySectionOne}/>
                {/* <ElencoVeicoliRitirati statusAziende={statusAziende} setStatusAziende={setStatusAziende} onDisplay={onDisplaySectionTwo}/> */}
            </div>
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