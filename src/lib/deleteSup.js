// lib/deleteSup.js
import { supabase } from '@/lib/supabaseClient'

// Elimina 1 riga per UUID, ritorna { ok, data?, error? }
export async function deleteRowUUID(uuid, table, column = 'uuid') {
  try {
    if (!uuid || !table || !column) {
      return { ok: false, error: new Error('Parametri mancanti in deleteRowUUID') }
    }

    // NB: senza .single() così non si blocca se 0/1 righe; usiamo count per verificare.
    const { data, error, count } = await supabase
      .from(table)
      .delete({ count: 'exact' })     // chiede anche il count delle righe cancellate
      .eq(column, uuid)
      .select()                       // returning: 'representation' (default) → data = righe eliminate

    if (error) {
      console.error('[deleteRowUUID] Supabase error:', error)
      return { ok: false, error }
    }
    if (!count || count === 0) {
      return { ok: false, error: new Error('Nessuna riga eliminata: chiave non trovata o policy/FK') }
    }
    return { ok: true, data: data?.[0] }
  } catch (e) {
    console.error('[deleteRowUUID] unexpected exception:', e)
    return { ok: false, error: e }
  }
} 