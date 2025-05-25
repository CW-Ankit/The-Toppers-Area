import Navbar from '@/components/navbar'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <Navbar />
                    <main className="pt-20">{children}</main>
                </ThemeProvider>
            </body>
        </html>
    )
}