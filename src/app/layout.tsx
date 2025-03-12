import type React from "react"
import type { Metadata } from "next"
import "../styles/globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative min-h-screen">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className="container flex h-16 items-center justify-between">
              <nav className="flex items-center gap-6">
                <a href="/" className="text-lg font-semibold">
                  TicketHub
                </a>
                <a href="/events" className="text-sm font-medium hover:text-primary">
                  Events
                </a>
                <a href="/my-tickets" className="text-sm font-medium hover:text-primary">
                  My Tickets
                </a>
              </nav>
              <div className="flex items-center gap-4">
                <a href="/scanner" className="text-sm font-medium hover:text-primary">
                  Scanner
                </a>
              </div>
            </div>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}

