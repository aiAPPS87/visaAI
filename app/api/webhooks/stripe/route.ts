import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createServiceClient } from "@/lib/supabase"
import type Stripe from "stripe"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get("stripe-signature")

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    const { sessionId, userId } = paymentIntent.metadata

    const supabase = createServiceClient()

    // Mark session as premium
    await supabase
      .from("screening_sessions")
      .update({ is_premium: true })
      .eq("id", sessionId)

    // Record payment
    await supabase.from("payments").insert({
      user_id: userId !== "anonymous" ? userId : null,
      session_id: sessionId,
      stripe_payment_intent_id: paymentIntent.id,
      amount: paymentIntent.amount,
      status: "succeeded",
    })
  }

  return NextResponse.json({ received: true })
}
