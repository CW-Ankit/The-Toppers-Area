import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6 bg-white dark:bg-zinc-950">
      <div className="text-center max-w-3xl grid gap-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          The Toppers' Area
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400">
          A calm, minimal self-study space. Whitespace-rich, typography-focused, built for deep focus.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/sign-up" className="px-5 py-2.5 rounded-md bg-blue-500 hover:bg-blue-600 text-white">Create account</Link>
          <Link href="/sign-in" className="px-5 py-2.5 rounded-md border border-zinc-300 dark:border-zinc-700">Sign in</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-white">Pomodoro</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Stay in flow with focused sessions.</p>
          </div>
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-white">To-Do</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Capture tasks and keep it simple.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
