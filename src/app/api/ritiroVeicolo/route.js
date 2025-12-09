// src/app/api/contratto-pdf/route.js
import { NextResponse } from "next/server";
import { pdf } from "@react-pdf/renderer";
import RitiroVeicoloDOC from "@/app/componenti/pdf/DOCritiroveicolo";

export async function POST(req) {
  try {
    const data = await req.json();

    // data conterrà tutti i campi che passi dal client (cliente, veicolo, ecc.)
    const pdfBuffer = await pdf(<RitiroVeicoloDOC {...data} />).toBuffer();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="contratto.pdf"',
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
