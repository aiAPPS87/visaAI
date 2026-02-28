import type { Metadata } from "next"
import ScreenerChat from "@/components/screener/ScreenerChat"

export const metadata: Metadata = {
  title: "Visa Eligibility Screener — visaAI",
  description: "Answer 15 questions and get your personalized visa eligibility report.",
}

export default function ScreenerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto py-6">
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold text-navy-900">
            Visa Eligibility Screener
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Answer honestly for the most accurate results.
          </p>
        </div>
        <ScreenerChat />
      </div>
    </div>
  )
}
