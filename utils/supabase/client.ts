// utils/supabase/client.ts
'use client'
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error(
            '@supabase/ssr: Your project URL and API key are required to create a Supabase client!'
        )
    }
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
}