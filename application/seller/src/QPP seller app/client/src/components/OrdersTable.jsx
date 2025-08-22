import { pkr } from '../utils/format'

export default function OrdersTable({ orders=[], onConfirm, onComplete, onCancel }){
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-white/90">
        <thead className="text-left text-white/60">
          <tr>
            <th className="py-3">Order ID</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Payment</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {orders.map(o=>{
            const itemsCount = o.items?.reduce((a,b)=>a+(b.qty||0),0) || 0
            const total = o.totals?.grandTotalPKR ?? 0
            const isActive = !['COMPLETED','CANCELLED'].includes(o.status)
            return (
              <tr key={o._id} className="hover:bg-white/5">
                <td className="py-3">{o._id}</td>
                <td>{itemsCount}</td>
                <td>{pkr(total)}</td>
                <td><span className="px-2 py-1 rounded text-xs bg-white/10">{o.status}</span></td>
                <td><span className="px-2 py-1 rounded text-xs bg-white/10">{o.paymentStatus||'PENDING'}</span></td>
                <td className="text-right space-x-2">
                  <button onClick={()=>onConfirm(o)} disabled={!isActive || o.status!=='PENDING'} className="px-3 py-1 rounded-lg bg-pak-600/80 hover:bg-pak-700 disabled:opacity-40 text-white">Confirm</button>
                  <button onClick={()=>onComplete(o)} disabled={!isActive || o.status!=='CONFIRMED'} className="px-3 py-1 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 disabled:opacity-40">Complete</button>
                  <button onClick={()=>onCancel(o)} disabled={!isActive} className="px-3 py-1 rounded-lg bg-red-600/80 hover:bg-red-700 disabled:opacity-40 text-white">Cancel</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
