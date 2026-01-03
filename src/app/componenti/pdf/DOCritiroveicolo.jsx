import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10 },
  section: { marginBottom: 10 },
  title: { fontSize: 16, marginBottom: 10 },
  label: { fontSize: 10, fontWeight: "bold" },
  value: { fontSize: 10 },

  // QR
  qrWrap: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  qrImg: {
    width: 90,
    height: 90,
  },
  qrText: {
    width: "70%",
    fontSize: 9,
  },
});

export default function RitiroVeicoloDOC(props) {
  const {
    uuidRitiroVeicolo,
    aziendaRitiro,
    vinLeggibile,
    vin,
    targa,
    modello,
    tipologiaDetentore,
    formaLegale,
    ragioneSociale,
    indirizzo,
    nome,
    cognome,
    cf,
    piva,
    tipologiaDocDet,
    numeroDocDet,
    email,
    mobile,
    tipDocVeic,
    docGravami,
    praticaCompletata,
    dataRitiro,

    // ✅ nuovo
    qrDataUrl, // es: "data:image/png;base64,...."
    qrValue,   // testo/URL contenuto nel QR (facoltativo, per mostrare a stampa)
  } = props;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>DOCUMENTO RITIRO VEICOLO</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            N° Documento: <Text style={styles.value}>{uuidRitiroVeicolo}</Text>
          </Text>
          <Text style={styles.label}>
            Data: <Text style={styles.value}>{dataRitiro}</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Azienda Ritiro:</Text>
          <Text style={styles.value}>{aziendaRitiro}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Cliente:</Text>
          <Text style={styles.value}>{nome} {cognome}</Text>
          <Text style={styles.value}>{tipologiaDetentore}</Text>
          <Text style={styles.value}>{formaLegale}</Text>
          <Text style={styles.value}>{ragioneSociale ? ragioneSociale : "RAGIONE SOCIALE"}</Text>
          <Text style={styles.value}>{indirizzo}</Text>
          <Text style={styles.value}>{cf} {piva}</Text>
          <Text style={styles.value}>{tipologiaDocDet} {numeroDocDet}</Text>
          <Text style={styles.value}>{email} {mobile}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Veicolo:</Text>
          <Text style={styles.value}>{modello} - {targa}</Text>
          <Text style={styles.value}>{vinLeggibile ? `${vin}` : "vin non leggibile"}</Text>
          <Text style={styles.value}>{tipDocVeic}</Text>
          <Text style={styles.value}>{docGravami}</Text>
        </View>

        {/* ✅ BLOCCO QR */}
        {(qrDataUrl || qrValue) && (
          <View style={styles.qrWrap}>
            <View style={styles.qrText}>
              <Text style={styles.label}>Verifica documento / pratica</Text>
              <Text style={styles.value}>
                Scansiona il QR per aprire la pagina di verifica.
              </Text>
              {qrValue ? <Text style={styles.value}>{qrValue}</Text> : null}
            </View>

            {qrDataUrl ? <Image style={styles.qrImg} src={qrDataUrl} /> : null}
          </View>
        )}

        {/* clausole, firme ecc... */}
      </Page>
    </Document>
  );
}
