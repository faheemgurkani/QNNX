import { useState, useRef } from 'react'

const CATEGORIES = [
  'Groceries & Pets',
  'Health & Beauty',
  "Men's Fashion",
  "Women's Fashion",
  'Mother & Baby',
  'Home & Lifestyle',
  'Electronic Devices',
  'Electronic Accessories',
  'TV & Home Appliances',
  'Sports & Outdoor',
  'Watches, Bags & Jewellery',
  'Automotive & Motorbike'
]

export default function CatalogForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    pricePKR: '',
    stock: 0,
    fulfilmentType: 'GOODS',
    isActive: true
  })
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const inputRef = useRef(null)

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const onFileChange = (e) => {
    const added = Array.from(e.target.files || [])
    const combined = [...files, ...added].slice(0, 10)
    setFiles(combined)

    // generate previews
    const readers = added.map(f => new Promise((res, rej) => {
      const r = new FileReader()
      r.onload = () => res(r.result)
      r.onerror = rej
      r.readAsDataURL(f)
    }))
    Promise.all(readers).then(newData =>
      setPreviews(prev => [...prev, ...newData].slice(0, 10))
    )

    if (inputRef.current) inputRef.current.value = ''
  }

  const removeImage = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name || !form.category || !form.pricePKR) {
      return alert("Please fill all required fields")
    }

    const providerId = localStorage.getItem('providerId') || 'anon'

    // send only details to backend, keep previews frontend-only
    onSubmit({
      ...form,
      pricePKR: Number(form.pricePKR),
      stock: Number(form.stock),
      providerId,
      images: previews // frontend only
    })

    // reset form
    setForm({ name:'', description:'', category:'', pricePKR:'', stock:0, fulfilmentType:'GOODS', isActive:true })
    setFiles([])
    setPreviews([])
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-white/80 mb-1">Name</label>
          <input
            className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-white"
            value={form.name}
            onChange={e => set('name', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-white/80 mb-1">Category</label>
          <select
            className="w-full rounded-lg bg-white text-slate-900 border border-white/15 px-3 py-2"
            value={form.category}
            onChange={e => set('category', e.target.value)}
            required
          >
            <option value="" className="text-slate-900">Select category</option>
            {CATEGORIES.map(c => (
              <option key={c} value={c} className="text-slate-900">{c}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-white/80 mb-1">Description</label>
          <textarea
            className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-white"
            rows={3}
            value={form.description}
            onChange={e => set('description', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-white/80 mb-1">Price (PKR)</label>
          <input
            type="number"
            min="0"
            className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-white"
            value={form.pricePKR}
            onChange={e => set('pricePKR', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-white/80 mb-1">Stock</label>
          <input
            type="number"
            min="0"
            className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-white"
            value={form.stock}
            onChange={e => set('stock', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-white/80 mb-1">Fulfilment Type</label>
          <div className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-white">GOODS</div>
        </div>
      </div>

      <div>
        <label className="block text-sm text-white/80 mb-1">Product images (optional, not stored)</label>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onFileChange}
          className="text-sm text-white/80"
        />
        <div className="mt-3 grid grid-cols-4 gap-3">
          {previews.map((p, idx) => (
            <div key={idx} className="relative rounded-md overflow-hidden border border-white/10">
              <img src={p} alt={`preview-${idx}`} className="w-full h-24 object-cover" />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-pak-600 hover:bg-pak-700 text-white px-4 py-2 rounded-lg"
        >
          {loading ? 'Saving...' : 'Add Item'}
        </button>
      </div>
    </form>
  )
}
