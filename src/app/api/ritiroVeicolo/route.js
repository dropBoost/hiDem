// src/app/api/contratto-pdf/route.js
import { NextResponse } from "next/server";
import { pdf } from "@react-pdf/renderer";
import QRCode from "qrcode"
import RitiroVeicoloDOC from "@/app/componenti/pdf/DOCritiroveicolo";
import { dominio } from "@/app/cosetting";

export async function POST(req) {
  try {
    const data = await req.json();

    // ✅ scegli cosa mettere nel QR (esempio: pagina verifica pratica)
    const qrValue = `${dominio}/download-demolizione/${data.uuidRitiroVeicolo}`;

    // ✅ genera PNG base64 dataURL
    const qrDataUrl = await QRCode.toDataURL(qrValue, {
      errorCorrectionLevel: "M",
      margin: 2,
      width: 300,
    });

    // data conterrà tutti i campi che passi dal client (cliente, veicolo, ecc.)
    const pdfBuffer = await pdf(<RitiroVeicoloDOC {...data} qrValue={qrValue} qrDataUrl={qrDataUrl}/>).toBuffer();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="ritiro-veicolo.pdf"',
      },
    });
  } catch (error) {
    console.error("Errore generazione PDF:", error);
    return NextResponse.json(
      { error: "Errore nella generazione del PDF" },
      { status: 500 }
    );
  }
}
