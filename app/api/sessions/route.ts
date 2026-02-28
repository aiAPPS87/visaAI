import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase"
import { analyzeEligibility } from "@/lib/anthropic"
import type { IntakeResponses } from "@/lib/types"

export const dynamic = "force-dynamic"

// Rate limit: 1 analysis per IP per 10 minutes
const rateLimitMap = new Map<string, number>()

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown"
  const now = Date.now()
  const last = rateLimitMap.get(ip) ?? 0

  if (now - last < 10 * 60 * 1000) {
    return NextResponse.json(
      { error: "Rate limit: one analysis per 10 minutes." },
      { status: 429 }
    )
  }
  rateLimitMap.set(ip, now)

  let body: { intakeResponses: IntakeResponses }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const { intakeResponses } = body
  if (!intakeResponses?.destination || !intakeResponses?.nationality) {
    return NextResponse.json(
      { error: "Incomplete intake responses" },
      { status: 400 }
    )
  }

  try {
    // 1. Run AI analysis
    const aiReport = await analyzeEligibility(intakeResponses)

    // 2. Save to Supabase
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from("screening_sessions")
      .insert({
        status: "completed",
        intake_responses: intakeResponses,
        ai_report: aiReport,
        destination_country: intakeResponses.destination,
        purpose: intakeResponses.purpose,
        is_premium: false,
      })
      .select("id")
      .single()

    if (error) throw error

    return NextResponse.json({ sessionId: data.id })
  } catch (err) {
    console.error("Session creation error:", err)
    return NextResponse.json(
      { error: "Failed to analyze profile. Please try again." },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get("id")
  if (!sessionId) {
    return NextResponse.json({ error: "Session ID required" }, { status: 400 })
  }

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from("screening_sessions")
    .select("*")
    .eq("id", sessionId)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 })
  }

  return NextResponse.json(data)
}
