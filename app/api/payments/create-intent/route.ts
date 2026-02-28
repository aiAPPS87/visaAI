import { NextResponse } from "next/server"
import { createPaymentIntent } from "@/lib/stripe"
import { createServiceClient } from "@/lib/supabase"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  let body: { sessionId: string; userId?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const { sessionId, userId } = body
  if (!sessionId) {
    return NextResponse.json({ error: "Session ID required" }, { status: 400 })
  }

  // Verify the session exists
  const supabase = createServiceClient()
  const { data: session, error } = await supabase
    .from("screening_sessions")
    .select("id, is_premium")
    .eq("id", sessionId)
    .single()

  if (error || !session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 })
  }

  if (session.is_premium) {
    return NextResponse.json(
      { error: "Session already has premium access" },
      { status: 400 }
    )
  }

  try {
    const clientSecret = await createPaymentIntent(sessionId, userId)
    return NextResponse.json({ clientSecret })
  } catch (err) {
    console.error("Payment intent error:", err)
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 }
    )
  }
}
