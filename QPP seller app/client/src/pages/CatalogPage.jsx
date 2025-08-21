import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import api from '../api/client'
import CatalogForm from '../components/CatalogForm'
import CatalogTable from '../components/CatalogTable'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import TopCategories from '../components/TopCategories'

export default function CatalogPage(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const providerId = localStorage.getItem('providerId')
  const location = useLocation()

  const load = async (category)=>{
    const params = { providerId }
    if (category) params.category = category
    const { data } = await api.get('/catalog', { params })
    setItems(data)
  }

  useEffect(()=>{
    const q = new URLSearchParams(location.search)
    const category = q.get('category')
    load(category)
  }, [location.search])

  const add = async (payload)=>{
  setLoading(true)
  try {
    // strip images before sending to backend
    const { images, ...rest } = payload
    const { data } = await api.post('/catalog', rest)
    // reattach previews only in frontend state
    setItems(prev=>[{ ...data, images: images || [] }, ...prev])
  } catch (err) {
    console.error("❌ Error adding item:", err.response?.data || err.message)
    alert("Failed to add item")
  } finally { setLoading(false) }
}


  const toggle = async (it)=>{
    const { data } = await api.patch(`/catalog/${it._id}/toggle`)
    setItems(prev=> prev.map(x=> x._id===it._id ? data : x))
  }

  const remove = async (it)=>{
    if (!confirm('Delete this item?')) return
    await api.delete(`/catalog/${it._id}`)
    setItems(prev=> prev.filter(x=> x._id!==it._id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-900 via-brand-800 to-brand-700">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        <h1 className="text-2xl md:text-3xl text-white font-bold">Catalog</h1>
        <TopCategories />
        <CatalogForm onSubmit={add} loading={loading} />
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
          <CatalogTable items={items} onToggle={toggle} onDelete={remove} />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
