'use client'

import { useState } from 'react'

export default function RegisterPage() {
    const [form, setForm] = useState({ email: '', password: '', role: 'student' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Replace with actual Supabase/Backend call
        console.log('Registering:', form)
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 rounded-xl shadow-md bg-white dark:bg-zinc-900">
            <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 rounded border border-zinc-300 dark:bg-zinc-800" required />
                <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-2 rounded border border-zinc-300 dark:bg-zinc-800" required />
                <select name="role" value={form.role} onChange={handleChange} className="w-full p-2 rounded border border-zinc-300 dark:bg-zinc-800">
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>
                <button type="submit" className="w-full bg-blue-400 hover:bg-blue-500 text-white p-2 rounded">Register</button>
            </form>
        </div>
    )
}