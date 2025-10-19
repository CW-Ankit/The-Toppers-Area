import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

export default async function ProtectedDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-[70vh] container py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <form action="/api/auth/signout" method="post">
          <button className="text-sm text-red-600">Sign out</button>
        </form>
      </div>
      <p className="mt-2 text-zinc-500">Welcome {user?.email}</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Link href="/protected/todo" className="block p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800">To-Do List</Link>
        <Link href="/protected/pomodoro" className="block p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800">Pomodoro Timer</Link>
        <Link href="/protected/progress" className="block p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800">Progress Tracker</Link>
        <Link href="/protected/notes" className="block p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800">Notes</Link>
      </div>
    </div>
  )
}
