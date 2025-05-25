export default function HomePage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-zinc-950 transition-colors duration-300">
            <div className="text-center max-w-3xl grid gap-6">
                <h1 className="text-4xl md:text-5xl font-bold text-zinc-800 dark:text-white">
                    Welcome to <span className="text-blue-200 dark:text-blue-300">The Toppers' Area</span>
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                    A calm and focused space for self-driven learners. Plan better. Study deeper. Track smarter.
                </p>
                {/* Placeholder for future feature cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
                        <h2 className="text-xl font-semibold text-zinc-800 dark:text-white">Feature 1</h2>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">Coming soon...</p>
                    </div>
                    <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
                        <h2 className="text-xl font-semibold text-zinc-800 dark:text-white">Feature 2</h2>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">Coming soon...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
