'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client'

export default function Navbar() {
  const [show, setShow] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session)
    }
    checkAuth()
  }, [])

  useEffect(() => {
    let lastScrollY = window.scrollY
    const onScroll = () => {
      setShow(window.scrollY < 20 || window.scrollY < lastScrollY)
      lastScrollY = window.scrollY
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${show ? 'translate-y-0' : '-translate-y-full'} bg-white dark:bg-zinc-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-zinc-900/70 border-b`}> 
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <button onClick={() => router.push('/')} className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          The Toppers' Area
        </button>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {!isAuthenticated ? (
            <>
              <Button variant="outline" onClick={() => router.push('/sign-in')}>Login</Button>
              <Button onClick={() => router.push('/sign-up')} className="bg-blue-500 hover:bg-blue-600">Create Account</Button>
            </>
          ) : (
            <Button onClick={() => router.push('/protected')} className="bg-amber-500 hover:bg-amber-600 text-white">Dashboard</Button>
          )}
        </div>
      </div>
    </nav>
  )
}