import React from 'react'

export default function RecentPreview({ notes = [] }) {
  return (
    <div>
      <h3 className="text-lg font-semibold">Recent notes preview</h3>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.slice(0, 6).map(n => (
          <article key={n.id} className="p-4 border rounded bg-gray-50 overflow-hidden">
            <div className="flex justify-between">
              <div className="font-medium">{n.title || 'Untitled'}</div>
              <div className="text-xs text-gray-400">{new Date(n.updated_at || n.inserted_at).toLocaleString()}</div>
            </div>
            <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap line-clamp-6">{n.content}</p>
            {n.summary && <div className="mt-3 text-sm text-indigo-700">Summary: {n.summary}</div>}
          </article>
        ))}
      </div>
    </div>
  )
}
