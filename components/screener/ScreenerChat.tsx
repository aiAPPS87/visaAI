"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, CheckCircle, Shield } from "lucide-react"
import { SCREENER_QUESTIONS } from "@/lib/screener-questions"
import type { IntakeResponses } from "@/lib/types"

const TOTAL = SCREENER_QUESTIONS.length

type Answers = Partial<IntakeResponses> & { denialDetails?: string }

export default function ScreenerChat() {
  const router = useRouter()
  const [step, setStep] = useState(-1) // -1 = disclaimer screen
  const [answers, setAnswers] = useState<Answers>({})
  const [inputValue, setInputValue] = useState("")
  const [selectedMulti, setSelectedMulti] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [step])

  const currentQ = step >= 0 ? SCREENER_QUESTIONS[step] : null
  const progress = step >= 0 ? Math.round(((step + 1) / TOTAL) * 100) : 0

  function handleStart() {
    setStep(0)
  }

  function handleAnswer(value: unknown) {
    if (!currentQ) return
    const updated = { ...answers, [currentQ.id]: value }
    setAnswers(updated)
    setInputValue("")
    setSelectedMulti([])
    setError("")

    // Extra question for denials
    if (currentQ.id === "priorVisaDenials" && value === true) {
      // insert a follow-up — we handle it inline
    }

    if (step + 1 < TOTAL) {
      setStep(step + 1)
    } else {
      submitScreening(updated)
    }
  }

  function handleTextSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!inputValue.trim()) {
      setError("Please enter a value to continue.")
      return
    }
    const q = currentQ!
    if (q.type === "number") {
      const num = Number(inputValue)
      if (isNaN(num) || num < 0) {
        setError("Please enter a valid number.")
        return
      }
      handleAnswer(num)
    } else {
      handleAnswer(inputValue.trim())
    }
  }

  function handleMultiSubmit() {
    if (selectedMulti.length === 0) {
      setError("Please select at least one option.")
      return
    }
    handleAnswer(selectedMulti)
  }

  async function submitScreening(finalAnswers: Answers) {
    setLoading(true)
    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intakeResponses: finalAnswers }),
      })
      if (!res.ok) throw new Error("Failed to save session")
      const data = await res.json()
      router.push(`/results/${data.sessionId}`)
    } catch {
      setLoading(false)
      setError("Something went wrong. Please try again.")
    }
  }

  // Disclaimer screen
  if (step === -1) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
          <Shield className="mx-auto h-12 w-12 text-amber-600" />
          <h2 className="mt-4 text-xl font-bold text-amber-900">
            Before you begin
          </h2>
          <p className="mt-3 text-sm text-amber-800 leading-relaxed">
            visaAI provides <strong>general informational screening only</strong> and
            does <strong>not</strong> constitute legal advice. Immigration laws change
            frequently. Always consult a licensed immigration attorney before making
            any decisions.
          </p>
          <p className="mt-3 text-sm text-amber-700">
            By continuing, you acknowledge that this tool is for informational
            purposes only.
          </p>
          <button
            onClick={handleStart}
            className="mt-6 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            I understand — Start Screening
          </button>
        </div>
      </div>
    )
  }

  // Loading / analyzing
  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <div className="text-center">
          <h3 className="text-lg font-semibold text-navy-900">
            Analyzing your profile…
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Our AI is reviewing your responses against current visa requirements.
            This takes about 15–20 seconds.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Step {step + 1} of {TOTAL}</span>
          <span>{progress}% complete</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-gray-100">
          <div
            className="h-2 rounded-full bg-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Chat bubbles — completed answers */}
      <div className="space-y-4">
        {SCREENER_QUESTIONS.slice(0, step).map((q, i) => {
          const val = answers[q.id as keyof Answers]
          const displayVal =
            Array.isArray(val)
              ? (val as string[]).join(", ")
              : typeof val === "boolean"
              ? val ? "Yes" : "No"
              : String(val ?? "")
          const label =
            q.options?.find((o) => o.value === String(val))?.label ?? displayVal

          return (
            <div key={q.id} className="animate-fade-in">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                  AI
                </div>
                <div className="rounded-2xl rounded-tl-none bg-gray-100 px-4 py-3 text-sm text-gray-700">
                  {q.question}
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <div className="flex items-center gap-2 rounded-2xl rounded-tr-none bg-blue-600 px-4 py-2 text-sm text-white">
                  <CheckCircle className="h-3.5 w-3.5 shrink-0" />
                  {label}
                </div>
              </div>
            </div>
          )
        })}

        {/* Current question */}
        {currentQ && (
          <div className="animate-fade-in">
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                AI
              </div>
              <div className="rounded-2xl rounded-tl-none bg-gray-100 px-4 py-3">
                <p className="text-sm font-medium text-gray-800">
                  {currentQ.question}
                </p>
                {currentQ.hint && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {currentQ.hint}
                  </p>
                )}
              </div>
            </div>

            {/* Answer input */}
            <div className="mt-4 ml-11">
              {/* Text / number */}
              {(currentQ.type === "text" || currentQ.type === "number") && (
                <form onSubmit={handleTextSubmit} className="flex gap-2">
                  <input
                    autoFocus
                    type={currentQ.type === "number" ? "number" : "text"}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={currentQ.placeholder}
                    className="flex-1 rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    min={currentQ.type === "number" ? 0 : undefined}
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 transition-colors"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}

              {/* Select */}
              {currentQ.type === "select" && (
                <div className="flex flex-wrap gap-2">
                  {currentQ.options?.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(opt.value)}
                      className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm hover:border-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Boolean */}
              {currentQ.type === "boolean" && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAnswer(true)}
                    className="rounded-xl border border-border bg-white px-6 py-2.5 text-sm hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
                    className="rounded-xl border border-border bg-white px-6 py-2.5 text-sm hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    No
                  </button>
                </div>
              )}

              {/* Multiselect */}
              {currentQ.type === "multiselect" && (
                <div>
                  <div className="flex flex-wrap gap-2">
                    {currentQ.options?.map((opt) => {
                      const selected = selectedMulti.includes(opt.value)
                      return (
                        <button
                          key={opt.value}
                          onClick={() =>
                            setSelectedMulti((prev) =>
                              selected
                                ? prev.filter((v) => v !== opt.value)
                                : [...prev, opt.value]
                            )
                          }
                          className={`rounded-xl border px-4 py-2.5 text-sm transition-colors ${
                            selected
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-border bg-white hover:border-blue-400"
                          }`}
                        >
                          {opt.label}
                        </button>
                      )
                    })}
                  </div>
                  <button
                    onClick={handleMultiSubmit}
                    className="mt-3 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              {error && (
                <p className="mt-2 text-xs text-red-500">{error}</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div ref={bottomRef} />
    </div>
  )
}
