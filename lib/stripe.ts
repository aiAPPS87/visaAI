import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export const PREMIUM_PRICE_USD = 29

export async function createPaymentIntent(
  sessionId: string,
  userId?: string
): Promise<string> {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: PREMIUM_PRICE_USD * 100, // in cents
    currency: "usd",
    metadata: { sessionId, userId: userId ?? "anonymous" },
    description: "visaAI Premium Report Unlock",
  })
  return paymentIntent.client_secret!
}
