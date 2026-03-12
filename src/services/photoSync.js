import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const PHOTO_TABLE = 'photos'

export const isCloudSyncEnabled = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

export const supabase = isCloudSyncEnabled
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null

export async function fetchRemotePhotos() {
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from(PHOTO_TABLE)
    .select('id, src, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return (data ?? []).map((item) => ({
    id: item.id,
    src: item.src,
    createdAt: Number(item.created_at) || Date.now(),
    selected: false,
  }))
}

export async function insertRemotePhoto(photo) {
  if (!supabase) {
    return
  }

  const { error } = await supabase.from(PHOTO_TABLE).insert({
    id: photo.id,
    src: photo.src,
    created_at: photo.createdAt,
  })

  if (error) {
    throw error
  }
}

export async function deleteRemotePhoto(id) {
  if (!supabase) {
    return
  }

  const { error } = await supabase.from(PHOTO_TABLE).delete().eq('id', id)

  if (error) {
    throw error
  }
}

export function subscribeToRemotePhotos({ onInsert, onDelete }) {
  if (!supabase) {
    return () => {}
  }

  const channel = supabase
    .channel(`photo-sync-${Date.now()}`)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: PHOTO_TABLE },
      (payload) => {
        onInsert?.({
          id: payload.new.id,
          src: payload.new.src,
          createdAt: Number(payload.new.created_at) || Date.now(),
          selected: false,
        })
      },
    )
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: PHOTO_TABLE },
      (payload) => {
        onDelete?.(payload.old.id)
      },
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}
