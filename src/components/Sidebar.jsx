import { useState } from 'react'
import { Plus, Heart, Trash2, X } from 'lucide-react'

export default function Sidebar({ albums, activeAlbum, setActiveAlbum, photos, addAlbum, deleteAlbum }) {
  const [newAlbumName, setNewAlbumName] = useState('')
  const [showInput, setShowInput] = useState(false)

  const handleAdd = () => {
    if (!newAlbumName.trim()) return
    addAlbum(newAlbumName.trim())
    setNewAlbumName('')
    setShowInput(false)
  }

  const getCount = (albumId) => {
    if (albumId === 'all') return photos.length
    if (albumId === 'favorites') return photos.filter(p => p.favorite).length
    return photos.filter(p => p.albumId === albumId).length
  }

  const navItems = [
    { id: 'all', name: 'Tất cả', icon: '🌸' },
    { id: 'favorites', name: 'Yêu thích', icon: '🤍' },
    ...albums.filter(a => a.id !== 'all'),
  ]

  return (
    <aside className="w-64 shrink-0 flex flex-col gap-2 pr-2">
      <p className="text-xs font-medium uppercase tracking-[2px] text-stone-400 mb-1 px-2">Album</p>

      {navItems.map(album => (
        <div key={album.id} className="group relative">
          <button
            onClick={() => setActiveAlbum(album.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 text-left
              ${activeAlbum === album.id
                ? 'bg-gradient-to-r from-[#f2d5cb] to-[#f8ede5] text-[#c97b6e] shadow-sm'
                : 'hover:bg-white/60 text-stone-500 hover:text-stone-700'}`}
          >
            <span className="text-base w-5 text-center">{album.icon}</span>
            <span className="flex-1 truncate">{album.name}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              activeAlbum === album.id
                ? 'bg-white/70 text-[#c97b6e]'
                : 'bg-stone-100 text-stone-400'
            }`}>
              {getCount(album.id)}
            </span>
          </button>

          {/* Delete album (not default ones) */}
          {album.id !== 'all' && album.id !== 'favorites' && (
            <button
              onClick={(e) => { e.stopPropagation(); deleteAlbum(album.id) }}
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity
                w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-100 text-red-400"
            >
              <Trash2 size={12} />
            </button>
          )}
        </div>
      ))}

      {/* Add album */}
      <div className="mt-2 px-2">
        {showInput ? (
          <div className="flex gap-2 animate-slide-down" style={{ animation: 'fadeUp 0.2s ease both' }}>
            <input
              autoFocus
              value={newAlbumName}
              onChange={e => setNewAlbumName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleAdd(); if (e.key === 'Escape') setShowInput(false) }}
              placeholder="Tên album..."
              className="flex-1 text-sm px-3 py-2 rounded-xl border border-rose-200 outline-none focus:border-rose-400
                bg-white/70 placeholder-stone-300 text-stone-600"
            />
            <button onClick={handleAdd}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#e8a898] to-[#c97b6e] text-white flex items-center justify-center hover:opacity-90">
              <Plus size={16} />
            </button>
            <button onClick={() => setShowInput(false)}
              className="w-9 h-9 rounded-xl border border-stone-200 text-stone-400 flex items-center justify-center hover:bg-stone-50">
              <X size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-stone-400
              hover:text-[#c97b6e] hover:bg-white/60 transition-all border border-dashed border-stone-200 hover:border-rose-300"
          >
            <Plus size={14} />
            Tạo album mới
          </button>
        )}
      </div>
    </aside>
  )
}
