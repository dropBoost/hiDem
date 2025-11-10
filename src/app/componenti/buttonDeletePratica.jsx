// src/components/ButtonDeletePratica.jsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { deleteRowUUID } from '@/lib/deleteSup'

export default function ButtonDeletePratica({ uuid, tabella, nomeAttributo, confirmMessage = 'Sei sicuro di voler eliminare questo record?', onDeleted, icona, className = '' }) {
  const [loading, setLoading] = useState(false)
  const [dati, setDati] = useState({})
  const ready = dati && Object.keys(dati).length > 0

  useEffect(() => {
    if (!uuid) return
    ;(async () => {
      const { data, error } = await supabase
        .from('dati_veicolo_ritirato')
        .select('*')
        .eq('uuid_veicolo_ritirato', uuid)
        .maybeSingle()

      if (error) {
        console.error('[fetch sorgente] errore:', error)
        setDati({})
        return
      }
      setDati(data ?? {})
    })()
  }, [uuid])

  // 2) Preparo la copia su "dati_veicolo_eliminato"
  async function copiaInArchivio() {
    if (!ready) {
      return { ok: false, error: new Error('Dati non pronti per la copia') }
    }

    // ATTENZIONE: mantieni solo le colonne consentite dalla tabella archivio
    const payload = {
      uuid_ritiro: dati.uuid_veicolo_ritirato,
      uuid_azienda_ritiro_veicoli: dati.uuid_azienda_ritiro_veicoli ?? null,
      uuid_modello_veicolo: dati.uuid_modello_veicolo ?? null,
      anno_veicolo_ritirato: dati.anno_veicolo_ritirato ?? null,
      cilindrata_veicolo_ritirato: dati.cilindrata_veicolo_ritirato ?? null,
      vin_veicolo_ritirato: dati.vin_veicolo_ritirato ?? null,
      targa_veicolo_ritirato: dati.targa_veicolo_ritirato ?? null,
      km_veicolo_ritirato: dati.km_veicolo_ritirato ?? null,
      tipologia_detentore: dati.tipologia_detentore ?? null,
      forma_legale_detentore: dati.forma_legale_detentore ?? null,
      ragione_sociale_detentore: dati.ragione_sociale_detentore ?? null,
      nome_detentore: dati.nome_detentore ?? null,
      cognome_detentore: dati.cognome_detentore ?? null,
      cf_detentore: dati.cf_detentore ?? null,
      piva_detentore: dati.piva_detentore ?? null,
      tipologia_documento_detentore: dati.tipologia_documento_detentore ?? null,
      numero_documento_detentore: dati.numero_documento_detentore ?? null,
      nazionalita_documento_detentore: dati.nazionalita_documento_detentore ?? null,
      email_detentore: dati.email_detentore ?? null,
      mobile_detentore: dati.mobile_detentore ?? null,
      cap_detentore: dati.cap_detentore ?? null,
      provincia_detentore: dati.provincia_detentore ?? null,
      indirizzo_detentore: dati.indirizzo_detentore ?? null,
      citta_detentore: dati.citta_detentore ?? null,
      tipologia_documento_veicolo_ritirato: dati.tipologia_documento_veicolo_ritirato ?? null,
      foto_documento_veicolo_ritirato_f: dati.foto_documento_veicolo_ritirato_f ?? null,
      foto_documento_veicolo_ritirato_r: dati.foto_documento_veicolo_ritirato_r ?? null,
      foto_documento_detentore_f: dati.foto_documento_detentore_f ?? null,
      foto_documento_detentore_r: dati.foto_documento_detentore_r ?? null,
    }

    const { data, error } = await supabase
      .from('dati_veicolo_eliminato')
      .insert(payload)
      .select()
      .single()

    if (error) {
      console.error('[copia archivio] insert error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      })
      return { ok: false, error }
    }

    return { ok: true, data }
  }

  async function handleDelete() {

  if (!uuid || !tabella || !nomeAttributo) {
    console.error('[ButtonDeletePratica] Parametri mancanti', { uuid, tabella, nomeAttributo })
    alert('Parametri mancanti (uuid/tabella/nomeAttributo).')
    return
  }
  if (confirmMessage && !window.confirm(confirmMessage)) return

     setLoading(true)
  try {
    // 1) Copia in archivio
    const copy = await copiaInArchivio()
    if (!copy?.ok) {
      console.error('[copiaInArchivio] fail:', copy?.error)
      alert(`Errore durante la copia dei dati: ${copy?.error?.message ?? 'sconosciuto'}`)
      return
    }

    // 2) (opzionale) elimina prima i figli se NON hai ON DELETE CASCADE
    const delChildren = await deleteChildrenOfRitiro(uuid) // importa dall’helper
    if (!delChildren.ok) {
      const msg = delChildren.error?.message || 'Errore cancellazione relazioni figlie'
      alert(msg)
      return
    }

    // 3) elimina la riga sorgente
    const del = await deleteRowUUID(uuid, tabella, nomeAttributo)

    if (!del.ok) {
      const code = del.error?.code
      console.error('[DELETE fail]', del.error)
      if (code === '23503') {
        alert('Cancellazione bloccata da vincolo di chiave esterna (23503). Devi rimuovere/adeguare i FK o cancellare prima i record collegati / usare ON DELETE CASCADE.')
      } else if (code === '42501') {
        alert('Cancellazione bloccata dalla Row Level Security (42501). Aggiungi policy FOR DELETE (o usa service_role in Server Action).')
      } else {
        alert(`Errore durante la cancellazione: ${del.error?.message ?? 'sconosciuto'}`)
      }
      return
    }

    onDeleted?.(uuid)
    alert('Riga copiata in archivio ed eliminata!')

    } catch (e) {
    console.error('[handleDelete] unexpected:', e)
    alert(`Eccezione durante la cancellazione: ${e?.message ?? 'sconosciuto'}`)
    } finally {
      setLoading(false)
    }

  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading || !ready}
      aria-busy={loading}
      className={className}
      title={!ready ? 'Dati non ancora caricati' : undefined}
    >
      {icona ?? (loading ? 'Elimino…' : 'Elimina')}
    </button>
  )
}
