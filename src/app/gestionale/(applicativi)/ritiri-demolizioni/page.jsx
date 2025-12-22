'use client'

import { useState } from "react";

import InserimentoVeicoliRitirati from "./ritiroVeicoli";
import ElencoVeicoliRitirati from "./elencoVeicoliRitirati";
import PAGEveicoliAttesaRitiro from "./veicoliAttesaRitiro";

export default function PAGEritiriDemolizioni() {

  const [onDisplaySectionOne, setOnDisplaySectionOne] = useState(false)
  const [onDisplaySectionTwo, setOnDisplaySectionTwo] = useState(true)
  const [onDisplaySectionThree, setOnDisplaySectionThree] = useState(false)
  const [statusAziende, setStatusAziende] = useState(false)

  function ClickSectionOne () {
    setOnDisplaySectionOne(true)
    setOnDisplaySectionTwo(false)
    setOnDisplaySectionThree(false)
  }

  function ClickSectionTwo () {
    setOnDisplaySectionOne(false)
    setOnDisplaySectionTwo(true)
    setOnDisplaySectionThree(false)
  }

  function ClickSectionThree () {
    setOnDisplaySectionOne(false)
    setOnDisplaySectionTwo(false)
    setOnDisplaySectionThree(true)
  }

  return (
    <>
    <div className="flex flex-col min-h-0 w-full justify-start items-start overflow-auto gap-3">
      <div className="flex items-start md:justify-start justify-center w-full gap-3">
        <ButtonSection click={ClickSectionOne} nome="INSERIMENTO RITIRO VEICOLO" section={onDisplaySectionOne}/>
        <ButtonSection click={ClickSectionTwo} nome="ELENCO RITIRI" section={onDisplaySectionTwo}/>
        <ButtonSection click={ClickSectionThree} nome="ATTESA DI RITIRO" section={onDisplaySectionThree}/>
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-brand to-brandDark"/>
      <div className="flex flex-1 justify-start items-start w-full min-h-0">
        <InserimentoVeicoliRitirati statusAziende={statusAziende} setStatusAziende={setStatusAziende} onDisplay={onDisplaySectionOne}/>
        <ElencoVeicoliRitirati statusAziende={statusAziende} setStatusAziende={setStatusAziende} onDisplay={onDisplaySectionTwo}/>
        <PAGEveicoliAttesaRitiro statusAziende={statusAziende} setStatusAziende={setStatusAziende} onDisplay={onDisplaySectionThree}/>
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
      ${section === true ? `text-neutral-100 bg-brand  border-brand` : `text-brand border border-brand`}
      `}
      >{nome}</button>
    </>
  )
}