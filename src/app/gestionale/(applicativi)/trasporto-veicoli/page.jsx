'use client'

import { useState } from "react";
import SECTIONddtDemolizioni from '@/app/gestionale/(applicativi)/trasporto-veicoli/componenti/ddtDemolizioni';
import SECTIONddtPending from '@/app/gestionale/(applicativi)/trasporto-veicoli/componenti/ddtPending';
import SECTIONcamionTrasporto from '@/app/gestionale/(applicativi)/trasporto-veicoli/componenti/camionTrasporto';
import SECTIONautistiCamion from '@/app/gestionale/(applicativi)/trasporto-veicoli/componenti/autistiCamion';

export default function PAGEtrasportoVeicoli() {

  const [onDisplaySectionOne, setOnDisplaySectionOne] = useState(true)
  const [onDisplaySectionTwo, setOnDisplaySectionTwo] = useState(false)
  const [onDisplaySectionThree, setOnDisplaySectionThree] = useState(false)
  const [onDisplaySectionFour, setOnDisplaySectionFour] = useState(false)
  const [statusAziende, setStatusAziende] = useState(false)


  function ClickSectionOne () {
    setOnDisplaySectionOne(true)
    setOnDisplaySectionTwo(false)
    setOnDisplaySectionThree(false)
    setOnDisplaySectionFour(false)
  }

  function ClickSectionTwo () {
    setOnDisplaySectionOne(false)
    setOnDisplaySectionTwo(true)
    setOnDisplaySectionThree(false)
    setOnDisplaySectionFour(false)    
  }

  function ClickSectionThree () {
    setOnDisplaySectionOne(false)
    setOnDisplaySectionTwo(false)
    setOnDisplaySectionThree(true)
    setOnDisplaySectionFour(false)    
  }

  function ClickSectionFour () {
    setOnDisplaySectionOne(false)
    setOnDisplaySectionTwo(false)
    setOnDisplaySectionThree(false)
    setOnDisplaySectionFour(true)    
  }

  return (
    <>
    <div className="flex flex-col min-h-0 w-full justify-start items-start overflow-auto gap-3">
      <div className="flex items-start md:justify-start justify-center w-full gap-3">
        <ButtonSection click={ClickSectionOne} nome="INSERIMENTO DDT" section={onDisplaySectionOne}/>
        <ButtonSection click={ClickSectionTwo} nome="DDT" section={onDisplaySectionTwo}/>
        <ButtonSection click={ClickSectionThree} nome="CAMION" section={onDisplaySectionThree}/>
        <ButtonSection click={ClickSectionFour} nome="AUTISTI" section={onDisplaySectionFour}/>
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-brand to-brandDark"/>
      <div className="flex flex-1 justify-start items-start w-full min-h-0">
        <SECTIONddtDemolizioni statusAziende={statusAziende} setStatusAziende={setStatusAziende} onDisplay={onDisplaySectionOne}/>
        <SECTIONddtPending statusAziende={statusAziende} setStatusAziende={setStatusAziende} onDisplay={onDisplaySectionTwo}/>
        <SECTIONcamionTrasporto statusAziende={statusAziende} setStatusAziende={setStatusAziende} onDisplay={onDisplaySectionThree}/>
        <SECTIONautistiCamion statusAziende={statusAziende} setStatusAziende={setStatusAziende} onDisplay={onDisplaySectionFour}/>
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