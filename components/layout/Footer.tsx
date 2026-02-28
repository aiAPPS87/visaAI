import Link from "next/link"
import { Globe } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-navy-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <Globe className="h-5 w-5 text-blue-400" />
              <span className="text-lg">
                visa<span className="text-blue-400">AI</span>
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-gray-400">
              AI-powered visa eligibility screening. Discover your immigration
              options in minutes, not weeks.
            </p>
            <div className="mt-4 rounded-lg border border-yellow-600/30 bg-yellow-600/10 p-3 text-xs text-yellow-300">
              <strong>Disclaimer:</strong> This tool provides general informational
              screening only and does not constitute legal advice. Immigration laws
              change frequently. Always consult a licensed immigration attorney
              before making decisions.
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-200">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/screener" className="hover:text-white transition-colors">Eligibility Screener</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-200">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Sign in</Link></li>
              <li><a href="mailto:hello@visaai.app" className="hover:text-white transition-colors">Contact us</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} visaAI. Not a law firm. Not legal advice.
        </div>
      </div>
    </footer>
  )
}
