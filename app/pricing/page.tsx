import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle, X } from "lucide-react"

export const metadata: Metadata = {
  title: "Pricing — visaAI",
}

const FREE_FEATURES = [
  { text: "Full 15-question screener", included: true },
  { text: "Top 2 visa matches", included: true },
  { text: "Eligibility match score", included: true },
  { text: "Basic eligibility explanation", included: true },
  { text: "Red flags identified", included: true },
  { text: "All visa matches (up to 5)", included: false },
  { text: "Document checklist per visa", included: false },
  { text: "Step-by-step action plan", included: false },
  { text: "Downloadable PDF report", included: false },
  { text: "Attorney consultation option", included: false },
]

const PREMIUM_FEATURES = [
  { text: "Full 15-question screener", included: true },
  { text: "Top 2 visa matches", included: true },
  { text: "Eligibility match score", included: true },
  { text: "Basic eligibility explanation", included: true },
  { text: "Red flags identified", included: true },
  { text: "All visa matches (up to 5)", included: true },
  { text: "Document checklist per visa", included: true },
  { text: "Step-by-step action plan", included: true },
  { text: "Downloadable PDF report", included: true },
  { text: "Attorney consultation option", included: true },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-navy-900">
            Simple, honest pricing
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Start with a free screening. Unlock the full report only when you
            need it. No subscription, no recurring charges.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Free */}
          <div className="rounded-2xl border border-border bg-white p-8">
            <div className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Free
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-5xl font-bold text-navy-900">$0</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Always free. No credit card required.
            </p>

            <ul className="mt-8 space-y-3">
              {FREE_FEATURES.map((f) => (
                <li key={f.text} className="flex items-center gap-3 text-sm">
                  {f.included ? (
                    <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
                  ) : (
                    <X className="h-4 w-4 shrink-0 text-gray-300" />
                  )}
                  <span className={f.included ? "text-gray-700" : "text-gray-400"}>
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/screener"
              className="mt-8 block rounded-xl border border-blue-600 py-3 text-center text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Start for free
            </Link>
          </div>

          {/* Premium */}
          <div className="relative rounded-2xl border-2 border-blue-600 bg-white p-8 shadow-xl">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-bold text-white">
              BEST VALUE
            </div>
            <div className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Premium
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-5xl font-bold text-navy-900">$29</span>
              <span className="text-sm text-muted-foreground">one-time</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Instant access. Pay once, keep forever.
            </p>

            <ul className="mt-8 space-y-3">
              {PREMIUM_FEATURES.map((f) => (
                <li key={f.text} className="flex items-center gap-3 text-sm">
                  <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
                  <span className="text-gray-700">{f.text}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/screener"
              className="mt-8 block rounded-xl bg-blue-600 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Get full report — $29
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-center text-2xl font-bold text-navy-900 mb-8">
            Pricing FAQ
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                q: "Can I pay after seeing my free results?",
                a: "Yes. Complete the free screener, see your top 2 matches, then decide if you want the full report.",
              },
              {
                q: "Is this a subscription?",
                a: "No. It's a one-time payment of $29 per screening report. No recurring charges.",
              },
              {
                q: "What if I need to re-run the screener?",
                a: "Each screening session is separate. Free screenings are always free.",
              },
              {
                q: "What payment methods do you accept?",
                a: "All major credit and debit cards via Stripe. Apple Pay and Google Pay also supported.",
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-xl border border-border bg-white p-5">
                <h3 className="font-semibold text-sm text-navy-900">{faq.q}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
