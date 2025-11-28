'use client'

import { useState } from "react";

import InserimentoCertificatiDemolizione from "./inserimentoCertificatoDemolizione";
import ElencoCertificatiDemolizione from "./elencoCertificatiDemolizione";
import CercaDemolizioneTarga from "./cercaTarga";

export default function CertificatiDemolizione() {

  const [onDisplaySectionOne, setOnDisplaySectionOne] = useState("on")
  const [onDisplaySectionTwo, setOnDisplaySectionTwo] = useState("off")
  const [onDisplaySectionThree, setOnDisplaySectionThree] = useState("off")
  const [statusAziende, setStatusAziende] = useState(false)

  function ClickSectionOne () {
    setOnDisplaySectionOne("on")
    setOnDisplaySectionTwo("off")
    setOnDisplaySectionThree("off")
  }

  function ClickSectionTwo () {
    setOnDisplaySectionOne("off")
    setOnDisplaySectionTwo("on")
    setOnDisplaySectionThree("off")
  }

  function ClickSectionThree () {
    setOnDisplaySectionOne("off")
    setOnDisplaySectionTwo("off")
    setOnDisplaySectionThree("on")
  }

  return (
    <>
    <div className="flex flex-col min-h-0 w-full justify-start items-start overflow-auto gap-3">
      <div className="flex items-start md:justify-start justify-center w-full gap-3">
        <ButtonSection click={ClickSectionOne} nome="INSERIMENTO DEMOLIZIONE" section={onDisplaySectionOne}/>
        <ButtonSection click={ClickSectionTwo} nome="ELENCO DEMOLIZIONI" section={onDisplaySectionTwo}/>
        <ButtonSection click={ClickSectionThree} nome="CERCA TARGA" section={onDisplaySectionThree}/>
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-brand to-brandDark"/>
      <div className="flex flex-1 justify-start items-start w-full min-h-0">
        <InserimentoCertificatiDemolizione statusAziende={statusAziende} setStatusAziende={setStatusAziende} onDisplay={onDisplaySectionOne}/>
        <ElencoCertificatiDemolizione statusAziende={statusAziende} setStatusAziende={setStatusAziende} onDisplay={onDisplaySectionTwo}/>
        <CercaDemolizioneTarga statusAziende={statusAziende} setStatusAziende={setStatusAziende} onDisplay={onDisplaySectionThree}/>
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