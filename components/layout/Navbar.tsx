"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Globe } from "lucide-react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-navy-900">
          <Globe className="h-6 w-6 text-blue-600" />
          <span className="text-xl">
            visa<span className="text-blue-600">AI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            How it works
          </Link>
          <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Sign in
          </Link>
          <Link
            href="/screener"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Check My Eligibility →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-white px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-3 pt-3">
            <Link href="/#how-it-works" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>How it works</Link>
            <Link href="/pricing" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>Pricing</Link>
            <Link href="/dashboard" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>Dashboard</Link>
            <Link href="/login" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>Sign in</Link>
            <Link
              href="/screener"
              className="rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white"
              onClick={() => setOpen(false)}
            >
              Check My Eligibility →
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
