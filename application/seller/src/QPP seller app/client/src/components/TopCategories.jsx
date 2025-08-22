import { CATEGORIES } from '../constants/categories'
import { useNavigate } from 'react-router-dom'
// use external images to ensure they render in the circular avatars
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=600&q=60'
const IMAGES = {
  'Sports & Outdoor': 'https://images.unsplash.com/photo-1526403224744-4f6f47b1b8ba?auto=format&fit=crop&w=600&q=60',
  'Health & Beauty': 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=60',
  "Women's Fashion": 'https://images.unsplash.com/photo-1514995669114-5f3b5b5f3b1d?auto=format&fit=crop&w=600&q=60',
  'Watches, Bags & Jewellery': 'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?auto=format&fit=crop&w=600&q=60',
  "Men's Fashion": 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=60'
}

export default function TopCategories(){
  // choose some categories to feature
  const featured = [
    'Sports & Outdoor',
    "Men's Fashion",
    "Women's Fashion",
    'Health & Beauty'
  ]
  const navigate = useNavigate()

  return (
    <section className="mb-6">
      <h2 className="text-2xl font-semibold text-white mb-4">Top Categories</h2>
      <div className="flex gap-6 items-center overflow-x-auto py-4">
        {featured.map((c, idx)=> (
          <div key={idx} className="flex-shrink-0 w-40 text-center">
            <button onClick={()=> navigate(`/catalog?category=${encodeURIComponent(c)}`)} className="w-32 h-32 mx-auto rounded-full bg-white/90 flex items-center justify-center shadow-md hover:scale-105 transition-transform focus:outline-none">
              <img
                src={IMAGES[c] || FALLBACK_IMG}
                alt={c}
                className="w-24 h-24 object-contain"
                loading="lazy"
                onError={(e)=> { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG }}
              />
            </button>
            <div className="mt-3 text-sm text-white/90 font-medium">{c}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
