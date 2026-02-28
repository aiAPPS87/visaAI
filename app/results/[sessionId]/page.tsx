import { notFound } from "next/navigation"
import Link from "next/link"
import { createServiceClient } from "@/lib/supabase"
import type { ScreeningSession } from "@/lib/types"
import VisaCard from "@/components/results/VisaCard"
import PremiumUnlock from "@/components/results/PremiumUnlock"
import { AlertTriangle, Download, Phone } from "lucide-react"

export const dynamic = "force-dynamic"

async function getSession(sessionId: string): Promise<ScreeningSession | null> {
  try {
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from("screening_sessions")
      .select("*")
      .eq("id", sessionId)
      .single()
    if (error || !data) return null
    return {
      id: data.id,
      userId: data.user_id,
      createdAt: data.created_at,
      status: data.status,
      intakeResponses: data.intake_responses,
      aiReport: data.ai_report,
      destinationCountry: data.destination_country,
      purpose: data.purpose,
      isPremium: data.is_premium ?? false,
    }
  } catch {
    return null
  }
}

export default async function ResultsPage({
  params,
}: {
  params: { sessionId: string }
}) {
  const session = await getSession(params.sessionId)
  if (!session || !session.aiReport) notFound()

  const { aiReport, isPremium } = session
  const freeMatches = aiReport.visaMatches.slice(0, 2)
  const premiumMatches = aiReport.visaMatches.slice(2)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto max-w-3xl px-4 py-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-sm text-emerald-700 mb-4">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Analysis complete
          </div>
          <h1 className="text-3xl font-bold text-navy-900 md:text-4xl">
            Your Visa Eligibility Report
          </h1>
          <p className="mt-2 text-muted-foreground">
            {aiReport.visaMatches.length} visa pathways analyzed for{" "}
            <strong>{session.destinationCountry}</strong>
          </p>
        </div>

        {/* Summary */}
        <div className="mb-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            AI Summary
          </h2>
          <p className="mt-2 text-gray-700">{aiReport.summary}</p>
          {aiReport.bestPath && (
            <div className="mt-4 border-t border-blue-200 pt-4">
              <span className="text-xs font-semibold text-blue-600">
                RECOMMENDED PATH:
              </span>
              <p className="mt-1 text-sm font-medium text-navy-900">
                {aiReport.bestPath.visaCode}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                {aiReport.bestPath.reasoning}
              </p>
            </div>
          )}
        </div>

        {/* General red flags */}
        {aiReport.generalRedFlags?.length > 0 && (
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-semibold">Profile concerns to address</span>
            </div>
            <ul className="mt-3 space-y-1">
              {aiReport.generalRedFlags.map((flag) => (
                <li key={flag} className="text-sm text-amber-700">• {flag}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Visa matches */}
        <h2 className="mb-4 text-lg font-bold text-navy-900">
          Your visa matches
        </h2>
        <div className="space-y-6">
          {freeMatches.map((match, i) => (
            <VisaCard
              key={match.visaCode}
              match={match}
              isPremium={isPremium}
              rank={i}
            />
          ))}
        </div>

        {/* Premium upsell or locked cards */}
        {!isPremium && premiumMatches.length > 0 && (
          <div className="mt-8">
            <div className="space-y-6">
              {premiumMatches.map((match, i) => (
                <VisaCard
                  key={match.visaCode}
                  match={match}
                  isPremium={false}
                  rank={i + 2}
                  isLocked
                />
              ))}
            </div>
            <PremiumUnlock sessionId={session.id} />
          </div>
        )}

        {/* Premium cards (unlocked) */}
        {isPremium && premiumMatches.length > 0 && (
          <div className="mt-6 space-y-6">
            {premiumMatches.map((match, i) => (
              <VisaCard
                key={match.visaCode}
                match={match}
                isPremium={true}
                rank={i + 2}
              />
            ))}
          </div>
        )}

        {/* Premium actions */}
        {isPremium && (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="flex items-center justify-center gap-2 rounded-xl border border-blue-300 bg-blue-50 px-6 py-3 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors">
              <Download className="h-4 w-4" />
              Download PDF Report
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-700 transition-colors">
              <Phone className="h-4 w-4" />
              Book Attorney Consultation
            </button>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-700">
          <strong>Disclaimer:</strong> This report is for informational purposes only and
          does not constitute legal advice. Immigration laws change frequently. Always
          consult a licensed immigration attorney before making immigration decisions.
        </div>

        {/* Re-run */}
        <div className="mt-6 text-center">
          <Link
            href="/screener"
            className="text-sm text-blue-600 underline hover:text-blue-700"
          >
            Run a new screening
          </Link>
        </div>
      </div>
    </div>
  )
}
