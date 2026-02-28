import Link from "next/link"
import {
  CheckCircle,
  MessageSquare,
  FileText,
  Shield,
  ChevronDown,
  Star,
} from "lucide-react"

const COUNTRIES = [
  { flag: "🇺🇸", name: "United States" },
  { flag: "🇨🇦", name: "Canada" },
  { flag: "🇬🇧", name: "United Kingdom" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇩🇪", name: "Germany" },
]

const HOW_IT_WORKS = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Answer a few questions",
    desc: "A friendly 15-question chat collects your background, goals, and current situation. Takes about 5 minutes.",
  },
  {
    icon: Star,
    step: "02",
    title: "AI analyzes your profile",
    desc: "Our AI engine reviews your answers against visa requirements for your chosen destination country.",
  },
  {
    icon: FileText,
    step: "03",
    title: "Get your personalized report",
    desc: "See your top visa matches ranked by likelihood, with plain-language explanations and next steps.",
  },
]

const FAQS = [
  {
    q: "Is this real legal advice?",
    a: "No. visaAI provides general informational screening only. It does not constitute legal advice and should not replace consultation with a licensed immigration attorney.",
  },
  {
    q: "How accurate is the AI screening?",
    a: "Our AI is trained on current visa requirements, but immigration rules change frequently. Always verify information with official government sources or an attorney.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Your screening data is encrypted and never sold to third parties. You can delete your account and data at any time.",
  },
  {
    q: "What countries do you cover?",
    a: "Currently: United States, Canada, United Kingdom, Australia, and Germany. More destinations coming soon.",
  },
  {
    q: "What is the premium report?",
    a: "For $29, unlock your full report including document checklists, step-by-step action plans, success likelihood scores, and a downloadable PDF.",
  },
]

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Disclaimer banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-xs text-amber-700">
        For informational purposes only. Not legal advice.{" "}
        <Link href="/#disclaimer" className="underline">Learn more</Link>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-blue-900 px-4 py-24 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            AI-powered • Free to start • Results in 5 minutes
          </div>

          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
            Discover which visas
            <br />
            <span className="text-blue-400">you actually qualify for</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            Answer 15 simple questions. Our AI analyzes your profile against
            real visa requirements and tells you exactly where you stand —
            no legal jargon, no confusing forms.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/screener"
              className="rounded-xl bg-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-400 transition-all hover:shadow-blue-500/25 hover:shadow-xl"
            >
              Check My Eligibility — Free →
            </Link>
            <Link
              href="#how-it-works"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              How it works <ChevronDown className="h-4 w-4" />
            </Link>
          </div>

          {/* Country flags */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            {COUNTRIES.map((c) => (
              <div key={c.name} className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-2xl">{c.flag}</span>
                <span>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-navy-900 md:text-4xl">
              How visaAI works
            </h2>
            <p className="mt-3 text-muted-foreground">
              From first question to personalized report in under 10 minutes.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {HOW_IT_WORKS.map((item) => (
              <div
                key={item.step}
                className="relative rounded-2xl border border-border bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-4xl font-bold text-blue-100">
                    {item.step}
                  </span>
                  <div className="rounded-lg bg-blue-50 p-2">
                    <item.icon className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="bg-gray-50 px-4 py-20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-navy-900 md:text-4xl">
              Simple, honest pricing
            </h2>
            <p className="mt-3 text-muted-foreground">
              Start free. Unlock the full picture when you need it.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Free */}
            <div className="rounded-2xl border border-border bg-white p-8">
              <div className="text-sm font-medium text-muted-foreground">FREE</div>
              <div className="mt-2 text-4xl font-bold">$0</div>
              <p className="mt-2 text-sm text-muted-foreground">Always free, no credit card</p>
              <ul className="mt-6 space-y-3">
                {[
                  "Full 15-question screener",
                  "Top 2 visa matches",
                  "Basic eligibility explanation",
                  "Red flags identified",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/screener"
                className="mt-8 block rounded-lg border border-blue-600 px-4 py-3 text-center text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Start for free
              </Link>
            </div>

            {/* Premium */}
            <div className="relative rounded-2xl border-2 border-blue-600 bg-white p-8 shadow-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">
                MOST POPULAR
              </div>
              <div className="text-sm font-medium text-blue-600">PREMIUM</div>
              <div className="mt-2 text-4xl font-bold">$29</div>
              <p className="mt-2 text-sm text-muted-foreground">One-time, instant access</p>
              <ul className="mt-6 space-y-3">
                {[
                  "Everything in Free",
                  "All visa matches (up to 5)",
                  "Document checklist per visa",
                  "Step-by-step next actions",
                  "Success likelihood score",
                  "Downloadable PDF report",
                  "Attorney consultation CTA",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/screener"
                className="mt-8 block rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Get full report — $29
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section id="disclaimer" className="border-t border-amber-200 bg-amber-50 px-4 py-10">
        <div className="container mx-auto max-w-3xl text-center">
          <Shield className="mx-auto h-8 w-8 text-amber-600" />
          <h3 className="mt-3 text-lg font-semibold text-amber-800">
            Important Legal Disclaimer
          </h3>
          <p className="mt-2 text-sm text-amber-700">
            This tool provides <strong>general informational screening only</strong> and
            does <strong>not</strong> constitute legal advice. Immigration laws change
            frequently and vary by individual circumstances. Always consult a licensed
            immigration attorney before making any immigration decisions. visaAI is not
            a law firm and does not provide legal representation.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-4 py-20">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold text-navy-900 md:text-4xl">
            Frequently asked questions
          </h2>
          <div className="mt-10 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-border bg-white p-6">
                <h3 className="font-semibold text-navy-900">{faq.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-950 px-4 py-20 text-white">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to find your visa pathway?
          </h2>
          <p className="mt-4 text-gray-300">
            Free to start. No account required. Get your results in minutes.
          </p>
          <Link
            href="/screener"
            className="mt-8 inline-block rounded-xl bg-blue-500 px-8 py-4 text-lg font-semibold hover:bg-blue-400 transition-colors"
          >
            Start Free Screening →
          </Link>
        </div>
      </section>
    </div>
  )
}
