
import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Sidebar from './components/sidebar'
import Editor from './components/Editor'
import RecentPreview from './components/RecentPreview'

export default function Dashboard({ user, onSignOut }) {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const fetchNotes = async () => {
    if (!user?.id) return
    setLoading(true)
    setError('')
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
      if (error) throw error
      setNotes(data ?? [])
    } catch (err) {
      setError(err.message || 'Failed to load notes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [user?.id])

  const openEdit = (note) => {
    setEditingId(note.id)
    setTitle(note.title ?? '')
    setContent(note.content ?? '')
  }

  const openNew = () => {
    setEditingId(null)
    setTitle('')
    setContent('')
    setError('')
  }

  const handleSavedNote = (savedNote) => {
    setNotes(prev => {
      const found = prev.find(n => n.id === savedNote.id)
      if (found) return prev.map(n => n.id === savedNote.id ? savedNote : n)
      return [savedNote, ...prev]
    })
    setEditingId(savedNote.id)
    setError('')
  }

  const handleDeleted = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id))
    if (editingId === id) openNew()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <Sidebar
          user={user}
          notes={notes}
          loading={loading}
          fetchNotes={fetchNotes}
          onSignOut={onSignOut}
          onOpen={openEdit}
          onDelete={handleDeleted}
        />

        <main className="md:col-span-3 bg-white rounded-lg shadow p-6 overflow-hidden">
          <Editor
            user={user}
            editingId={editingId}
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            setError={setError}
            onSaved={handleSavedNote}
            onDeleted={handleDeleted}
            fetchNotes={fetchNotes}
          />

          <div className="mt-8">
            <RecentPreview notes={notes} />
          </div>

          {error && <div className="mt-3 text-red-600">{error}</div>}
        </main>
      </div>
    </div>
  )
}
