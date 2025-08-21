import { pkr } from '../utils/format'

export default function CatalogTable({ items=[], onToggle, onDelete }){
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-white/90">
        <thead className="text-left text-white/60">
          <tr>
            <th className="py-3">Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {items.map(it=>(
            <tr key={it._id || it.name} className="hover:bg-white/5">
              <td className="py-3">
                {it.images && it.images.length > 0 && (
                  <img src={it.images[0]} alt="preview" className="w-12 h-12 object-cover rounded" />
                )}
              </td>
              <td>{it.name}</td>
              <td>{it.category || '-'}</td>
              <td>{pkr(it.pricePKR)}</td>
              <td>{it.stock}</td>
              <td>
                <span className={"px-2 py-1 rounded text-xs " + (it.isActive ? "bg-pak-600/30 text-pak-100" : "bg-white/10 text-white/70")}>
                  {it.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="text-right space-x-2">
                <button onClick={()=>onToggle(it)} className="px-3 py-1 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20">
                  {it.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button onClick={()=>onDelete(it)} className="px-3 py-1 rounded-lg bg-red-600/80 hover:bg-red-700 text-white">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
