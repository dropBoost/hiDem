import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Stili base
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    fontSize: 10,
    fontWeight: "bold",
  },
  value: {
    fontSize: 10,
  },
});

export default function RitiroVeicoloDOC(props) {
  const {
    numeroContratto,
    dataContratto,
    nome,
    cognome,
    targa,
    modello,
    dataInizio,
    dataFine,
    prezzoTotale,
  } = props;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>DOCUMENTO RITIRO VEICOLO</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>N° Documento: <Text style={styles.value}>{numeroContratto}</Text></Text>
          <Text style={styles.label}>Data: <Text style={styles.value}>{dataContratto}</Text></Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Cliente:</Text>
          <Text style={styles.value}>{nome} {cognome}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Veicolo:</Text>
          <Text style={styles.value}>{modello} - {targa}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Periodo:</Text>
          <Text style={styles.value}>{dataInizio} → {dataFine}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Prezzo totale:</Text>
          <Text style={styles.value}>{prezzoTotale} €</Text>
        </View>

        {/* aggiungi tutte le clausole, condizioni, firme ecc... */}
      </Page>
    </Document>
  );
}
