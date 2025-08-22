import { Link } from "react-router-dom"

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* background tint to blend with your navy gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(65%_55%_at_10%_10%,rgba(255,255,255,0.06),transparent_60%)]" />

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 grid gap-10 md:grid-cols-2 items-center">
        {/* LEFT: headline + CTA (no “New Seller Incentives” pill) */}
        <div className="text-white">
          <h1 className="text-4xl leading-tight md:text-6xl md:leading-[1.05] font-extrabold">
            Create your <span className="text-brand-200">QNNEX</span> seller account
          </h1>

          <p className="mt-4 text-white/85 max-w-xl">
            Become part of the digital economy in Pakistan. Create your store, add products, and start selling today.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              to="/register"
              className="px-7 py-3 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white shadow-soft transition"
            >
              Sign up
            </Link>

            <p className="text-sm text-white/80">
              Get started in minutes — no upfront cost
            </p>
          </div>
        </div>

        {/* RIGHT: image card with sales mini-widget (removed “$100 off shipments” pill) */}
        <div className="relative group">
          <div className="rounded-3xl bg-white/7 backdrop-blur-sm p-2 md:p-3 border border-white/15 transition-transform duration-300 group-hover:-translate-y-1">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-soft">
              {/* Replace this image with any seller/fulfillment/team-at-laptop image you like */}
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1600&auto=format&fit=crop"
                alt="Sellers managing products and orders"
                className="w-full h-full object-cover aspect-[5/3]"
              />

              {/* floating sales card (kept) */}
              <div className="absolute right-4 bottom-4 bg-white rounded-xl shadow-soft border border-slate-100 p-4 w-[230px] transition-transform duration-300 group-hover:-translate-y-1">
                <div className="text-xs text-slate-500">Total sales</div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="text-xl font-bold text-slate-900">$26,340</div>
                  <div className="text-emerald-600 text-xs font-semibold">+17%</div>
                </div>
                {/* tiny sparkline (pure SVG) */}
                <svg viewBox="0 0 200 60" className="mt-2 w-full h-12">
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fb8c00" stopOpacity="0.7"/>
                      <stop offset="100%" stopColor="#fb8c00" stopOpacity="0.05"/>
                    </linearGradient>
                  </defs>
                  <path d="M0,45 C20,40 35,50 50,35 C70,15 95,30 110,22 C130,12 150,18 165,28 C180,38 190,26 200,20"
                        fill="none" stroke="#fb8c00" strokeWidth="3" />
                  <path d="M0,60 L0,45 C20,40 35,50 50,35 C70,15 95,30 110,22 C130,12 150,18 165,28 C180,38 190,26 200,20 L200,60 Z"
                        fill="url(#grad)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
 
