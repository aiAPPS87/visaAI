import Anthropic from "@anthropic-ai/sdk"
import type { IntakeResponses, AIReport } from "./types"

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SYSTEM_PROMPT = `You are an expert immigration consultant with deep knowledge of visa requirements across the US, Canada, UK, Australia, and Germany.

Your role is to analyze a user's profile and identify the most suitable visa pathways for them.

Always be honest about low eligibility — do not give false hope.
Explain your reasoning clearly in plain language a non-lawyer can understand.
Flag any potential issues or disqualifying factors upfront.
Structure your response as valid JSON matching the schema provided.
Never provide legal advice — frame all output as informational screening only.`

const RESPONSE_SCHEMA = `{
  "visaMatches": [
    {
      "visaName": "string",
      "visaCode": "string",
      "country": "US|Canada|UK|Australia|Germany",
      "eligibilityLevel": "High|Medium|Low",
      "matchScore": 0-100,
      "description": "string",
      "whyItFits": "string (plain language explanation)",
      "keyRequirements": ["string"],
      "processingTime": "string",
      "costUsd": "string",
      "redFlags": ["string"],
      "documentChecklist": ["string"],
      "nextSteps": ["string"]
    }
  ],
  "bestPath": {
    "visaCode": "string",
    "reasoning": "string"
  },
  "generalRedFlags": ["string"],
  "summary": "string (2-3 sentences overview)"
}`

export async function analyzeEligibility(
  intake: IntakeResponses
): Promise<AIReport> {
  const userPrompt = `Analyze this applicant's profile and return the top 3-5 visa options they may qualify for.

APPLICANT PROFILE:
- Nationality: ${intake.nationality}
- Current residence: ${intake.residence}
- Target destination: ${intake.destination}
- Purpose of move: ${intake.purpose}
- Age: ${intake.age}
- Education level: ${intake.education}
- Years of work experience: ${intake.workExperience}
- Job title: ${intake.jobTitle}
- Field of work: ${intake.jobField}
- Has job offer in destination: ${intake.hasJobOffer ? "Yes" : "No"}
- Annual income: ${intake.annualIncome ? `$${intake.annualIncome.toLocaleString()}` : "Not provided"}
- Net worth: ${intake.netWorth ? `$${intake.netWorth.toLocaleString()}` : "Not provided"}
- Family ties in destination: ${intake.familyTies || "None"}
- Language proficiency: ${intake.languageProficiency.join(", ")}
- Prior visa denials: ${intake.priorVisaDenials ? `Yes - ${intake.denialDetails || "details not provided"}` : "No"}
- Intended length of stay: ${intake.intendedStay}

Return your analysis as valid JSON matching this exact schema:
${RESPONSE_SCHEMA}

Focus on visa pathways for ${intake.destination}. Rank matches from most to least eligible. Be honest about disqualifying factors.`

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userPrompt }],
  })

  const content = message.content[0]
  if (content.type !== "text") throw new Error("Unexpected response type")

  // Extract JSON from the response
  const jsonMatch = content.text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error("No JSON found in response")

  const report = JSON.parse(jsonMatch[0]) as AIReport
  return report
}
