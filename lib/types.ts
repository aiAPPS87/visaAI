export type VisaCategory =
  | "work"
  | "study"
  | "family"
  | "investment"
  | "retirement"
  | "visitor"

export type EligibilityLevel = "High" | "Medium" | "Low"

export type DestinationCountry = "US" | "Canada" | "UK" | "Australia" | "Germany"

export interface IntakeResponses {
  nationality: string
  residence: string
  destination: DestinationCountry
  purpose: VisaCategory
  age: number
  education: string
  workExperience: number
  jobTitle: string
  jobField: string
  hasJobOffer: boolean
  annualIncome?: number
  netWorth?: number
  familyTies: string
  languageProficiency: string[]
  priorVisaDenials: boolean
  denialDetails?: string
  intendedStay: "temporary" | "permanent"
}

export interface VisaMatch {
  visaName: string
  visaCode: string
  country: DestinationCountry
  eligibilityLevel: EligibilityLevel
  matchScore: number // 0-100
  description: string
  whyItFits: string
  keyRequirements: string[]
  processingTime: string
  costUsd: string
  redFlags: string[]
  documentChecklist?: string[] // premium only
  nextSteps?: string[] // premium only
}

export interface AIReport {
  visaMatches: VisaMatch[]
  bestPath: {
    visaCode: string
    reasoning: string
  }
  generalRedFlags: string[]
  summary: string
}

export interface ScreeningSession {
  id: string
  userId?: string
  createdAt: string
  status: "in_progress" | "completed"
  intakeResponses?: IntakeResponses
  aiReport?: AIReport
  destinationCountry?: DestinationCountry
  purpose?: VisaCategory
  isPremium: boolean
}

export interface VisaDatabase {
  id: string
  country: DestinationCountry
  visaName: string
  visaCode: string
  category: VisaCategory
  description: string
  requirements: Record<string, string>
  processingTime: string
  costUsd: number
  officialUrl: string
  lastUpdated: string
}

export interface User {
  id: string
  email: string
  createdAt: string
  stripeCustomerId?: string
}

// Screener step types
export interface ScreenerQuestion {
  id: keyof IntakeResponses
  question: string
  type: "text" | "select" | "number" | "boolean" | "multiselect"
  options?: { value: string; label: string }[]
  placeholder?: string
  hint?: string
}
