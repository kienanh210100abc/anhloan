import { useState, useCallback } from 'react'

export function useAlbum() {
  const [photos, setPhotos] = useState([])
  const [albums, setAlbums] = useState([{ id: 'all', name: 'Tất cả', icon: '🌸' }])
  const [activeAlbum, setActiveAlbum] = useState('all')
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [selectMode, setSelectMode] = useState(false)
  const [toast, setToast] = useState(null)
  const [lightbox, setLightbox] = useState({ open: false, index: -1 })
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('newest') // newest | oldest

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type, id: Date.now() })
    setTimeout(() => setToast(null), 2800)
  }, [])

  const addPhotos = useCallback((files) => {
    const newPhotos = files.map((file, i) => ({
      id: `${Date.now()}-${i}-${Math.random()}`,
      src: file.src,
      name: file.name,
      size: file.size,
      albumId: activeAlbum === 'all' ? null : activeAlbum,
      createdAt: Date.now() + i,
      favorite: false,
    }))
    setPhotos(prev => [...newPhotos, ...prev])
    showToast(`Đã thêm ${files.length} ảnh ✨`)
  }, [activeAlbum, showToast])

  const deletePhoto = useCallback((id) => {
    setPhotos(prev => prev.filter(p => p.id !== id))
    showToast('Đã xoá ảnh')
  }, [showToast])

  const deleteSelected = useCallback(() => {
    const count = selectedIds.size
    setPhotos(prev => prev.filter(p => !selectedIds.has(p.id)))
    setSelectedIds(new Set())
    setSelectMode(false)
    showToast(`Đã xoá ${count} ảnh 🗑️`)
  }, [selectedIds, showToast])

  const toggleFavorite = useCallback((id) => {
    setPhotos(prev => prev.map(p =>
      p.id === id ? { ...p, favorite: !p.favorite } : p
    ))
  }, [])

  const toggleSelect = useCallback((id) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const enterSelectMode = useCallback(() => {
    setSelectMode(true)
    setSelectedIds(new Set())
  }, [])

  const exitSelectMode = useCallback(() => {
    setSelectMode(false)
    setSelectedIds(new Set())
  }, [])

  const selectAll = useCallback((visiblePhotos) => {
    setSelectedIds(new Set(visiblePhotos.map(p => p.id)))
  }, [])

  const addAlbum = useCallback((name) => {
    const id = `album-${Date.now()}`
    const icons = ['🌺', '🌻', '🌷', '🍀', '🌿', '🎀', '💫', '🌙', '⭐', '🦋']
    const icon = icons[Math.floor(Math.random() * icons.length)]
    setAlbums(prev => [...prev, { id, name, icon }])
    showToast(`Đã tạo album "${name}"`)
    return id
  }, [showToast])

  const deleteAlbum = useCallback((id) => {
    setAlbums(prev => prev.filter(a => a.id !== id))
    setPhotos(prev => prev.map(p => p.albumId === id ? { ...p, albumId: null } : p))
    if (activeAlbum === id) setActiveAlbum('all')
    showToast('Đã xoá album')
  }, [activeAlbum, showToast])

  const moveToAlbum = useCallback((photoIds, albumId) => {
    setPhotos(prev => prev.map(p =>
      photoIds.has(p.id) ? { ...p, albumId: albumId === 'all' ? null : albumId } : p
    ))
    setSelectedIds(new Set())
    setSelectMode(false)
    showToast('Đã chuyển ảnh')
  }, [showToast])

  const openLightbox = useCallback((index) => {
    setLightbox({ open: true, index })
  }, [])

  const closeLightbox = useCallback(() => {
    setLightbox({ open: false, index: -1 })
  }, [])

  const lightboxNav = useCallback((dir, total) => {
    setLightbox(prev => ({
      ...prev,
      index: (prev.index + dir + total) % total,
    }))
  }, [])

  // Filtered & sorted photos
  const visiblePhotos = photos
    .filter(p => {
      if (activeAlbum === 'all') return true
      if (activeAlbum === 'favorites') return p.favorite
      return p.albumId === activeAlbum
    })
    .filter(p => searchQuery
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true
    )
    .sort((a, b) => sortOrder === 'newest' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt)

  return {
    photos, albums, activeAlbum, setActiveAlbum,
    selectedIds, selectMode,
    toast, lightbox,
    searchQuery, setSearchQuery,
    sortOrder, setSortOrder,
    visiblePhotos,
    addPhotos, deletePhoto, deleteSelected,
    toggleFavorite, toggleSelect,
    enterSelectMode, exitSelectMode, selectAll,
    addAlbum, deleteAlbum, moveToAlbum,
    openLightbox, closeLightbox, lightboxNav,
  }
}
