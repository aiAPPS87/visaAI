"use client"

import { useState } from "react"
import { Lock, CheckCircle, Loader2 } from "lucide-react"

interface Props {
  sessionId: string
}

export default function PremiumUnlock({ sessionId }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleUnlock() {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/payments/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })
      if (!res.ok) throw new Error("Failed to create payment")
      const { clientSecret } = await res.json()

      // In a real app, you'd use Stripe.js here to show the payment form.
      // For now, we redirect to a checkout page.
      window.location.href = `/checkout?client_secret=${clientSecret}&session_id=${sessionId}`
    } catch {
      setLoading(false)
      setError("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="mt-8 rounded-2xl border-2 border-blue-600 bg-gradient-to-br from-blue-50 to-white p-8 text-center shadow-lg">
      <Lock className="mx-auto h-10 w-10 text-blue-600" />
      <h3 className="mt-3 text-xl font-bold text-navy-900">
        Unlock Your Full Report
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Get all {"{"}remaining{"}"} visa matches plus everything below — one-time, instant access.
      </p>

      <ul className="mx-auto mt-5 max-w-xs space-y-2 text-left">
        {[
          "All visa matches with full analysis",
          "Document checklist for each visa",
          "Step-by-step action plan",
          "Success likelihood score",
          "Downloadable PDF report",
          "Attorney consultation option",
        ].map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <button
        onClick={handleUnlock}
        disabled={loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-base font-semibold text-white hover:bg-blue-700 disabled:opacity-60 transition-colors"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing…
          </>
        ) : (
          "Unlock Full Report — $29"
        )}
      </button>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      <p className="mt-3 text-xs text-muted-foreground">
        Secure payment via Stripe. No subscription.
      </p>
    </div>
  )
}
