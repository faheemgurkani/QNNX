import { useEffect, useMemo, useState } from 'react'
import api from '../api/client'
import OrdersTable from '../components/OrdersTable'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

export default function OrdersPage(){
  const [orders, setOrders] = useState([])
  const [tab, setTab] = useState('ACTIVE')
  const providerId = localStorage.getItem('providerId')

  const load = async ()=>{
    const { data } = await api.get('/orders', { params: { providerId } })
    setOrders(data)
  }
  useEffect(()=>{ load() }, [])

  const filtered = useMemo(()=>{
    return orders.filter(o=> tab==='ACTIVE' ? !['COMPLETED','CANCELLED'].includes(o.status) : ['COMPLETED'].includes(o.status))
  }, [orders, tab])

  const confirmO = async (o)=>{
    const { data } = await api.post(`/orders/${o._id}/confirm`)
    setOrders(prev=> prev.map(x=> x._id===o._id ? data : x))
  }
  const completeO = async (o)=>{
    const { data } = await api.post(`/orders/${o._id}/complete`)
    setOrders(prev=> prev.map(x=> x._id===o._id ? data : x))
  }
  const cancelO = async (o)=>{
    const { data } = await api.post(`/orders/${o._id}/cancel`)
    setOrders(prev=> prev.map(x=> x._id===o._id ? data : x))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-900 via-brand-800 to-brand-700">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl text-white font-bold">Orders</h1>
          <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1">
            {['ACTIVE','COMPLETED'].map(t=>(
              <button key={t} onClick={()=>setTab(t)} className={"px-4 py-2 rounded-lg text-sm " + (tab===t? "bg-pak-600 text-white":"text-white/80 hover:bg-white/10")}>{t}</button>
            ))}
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
          <OrdersTable orders={filtered} onConfirm={confirmO} onComplete={completeO} onCancel={cancelO} />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
