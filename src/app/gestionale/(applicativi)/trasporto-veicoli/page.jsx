"use client";

import { useState } from "react";
import SECTIONtrasportoVeicoli from "@/app/gestionale/(applicativi)/trasporto-veicoli/componenti/trasportoVeicoli";
import SECTIONveicoliTransito from "@/app/gestionale/(applicativi)/trasporto-veicoli/componenti/veicoliTransito";
import { useAdmin } from "@/app/admin/components/AdminContext";

export default function PAGEtrasportoVeicoli() {

  const utente = useAdmin()
  const role = utente?.utente?.user_metadata?.ruolo
  const [onDisplaySectionOne, setOnDisplaySectionOne] = useState(true);
  const [onDisplaySectionTwo, setOnDisplaySectionTwo] = useState(false);
  const [statusAziende, setStatusAziende] = useState(false);

  function ClickSectionOne() {
    setOnDisplaySectionOne(true);
    setOnDisplaySectionTwo(false);
  }

  function ClickSectionTwo() {
    setOnDisplaySectionOne(false);
    setOnDisplaySectionTwo(true);
  }

  return (
    <>
      <div className="flex flex-col min-h-0 w-full justify-start items-start overflow-auto gap-3">
        <div className="flex items-start md:justify-start justify-center w-full gap-3">
          <ButtonSection click={ClickSectionOne} nome="TRASPORTO VEICOLI" section={onDisplaySectionOne}/>
          {role == "admin" || role == "superadmin" ?
          <ButtonSection click={ClickSectionTwo} nome="VEICOLI IN TRANSITO" section={onDisplaySectionTwo}/>
          : null }
        </div>
        <div className="h-[1px] w-full bg-gradient-to-r from-brand to-brandDark" />
        <div className="flex flex-1 justify-start items-start w-full min-h-0">
          <SECTIONtrasportoVeicoli statusAziende={statusAziende} setStatusAziende={setStatusAziende} onDisplay={onDisplaySectionOne}/>
          {role == "admin" || role == "superadmin" ?
          <SECTIONveicoliTransito statusAziende={statusAziende} setStatusAziende={setStatusAziende} onDisplay={onDisplaySectionTwo}/>
          : null }
        </div>
      </div>
    </>
  );
}

export function ButtonSection({ section, nome, click }) {
  return (
    <>
      <button
        onClick={click}
        className={`
      flex items-center justify-center text-xs font-bold border rounded-2xl px-3 py-1 
      ${
        section === true
          ? `text-neutral-100 bg-brand  border-brand`
          : `text-brand border border-brand`
      }
      `}
      >
        {nome}
      </button>
    </>
  );
}
