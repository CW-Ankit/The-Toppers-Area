'use client'

import { useEffect, useRef, useState } from 'react'

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${r.toString().padStart(2,'0')}`
}

export default function PomodoroPage() {
  const [seconds, setSeconds] = useState(25*60)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds(s => Math.max(0, s-1)), 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running])

  const reset = (mins: number) => { setSeconds(mins*60); setRunning(false) }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl font-bold tracking-tight">{formatTime(seconds)}</div>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button onClick={() => setRunning(r => !r)} className="px-4 py-2 rounded-md bg-blue-500 text-white">{running ? 'Pause' : 'Start'}</button>
          <button onClick={() => reset(25)} className="px-4 py-2 rounded-md border">Reset</button>
          <button onClick={() => reset(5)} className="px-4 py-2 rounded-md border">Break 5</button>
        </div>
      </div>
    </div>
  )
}
