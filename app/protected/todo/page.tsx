'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'

interface Todo { id: string; title: string; done: boolean }

export default function TodoPage() {
  const supabase = createClient()
  const [items, setItems] = useState<Todo[]>([])
  const [text, setText] = useState('')

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('todos').select('*').order('created_at', { ascending: false })
      setItems((data as any) || [])
    }
    load()
  }, [])

  const add = async () => {
    if (!text.trim()) return
    const { data: userRes } = await supabase.auth.getUser()
    const user_id = userRes.user?.id
    if (!user_id) return
    const { data, error } = await supabase.from('todos').insert({ title: text, user_id }).select().single()
    if (!error && data) setItems(prev => [data as any, ...prev])
    setText('')
  }

  const toggle = async (todo: Todo) => {
    const { data } = await supabase.from('todos').update({ done: !todo.done }).eq('id', todo.id).select().single()
    if (data) setItems(prev => prev.map(i => i.id === todo.id ? (data as any) : i))
  }

  const del = async (id: string) => {
    await supabase.from('todos').delete().eq('id', id)
    setItems(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div className="container py-10 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">To-Do List</h1>
      <div className="flex gap-2">
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Add a task" className="flex-1 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2" />
        <Button onClick={add} className="bg-blue-500 hover:bg-blue-600">Add</Button>
      </div>
      <ul className="mt-6 grid gap-2">
        {items.map(item => (
          <li key={item.id} className="flex items-center justify-between rounded-lg border p-3">
            <button onClick={() => toggle(item)} className={`text-left ${item.done ? 'line-through text-zinc-400' : ''}`}>{item.title}</button>
            <button onClick={() => del(item.id)} className="text-red-600 text-sm">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
