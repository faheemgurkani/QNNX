import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import api from '../api/client'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import TopCategories from '../components/TopCategories'

export default function CategoriesPage() {
  const [items, setItems] = useState([])
  const providerId = localStorage.getItem('providerId') || 'anon'
  const location = useLocation()

  // fetch products
  const load = async (category) => {
    try {
      const params = { providerId }
      if (category) params.category = category
      const { data } = await api.get('/catalog', { params })
      setItems(data)
    } catch (err) {
      console.error('❌ Failed to load products:', err)
    }
  }

  useEffect(() => {
    const q = new URLSearchParams(location.search)
    const category = q.get('category')
    load(category)
  }, [location.search])

  // toggle active/inactive
  const toggle = async (it) => {
    try {
      const { data } = await api.patch(`/catalog/${it._id}/toggle`)
      setItems(prev => prev.map(x => x._id === it._id ? data : x))
    } catch (err) {
      console.error('❌ Failed to toggle product:', err)
    }
  }

  // delete product
  const remove = async (it) => {
    if (!confirm('Delete this product?')) return
    try {
      await api.delete(`/catalog/${it._id}`)
      setItems(prev => prev.filter(x => x._id !== it._id))
    } catch (err) {
      console.error('❌ Failed to delete product:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-900 via-brand-800 to-brand-700">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        <h1 className="text-2xl md:text-3xl text-white font-bold">Products</h1>

        <TopCategories />

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map(it => (
            <div
              key={it._id}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow flex flex-col"
            >
              {/* first image if available */}
              {it.images?.length > 0 && (
                <img
                  src={it.images[0]}
                  alt={it.name}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4 flex-1 flex flex-col">
                <div className="font-semibold text-white">{it.name}</div>
                <div className="text-sm text-white/70">{it.category || '—'}</div>
                <div className="text-sm text-white/80 mt-1">
                  Rs {it.pricePKR} • Stock: {it.stock}
                </div>
                <div className="text-xs mt-1 text-white/60">
                  {it.isActive ? 'Active' : 'Inactive'}
                </div>

                {/* Buttons */}
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => toggle(it)}
                    className="px-3 py-1 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-xs text-white"
                  >
                    {it.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => remove(it)}
                    className="px-3 py-1 rounded-lg bg-red-600/80 hover:bg-red-700 text-white text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {!items.length && (
            <div className="text-white/70">No products available.</div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
