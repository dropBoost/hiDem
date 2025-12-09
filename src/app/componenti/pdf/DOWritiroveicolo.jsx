// src/app/gestionale/(applicativi)/archivio-contratti/componenti/DownloadContrattoButton.jsx
"use client";

import { FaFileDownload } from "react-icons/fa";

export default function DownloadRitiroVeicoloDOC({ datiContratto }) {
  // datiContratto è un oggetto con TUTTI i campi che si aspetta ContractPDF

  async function handleDownload() {
    try {
      const res = await fetch("/api/ritiroVeicolo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datiContratto),
      });

      if (!res.ok) {
        alert("Errore nella generazione del PDF");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "contratto.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Errore imprevisto nella generazione del PDF");
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="px-4 py-2 rounded-md bg-brand text-white hover:bg-brand/80"
    >
      <FaFileDownload/>
    </button>
  );
}
