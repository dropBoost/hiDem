'use client'

import { useState } from "react";

import InserimentoVeicoliRitiratiACCOUNT from "./componenti/ritiroVeicoli";

export default function RitiriDemolizioniACCOUNT() {

  const [statusAziende, setStatusAziende] = useState(false)



  return (
    <>
    <div className="flex flex-col min-h-0 w-full justify-start items-start overflow-auto gap-3">
      <h2>INSERIMENTO RITIRO DEMOLIZIONE</h2>
      <div className="h-[1px] w-full bg-gradient-to-r from-brand to-brandDark"/>
      <div className="flex flex-1 justify-start items-start w-full min-h-0">
        <InserimentoVeicoliRitiratiACCOUNT statusAziende={statusAziende} setStatusAziende={setStatusAziende}/>
      </div>
    </div>
    </>
  );
}