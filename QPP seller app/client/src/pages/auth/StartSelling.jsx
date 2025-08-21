import { Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";

export default function StartSelling() {
  return (
    <AuthLayout noCard>
      <section className="relative min-h-[60vh] flex items-start justify-center pt-2">
        <div className="max-w-7xl w-full mx-auto px-4 md:px-10 py-6 md:py-8 grid gap-4 md:gap-6 md:grid-cols-[30%_70%] items-stretch -mt-8 md:-mt-8">
          {/* LEFT: title & description */}
          <div className="text-white flex flex-col justify-center h-full">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4 drop-shadow-lg">
              Become a Seller
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              Choose how you want to sell on QNNEX
            </p>
            {/* decorative image removed per request */}
          </div>

          {/* RIGHT: Card container */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full items-stretch md:justify-end">
            {/* Local Seller */}
            <div className="w-full md:w-72 flex flex-col justify-between rounded-2xl border border-indigo-400/30 bg-white/10 backdrop-blur-lg p-5 text-white shadow-lg hover:scale-[1.02] hover:shadow-indigo-400/30 transition-transform duration-200 min-h-[150px]">
              <h3 className="text-2xl font-bold mb-2">Local Seller</h3>
              <p className="mb-4 text-white/80">
                Quick setup for individuals. Create your personal seller account and start selling.
              </p>
              <ul className="mb-4 space-y-2 text-sm text-white/80">
                <li>• Simple onboarding</li>
                <li>• Manage catalog &amp; orders</li>
                <li>• Get paid in PKR</li>
              </ul>
              <div className="mt-2 md:mt-4">
                <Link
                  to="/register-local"
                  className="inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold bg-indigo-600 hover:bg-indigo-500 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-400/40 w-full md:w-auto text-center text-sm"
                >
                  Continue as Local Seller
                </Link>
              </div>
            </div>

            {/* Register Ongoing Business */}
            <div className="w-full md:w-72 flex flex-col justify-between rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg p-5 text-white shadow-lg hover:scale-[1.02] hover:shadow-white/30 transition-transform duration-200 min-h-[150px]">
              <h3 className="text-2xl font-bold mb-2">Register Ongoing Business</h3>
              <p className="mb-4 text-white/80">
                For registered businesses. Complete a short onboarding to verify your company.
              </p>
              <ul className="mb-4 space-y-2 text-sm text-white/80">
                <li>• Business verification</li>
                <li>• Multi-user access (optional)</li>
                <li>• Invoices &amp; reporting</li>
              </ul>
              <div className="mt-2 md:mt-4">
                <Link
                  to="/register-business"
                  className="inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold bg-white/20 hover:bg-white/30 border border-white/30 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-white/40 w-full md:w-auto text-center text-sm"
                >
                  Start Business Onboarding
                </Link>
              </div>
            </div>
      </div>
        </div>
      </section>
    </AuthLayout>
  );
}
