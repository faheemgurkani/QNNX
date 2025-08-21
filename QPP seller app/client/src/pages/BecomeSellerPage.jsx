import { Link } from "react-router-dom";

export default function BecomeSellerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-900 to-indigo-800 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-8 items-center">
        {/* Heading */}
        <header className="order-2 md:order-1 md:pr-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">Become a Seller</h1>
          <p className="text-indigo-100/80 text-lg max-w-xl">
            Join QNNEX as a seller — choose the option that fits you. Fast onboarding,
            clear tools to manage your catalog, and easy payouts.
          </p>
        </header>

        {/* Cards */}
        <section className="order-1 md:order-2">
          <div className="bg-white/6 backdrop-blur rounded-2xl p-6 md:p-8 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              {/* Local Seller Card */}
              <article className="flex-1 bg-white/5 border border-white/12 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Local Seller</h2>
                  <p className="text-sm text-white/80 mb-4">
                    If you're already selling locally, quickly sign in and connect your
                    existing store to QNNEX.
                  </p>
                  <ul className="text-sm text-white/70 space-y-2 mb-4">
                    <li>• Fast sign-in flow</li>
                    <li>• Manage products & orders</li>
                    <li>• Local payouts</li>
                  </ul>
                </div>
                <div className="mt-2">
                  <Link
                    to="/local-seller-signup"
                    className="block text-center w-full md:w-auto px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-semibold shadow-sm"
                  >
                    Local Seller
                  </Link>
                </div>
              </article>

              {/* New Seller Card */}
              <article className="flex-1 bg-white/5 border border-white/12 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">New Seller</h2>
                  <p className="text-sm text-white/80 mb-4">
                    New to selling? Register your business or personal account and
                    start listing products in minutes.
                  </p>
                  <ul className="text-sm text-white/70 space-y-2 mb-4">
                    <li>• Simple registration</li>
                    <li>• Seller dashboard</li>
                    <li>• Helpful seller resources</li>
                  </ul>
                </div>
                <div className="mt-2">
                  <Link
                    to="/new-seller-signup"
                    className="block text-center w-full md:w-auto px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 font-semibold border border-white/20"
                  >
                    New Seller
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
