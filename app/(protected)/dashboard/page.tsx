import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-semibold">Welcome to your dashboard</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">Your focused tools:</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link href="/protected/todo" className="block p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">To-Do List</Link>
        <Link href="/protected/pomodoro" className="block p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">Pomodoro Timer</Link>
        <Link href="/protected/progress" className="block p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">Progress Tracker</Link>
        <Link href="/protected/notes" className="block p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">Notes</Link>
      </div>
    </div>
  )
}
