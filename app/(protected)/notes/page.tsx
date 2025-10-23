'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

interface Note { id: string; content: string }

export default function NotesPage() {
  const supabase = createClient()
  const [notes, setNotes] = useState<Note[]>([])
  const [text, setText] = useState('')

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('notes').select('*').order('created_at', { ascending: false })
      setNotes((data as any) || [])
    }
    load()
  }, [])

  const add = async () => {
    if (!text.trim()) return
    const { data } = await supabase.from('notes').insert({ content: text }).select().single()
    if (data) setNotes(prev => [data as any, ...prev])
    setText('')
  }

  const del = async (id: string) => {
    await supabase.from('notes').delete().eq('id', id)
    setNotes(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="container py-10 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">Notes</h1>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Write a note..." className="w-full h-32 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2" />
      <div className="mt-2">
        <button onClick={add} className="px-4 py-2 rounded-md bg-blue-500 text-white">Add</button>
      </div>
      <ul className="mt-6 grid gap-3">
        {notes.map(n => (
          <li key={n.id} className="rounded-lg border p-3">
            <div className="prose prose-zinc dark:prose-invert whitespace-pre-wrap">{n.content}</div>
            <button onClick={() => del(n.id)} className="mt-2 text-sm text-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
