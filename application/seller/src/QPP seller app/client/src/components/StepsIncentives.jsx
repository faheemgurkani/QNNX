import { Link } from "react-router-dom"

export default function StepsIncentives() {
  return (
   <section className="bg-white/[0.01]">
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-2 items-center">
        {/* Left: Image with floating badges */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1600&auto=format&fit=crop"
            alt="Sellers collaborating"
            className="w-full rounded-2xl shadow-soft object-cover aspect-[4/3] select-none"
          />

          {/* Top-left badge */}
          <div className="absolute -top-4 -left-4 bg-white rounded-full shadow-soft px-4 py-2 border border-slate-100 flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-sm">★</span>
            <span className="text-sm font-medium text-slate-700">$100 off shipments</span>
          </div>

          {/* Bottom-left badge */}
          <div className="absolute -bottom-4 left-6 bg-white rounded-2xl shadow-soft px-4 py-3 border border-slate-100">
            <div className="text-xs inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              <span>New Seller Incentives</span>
            </div>
            <div className="mt-1 font-semibold text-slate-800">10% on your branded sales</div>
          </div>
        </div>

      {/* Right: Copy + checklist */}
<div className="glass p-6 md:p-8">
         <div className="inline-flex items-center gap-2 bg-emerald-100/80 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
  <span className="h-2 w-2 rounded-full bg-emerald-600" />
  New Seller Incentives — Pakistan
</div>

<h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white">
  Get started with <span className="text-brand-200">₨14,000,000</span> in incentives
</h2>

<p className="mt-2 text-white/80">
  Ready to sell with QNNEX? As a new seller in Pakistan, you can take advantage of a series of incentives while you set up.
</p>

<ul className="mt-6 space-y-4">
  <li className="flex items-start gap-3">
    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
    <p className="text-white/90">
      <strong>10% back</strong> on your first <strong>₨14,000,000</strong> in branded sales, then <strong>5% back</strong> through your first year until you reach <strong>₨280,000,000</strong>.
    </p>
  </li>
  <li className="flex items-start gap-3">
    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
    <p className="text-white/90">
      <strong>₨28,000 off</strong> shipments using our Partnered Carrier program within Pakistan.
    </p>
  </li>
  <li className="flex items-start gap-3">
    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
    <p className="text-white/90">
      <strong>Free storage &amp; customer returns</strong> with auto-enrollment in the New Selection program.
    </p>
  </li>
  <li className="flex items-start gap-3">
    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
    <p className="text-white/90">
      <strong>₨14,000 ad credit</strong> to create Sponsored Products or Sponsored Brands ads.
    </p>
  </li>
</ul>

<div className="mt-8 flex flex-wrap gap-3">
  <Link
    to="/start"
    className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-xl transition"
  >
    Start selling
  </Link>
  <Link
    to="/login"
    className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl transition"
  >
    I already have an account
  </Link>
</div>

        </div>
      </div>
    </section>
  )
}
