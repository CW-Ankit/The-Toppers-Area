'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'
import { Button } from '@/components/ui/button'
import { useSupabase } from '@/lib/supabase-provider'

export default function Navbar() {
    const [show, setShow] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const pathname = usePathname()
    const router = useRouter()
    const { supabase } = useSupabase()

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setIsAuthenticated(!!session)
        }
        checkAuth()
    }, [supabase])

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
        <nav className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${show ? 'translate-y-0' : '-translate-y-full'} bg-white dark:bg-zinc-900 shadow`}>
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="text-xl font-bold text-zinc-800 dark:text-white">The Toppers' Area</div>

                <div className="flex items-center gap-4">
                    <ThemeToggle />

                    {!isAuthenticated ? (
                        <>
                            <Button variant="outline" onClick={() => router.push('/login')}>Login</Button>
                            <Button onClick={() => router.push('/signup')}>Create Account</Button>
                        </>
                    ) : (
                        <Button onClick={() => router.push('/dashboard')}>Dashboard</Button>
                    )}
                </div>
            </div>
        </nav>
    )
}