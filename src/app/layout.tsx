import type React from "react"
import type { Metadata } from "next"
import "../styles/globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <div className="relative min-h-screen">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
              <div className="container flex h-16 items-center justify-between">
                <nav className="flex items-center gap-6">
                  <Link href="/" className="text-lg font-semibold">
                    TicketHub
                  </Link>
                  <Link href="/events" className="text-sm font-medium hover:text-primary">
                    Events
                  </Link>
                  <Link href="/my-tickets" className="text-sm font-medium hover:text-primary">
                    My Tickets
                  </Link>
                </nav>
                <div className="flex items-center gap-4">
                  <Link href="/scanner" className="text-sm font-medium hover:text-primary">
                    Scanner
                  </Link>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                  <SignedOut>
                    <SignInButton />
                    <SignUpButton />
                  </SignedOut>
                </div>
              </div>
            </header>
            <main>{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
