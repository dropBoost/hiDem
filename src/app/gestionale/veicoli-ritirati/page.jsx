'use client'

import { useState } from "react";

import InserimentoVeicoliRitirati from "./ritiroVeicoli";
import ElencoVeicoliRitirati from "./elencoVeicoliRitirati";

export default function Customer() {

  const [onDisplaySectionOne, setOnDisplaySectionOne] = useState("on")
  const [onDisplaySectionTwo, setOnDisplaySectionTwo] = useState("off")
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
    <div className="flex flex-col h-full w-full justify-start items-start overflow-auto">
      <div className="flex items-start md:justify-start justify-center w-full gap-3 border-b border-brand py-4">
        <ButtonSection click={ClickSectionOne} nome="INSERIMENTO RITIRO VEICOLO" section={onDisplaySectionOne}/>
        <ButtonSection click={ClickSectionTwo} nome="ELENCO RITIRI" section={onDisplaySectionTwo}/>
      </div>
      <div className="flex flex-1 justify-start items-start w-full h-full py-4">
        <InserimentoVeicoliRitirati statusAziende={statusAziende} setStatusAziende={setStatusAziende} onDisplay={onDisplaySectionOne}/>
        <ElencoVeicoliRitirati statusAziende={statusAziende} setStatusAziende={setStatusAziende} onDisplay={onDisplaySectionTwo}/>
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