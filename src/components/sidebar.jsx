
import React, { useMemo, useState } from 'react'

export default function Sidebar({ user, notes, loading, fetchNotes, onSignOut, onOpen, onDelete }) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search) return notes
    const s = search.toLowerCase()
    return notes.filter(n => (n.title || '').toLowerCase().includes(s) || (n.content || '').toLowerCase().includes(s))
  }, [notes, search])

  return (
    <aside className="md:col-span-1 bg-white rounded-lg shadow p-4 flex flex-col h-[80vh] overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs text-gray-500">Signed in as</div>
          <div className="font-medium text-sm truncate">{user?.email}</div>
        </div>
        <button onClick={onSignOut} className="text-sm text-red-600 hover:underline cursor-pointer">Sign out</button>
      </div>

      <button onClick={() => { setSearch(''); onOpen({ id: null, title: '', content: '' }) }}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md mb-3 cursor-pointer">
        + New Note
      </button>

      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search notes..."
        className="w-full border rounded px-3 py-2 text-sm mb-3 focus:outline-none focus:ring focus:ring-indigo-200"
      />

      <div className="flex-1 overflow-auto pr-1">
        {loading && <div className="text-sm text-gray-500">Loading notes…</div>}
        {!loading && filtered.length === 0 && <div className="text-sm text-gray-500">No notes yet</div>}
        <ul className="space-y-2">
          {filtered.map(note => (
            <li key={note.id} className="p-3 rounded hover:bg-gray-50 border border-transparent hover:border-gray-100">
              <div className="flex justify-between items-start gap-2">
                <div className="text-sm font-medium truncate cursor-pointer" onClick={() => onOpen(note)}>
                  {note.title || 'Untitled'}
                </div>
                <div className="text-xs text-gray-400">{new Date(note.updated_at || note.inserted_at).toLocaleString()}</div>
              </div>

              <div className="text-xs text-gray-500 mt-1 line-clamp-2">{note.content || ''}</div>

              <div className="mt-2 flex items-center gap-3">
                <button onClick={() => onDelete(note.id)} className="text-xs text-red-500 hover:underline cursor-pointer">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 text-xs text-gray-400">Tip: select a note to edit it in the main area.</div>
      <div className="mt-3">
        <button onClick={fetchNotes} className="text-xs text-gray-500 hover:underline cursor-pointer">Refresh</button>
      </div>
    </aside>
  )
}
