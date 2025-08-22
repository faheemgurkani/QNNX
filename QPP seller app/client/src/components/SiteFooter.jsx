import { useState } from "react"
import { Link } from "react-router-dom"

function Icon({ title, children }) {
  return (
    <span
      role="img"
      aria-label={title}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-700/40 hover:bg-brand-600/60 text-white transition"
      title={title}
    >
      {children}
    </span>
  )
}

export default function SiteFooter() {
  const [email, setEmail] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()
    // TODO: wire to backend later
    alert(`Thanks! We'll keep you posted at: ${email}`)
    setEmail("")
  }

  return (
    <footer  className="mt-16 bg-gradient-to-b from-brand-900 via-brand-900 to-[#0b1a34] text-slate-200">
      {/* Top grid */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-12">
        {/* Newsletter */}
        <div className="md:col-span-5">
          <h3 className="text-lg font-semibold">Stay in the loop with our newsletter!</h3>
          <p className="mt-2 text-sm text-slate-400">
            Get tips, seller stories, and product updates. No spam—just useful stuff.
          </p>

          <form onSubmit={onSubmit} className="mt-5">
            <label htmlFor="newsletter" className="sr-only">Email address</label>
            <div className="group flex items-stretch rounded-xl border border-white/10 bg-white/5 focus-within:ring-2 focus-within:ring-brand-400">
              <input
                id="newsletter"
                type="email"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent px-4 py-3 text-slate-100 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 text-white hover:text-brand-200"
                aria-label="Subscribe"
                title="Subscribe"
              >
                ↗
              </button>
            </div>
          </form>

          <div className="mt-5 flex gap-4 text-xl">
            <a href="#" aria-label="Facebook"><Icon title="Facebook">f</Icon></a>
            <a href="#" aria-label="Instagram"><Icon title="Instagram">◎</Icon></a>
            <a href="#" aria-label="LinkedIn"><Icon title="LinkedIn">in</Icon></a>
            <a href="#" aria-label="Pinterest"><Icon title="Pinterest">P</Icon></a>
            <a href="#" aria-label="YouTube"><Icon title="YouTube">▶</Icon></a>
            <a href="#" aria-label="Twitter"><Icon title="Twitter">𝕏</Icon></a>
          </div>
        </div>

        {/* Link columns */}
        <div className="md:col-span-7 grid gap-10 sm:grid-cols-3">
          <div>
            <h4 className="mb-3 font-semibold text-white/90">Customer Care</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a className="hover:text-white" href="#">Help Center</a></li>
              <li><a className="hover:text-white" href="#">How to Sell</a></li>
              <li><a className="hover:text-white" href="#">Returns & Refunds</a></li>
              <li><a className="hover:text-white" href="#">Contact Us</a></li>
              <li><a className="hover:text-white" href="#">Pickup Points</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-white/90">Information</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a className="hover:text-white" href="#">Payments</a></li>
              <li><a className="hover:text-white" href="#">Shipping</a></li>
              <li><a className="hover:text-white" href="#">Seller Fees</a></li>
              <li><a className="hover:text-white" href="#">App Download</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-white/90">Company</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a className="hover:text-white" href="#">About Us</a></li>
              <li><a className="hover:text-white" href="#">Careers</a></li>
              <li><a className="hover:text-white" href="#">Press</a></li>
              <li><a className="hover:text-white" href="#">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-white/10" />

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} QNNEX. All rights reserved.
        </p>
        <nav className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
          <Link to="#" className="hover:text-white">Terms</Link>
          <span className="text-white/20">•</span>
          <Link to="#" className="hover:text-white">Privacy</Link>
          <span className="text-white/20">•</span>
          <Link to="#" className="hover:text-white">Cookies</Link>
        </nav>
      </div>
    </footer>
  )
}
