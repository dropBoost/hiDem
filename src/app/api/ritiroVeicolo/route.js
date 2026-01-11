// src/app/api/contratto-pdf/route.js
import { NextResponse } from "next/server";
import { pdf } from "@react-pdf/renderer";
import QRCode from "qrcode";
import RitiroVeicoloDOC from "@/app/componenti/pdf/DOCritiroveicolo";
import { dominio } from "@/app/cosetting";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs"; // ✅ fondamentale (fs non va in edge)

function fileToDataUrl(absPath, mime = "image/png") {
  const file = fs.readFileSync(absPath);
  const base64 = file.toString("base64");
  return `data:${mime};base64,${base64}`;
}

export async function POST(req) {
  try {
    const data = await req.json();

    // ✅ QR value (pagina verifica)
    const qrValue = `${dominio}/download-demolizione/${data.uuidRitiroVeicolo}`;

    // ✅ QR dataURL
    const qrDataUrl = await QRCode.toDataURL(qrValue, {
      errorCorrectionLevel: "M",
      margin: 2,
      width: 300,
    });

    // ✅ LOGO: leggo da /public
    // Se il file è in public/logo-color.png
    const logoPath = path.join(process.cwd(), "public", "assets", "logo-color.png");
    const logoSrc = fileToDataUrl(logoPath, "image/png");

    const pdfBuffer = await pdf(
      <RitiroVeicoloDOC
        {...data}
        qrValue={qrValue}
        qrDataUrl={qrDataUrl}
        logoSrc={logoSrc}
      />
    ).toBuffer();

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
