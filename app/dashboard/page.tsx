import type { Metadata } from "next"
import Link from "next/link"
import { FileText, Plus, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard — visaAI",
}

// In production this would fetch real sessions from Supabase for the logged-in user
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-4xl px-4 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy-900">My Screenings</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Your saved visa eligibility reports
            </p>
          </div>
          <Link
            href="/screener"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Screening
          </Link>
        </div>

        {/* Empty state */}
        <div className="mt-12 rounded-2xl border border-dashed border-border bg-white p-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-4 text-lg font-semibold text-gray-600">
            No screenings yet
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Run your first visa eligibility screening to see your results here.
          </p>
          <Link
            href="/screener"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Start free screening
          </Link>
        </div>

        {/* Example of what a populated state looks like (commented out for reference) */}
        {/*
        <div className="mt-6 space-y-4">
          {sessions.map((session) => (
            <Link
              key={session.id}
              href={`/results/${session.id}`}
              className="flex items-center justify-between rounded-xl border border-border bg-white p-5 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-navy-900">
                    {COUNTRY_FLAG[session.destinationCountry]} {session.destinationCountry} — {session.purpose}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(session.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {session.isPremium && (
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                    Premium
                  </span>
                )}
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
        */}
      </div>
    </div>
  )
}
