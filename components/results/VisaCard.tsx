"use client"

import { useState, useEffect } from "react"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Lock,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import type { VisaMatch } from "@/lib/types"
import { cn, eligibilityColor, eligibilityBarColor } from "@/lib/utils"

interface Props {
  match: VisaMatch
  isPremium: boolean
  rank: number
  isLocked?: boolean
}

const COUNTRY_FLAG: Record<string, string> = {
  US: "🇺🇸",
  Canada: "🇨🇦",
  UK: "🇬🇧",
  Australia: "🇦🇺",
  Germany: "🇩🇪",
}

export default function VisaCard({ match, isPremium, rank, isLocked = false }: Props) {
  const [expanded, setExpanded] = useState(rank === 0)
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(match.matchScore)
    }, 300 + rank * 200)
    return () => clearTimeout(timer)
  }, [match.matchScore, rank])

  return (
    <div
      className={cn(
        "relative rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md",
        rank === 0 && "border-blue-300 shadow-blue-50",
        isLocked && "opacity-75"
      )}
    >
      {rank === 0 && (
        <div className="absolute -top-3 left-6 rounded-full bg-blue-600 px-3 py-0.5 text-xs font-semibold text-white">
          Best Match
        </div>
      )}

      {isLocked && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm">
          <Lock className="h-8 w-8 text-gray-400" />
          <p className="mt-2 text-sm font-medium text-gray-600">
            Unlock with Premium Report
          </p>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">{COUNTRY_FLAG[match.country]}</span>
              <h3 className="font-bold text-navy-900">{match.visaName}</h3>
              <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500 font-mono">
                {match.visaCode}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{match.description}</p>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-full px-3 py-1 text-xs font-semibold",
              eligibilityColor(match.eligibilityLevel)
            )}
          >
            {match.eligibilityLevel} Match
          </span>
        </div>

        {/* Score bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Eligibility score</span>
            <span className="font-semibold text-gray-700">{animatedScore}%</span>
          </div>
          <div className="mt-1.5 h-2 rounded-full bg-gray-100">
            <div
              className={cn(
                "h-2 rounded-full transition-all duration-1000 ease-out",
                eligibilityBarColor(match.eligibilityLevel)
              )}
              style={{ width: `${animatedScore}%` }}
            />
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{match.processingTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-3.5 w-3.5" />
            <span>{match.costUsd}</span>
          </div>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex w-full items-center justify-between text-xs text-blue-600 hover:text-blue-700"
        >
          <span>{expanded ? "Show less" : "Show details"}</span>
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {expanded && (
          <div className="mt-4 space-y-4 border-t border-border pt-4 animate-fade-in">
            {/* Why it fits */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Why this fits your profile
              </h4>
              <p className="mt-1 text-sm text-gray-700">{match.whyItFits}</p>
            </div>

            {/* Key requirements */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Key requirements
              </h4>
              <ul className="mt-1 space-y-1">
                {match.keyRequirements.map((req) => (
                  <li key={req} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Red flags */}
            {match.redFlags.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Potential concerns
                </h4>
                <ul className="mt-1 space-y-1">
                  {match.redFlags.map((flag) => (
                    <li key={flag} className="flex items-start gap-2 text-sm text-amber-700">
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Premium: doc checklist + next steps */}
            {isPremium && match.documentChecklist && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Document checklist
                </h4>
                <ul className="mt-1 space-y-1">
                  {match.documentChecklist.map((doc) => (
                    <li key={doc} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {isPremium && match.nextSteps && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Recommended next steps
                </h4>
                <ol className="mt-1 list-decimal list-inside space-y-1">
                  {match.nextSteps.map((step) => (
                    <li key={step} className="text-sm text-gray-700">{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
