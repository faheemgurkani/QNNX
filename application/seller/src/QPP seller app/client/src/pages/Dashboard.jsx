import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import { Link } from 'react-router-dom'

export default function Dashboard(){ 
  const name = localStorage.getItem('name') || 'Seller'
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-900 via-brand-800 to-brand-700">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        <h1 className="text-2xl md:text-3xl text-white font-bold">Seller Dashboard</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="text-white font-semibold mb-2">Manage Catalog</h2>
            <p className="text-white/70 mb-4">Add products/services, set prices and stock.</p>
            <Link to="/catalog" className="inline-block px-4 py-2 rounded-lg bg-pak-600 hover:bg-pak-700 text-white">Go to Catalog</Link>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="text-white font-semibold mb-2">Orders</h2>
            <p className="text-white/70 mb-4">Confirm, complete or cancel orders.</p>
            <Link to="/orders" className="inline-block px-4 py-2 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-white">Go to Orders</Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )}
