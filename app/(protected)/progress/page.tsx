'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function ProgressPage() {
  const supabase = createClient()
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('progress').select('percent').single()
      if (data?.percent != null) setPercent(data.percent)
    }
    load()
  }, [])

  const save = async (value: number) => {
    setPercent(value)
    await supabase.from('progress').upsert({ id: 1, percent: value })
  }

  return (
    <div className="container py-10 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-6">Progress Tracker</h1>
      <input type="range" min={0} max={100} value={percent} onChange={e => save(Number(e.target.value))} className="w-full" />
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">Current: {percent}%</p>
    </div>
  )
}
