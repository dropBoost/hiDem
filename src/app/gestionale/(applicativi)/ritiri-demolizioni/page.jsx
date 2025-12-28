'use client'

import { useState } from "react";
import InserimentoVeicoliRitirati from "./ritiroVeicoli";
import ElencoVeicoliRitirati from "./elencoVeicoliRitirati";
import PAGEveicoliAttesaRitiro from "./veicoliAttesaRitiro";
import { useAdmin } from "@/app/admin/components/AdminContext";

export default function PAGEritiriDemolizioni() {

  const utente = useAdmin()
  const role = utente?.utente?.user_metadata?.ruolo
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
  
  console.log(role)

  const isAdmin = role == 'admin' || role == 'superadmin'
  const isTransporter = role == 'transporter'
  const isCompany = role == 'company'

  return (
    <>
    <div className="flex flex-col min-h-0 w-full justify-start items-start overflow-auto gap-3">
      <div className="flex items-start md:justify-start justify-center w-full gap-3">
        {isAdmin || isCompany ? <ButtonSection click={ClickSectionOne} nome="INSERIMENTO RITIRO VEICOLO" section={onDisplaySectionOne}/> : null}
        {isAdmin || isCompany ? <ButtonSection click={ClickSectionTwo} nome="ELENCO RITIRI" section={onDisplaySectionTwo}/> : null}
        {isAdmin ? <ButtonSection click={ClickSectionThree} nome="ATTESA DI RITIRO" section={onDisplaySectionThree}/> : null}
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-brand to-brandDark"/>
      <div className="flex flex-1 justify-start items-start w-full min-h-0">
        {isAdmin || isCompany ? <InserimentoVeicoliRitirati statusAziende={statusAziende} setStatusAziende={setStatusAziende} onDisplay={onDisplaySectionOne}/> : null}
        {isAdmin || isCompany ? <ElencoVeicoliRitirati statusAziende={statusAziende} setStatusAziende={setStatusAziende} onDisplay={onDisplaySectionTwo}/> : null}
        {isAdmin ? <PAGEveicoliAttesaRitiro statusAziende={statusAziende} setStatusAziende={setStatusAziende} onDisplay={onDisplaySectionThree}/> : null }
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