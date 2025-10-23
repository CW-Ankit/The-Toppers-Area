'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'

export default function SignUpPage() {
  const router = useRouter()
  const params = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)
    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) return setError(error.message)
    setMessage('Thanks for signing up! Please check your email for a verification link.')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100">Create account</h1>
        {params.get('error') && (
          <p className="mb-4 text-sm text-red-600">{decodeURIComponent(params.get('error')!)}</p>
        )}
        <form onSubmit={onSubmit} className="grid gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="text-sm text-green-600">{message}</p>}
          <Button disabled={loading} type="submit" className="bg-blue-500 hover:bg-blue-600">
            {loading ? 'Creating...' : 'Create account'}
          </Button>
        </form>
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          Have an account?{' '}
          <Link className="text-blue-600" href="/sign-in">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
