import { createClient } from "@supabase/supabase-js"

// Client-side Supabase instance (lazy — only created when called)
let _supabase: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) {
      throw new Error("Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local")
    }
    _supabase = createClient(url, key)
  }
  return _supabase
}

// Named export for backward compat — same lazy pattern
export const supabase = {
  auth: {
    signInWithOtp: (...args: Parameters<ReturnType<typeof createClient>["auth"]["signInWithOtp"]>) =>
      getSupabaseClient().auth.signInWithOtp(...args),
    signInWithOAuth: (...args: Parameters<ReturnType<typeof createClient>["auth"]["signInWithOAuth"]>) =>
      getSupabaseClient().auth.signInWithOAuth(...args),
  },
}

// Server-side client with service role key (use only in API routes / server components)
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error("Missing Supabase service role environment variables.")
  }
  return createClient(url, key, {
    auth: { persistSession: false },
  })
}
