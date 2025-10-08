
import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export default function Editor({
  user,
  editingId,
  title,
  setTitle,
  content,
  setContent,
  setError,
  onSaved,
  onDeleted,
  fetchNotes
}) {
  const [saving, setSaving] = useState(false)

  useEffect(() => {
  }, [editingId])

  const handleSave = async () => {
    setError('')
    setSaving(true)
    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const userId = sessionData?.session?.user?.id
      if (!userId) throw new Error('You must be signed in.')

      if (!title.trim() && !content.trim()) throw new Error('Please add title or content.')

      if (editingId) {
        const { data, error } = await supabase
          .from('notes')
          .update({ title, content, updated_at: new Date().toISOString() })
          .eq('id', editingId)
          .select()
          .single()
        if (error) throw error
        onSaved(data)
      } else {
        const { data, error } = await supabase
          .from('notes')
          .insert({ user_id: userId, title, content })
          .select()
          .single()
        if (error) throw error
        onSaved(data)
      }
    } catch (err) {
      setError(err.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!editingId) return
    if (!window.confirm('Delete this note?')) return
    try {
      const { error } = await supabase.from('notes').delete().eq('id', editingId)
      if (error) throw error
      onDeleted(editingId)
      fetchNotes()
    } catch (err) {
      setError(err.message || 'Delete failed')
    }
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold">{editingId ? 'Edit Note' : 'New Note'}</h2>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full border-b-2 pb-2 mt-4 text-lg font-medium focus:outline-none"
      />

      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write your note here..."
        rows={14}
        className="w-full mt-4 p-4 border rounded-md resize-none focus:outline-none focus:ring focus:ring-indigo-200 overflow-auto"
      />

      <div className="mt-4 flex items-center gap-3">
        <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded cursor-pointer disabled:opacity-60">
          {saving ? 'Saving…' : editingId ? 'Save Changes' : 'Create Note'}
        </button>

        {editingId && (
          <button onClick={handleDelete} className="px-3 py-1 bg-gray-100 rounded cursor-pointer text-sm">
            Delete
          </button>
        )}

        <button onClick={() => { setTitle(''); setContent('') }} className="px-3 py-1 bg-gray-50 rounded cursor-pointer text-sm">Clear</button>
        <button onClick={fetchNotes} className="px-3 py-1 bg-gray-50 rounded cursor-pointer text-sm">Refresh</button>
      </div>
    </section>
  )
}
