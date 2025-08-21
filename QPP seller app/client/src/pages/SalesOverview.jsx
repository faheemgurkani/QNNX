import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import PromoPlaceholder from '../assets/promo-placeholder.svg'

const stats = [
  { title: 'Total Pending Orders', value: '10', hint: 'Today' },
  { title: "Your Rating", value: '1.3', hint: '' },
  { title: 'Best Selling Product', value: '71%', hint: 'sales Contribution' },
  { title: 'New Product Creation', value: '1549', hint: '(Last 14 Days)' }
]

const labels = ['01','02','03','04','05','06','07','08','09']
const thisWeek = [1200,1800,1500,2300,2000,2500,2100,2300,1900]
const lastWeek = [1600,1400,1700,2000,1800,2200,1900,2100,1700]

function smoothPath(arr, w, h, max){
  // simple cubic smoothing using control points between points
  const points = arr.map((v,i)=> ({ x: (i/(arr.length-1))*w, y: h - (v/max*h) }))
  if (points.length < 2) return ''
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i=1;i<points.length;i++){
    const p = points[i]
    const prev = points[i-1]
    const cp1x = prev.x + (p.x - (points[i-2]?.x ?? prev.x))/2
    const cp1y = prev.y
    const cp2x = p.x - ((points[i+1]?.x ?? p.x) - prev.x)/2
    const cp2y = p.y
    d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p.x} ${p.y}`
  }
  return d
}

function LineChart({ a, b }){
  const all = [...a, ...b]
  const max = Math.max(...all)
  const w = 320, h = 120
  const paddingLeft = 30
  const innerW = w - paddingLeft - 10
  const innerH = h - 20

  const sx = (i)=> paddingLeft + (i/(a.length-1))*innerW
  const sy = (v)=> 10 + innerH - (v/max*innerH)

  const pathA = smoothPath(a, innerW, innerH, max)
  const pathB = smoothPath(b, innerW, innerH, max)

  // y ticks
  const ticks = [0.25,0.5,0.75,1]

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-40">
      {/* grid lines */}
      {ticks.map((t,idx)=> (
        <line key={idx} x1={paddingLeft} x2={w-10} y1={10 + innerH - innerH*t} y2={10 + innerH - innerH*t} stroke="#e6e9ef" strokeDasharray="3 4" />
      ))}

      {/* area fills (translate path coords) */}
      <g transform={`translate(${paddingLeft},10)`}>
        <path d={`${pathB} L ${innerW} ${innerH} L 0 ${innerH} Z`} fill="#fce7f3" opacity="0.9" transform={`translate(0,0)`} />
        <path d={`${pathA} L ${innerW} ${innerH} L 0 ${innerH} Z`} fill="#eef2ff" opacity="0.9" transform={`translate(0,0)`} />
        <path d={pathB} fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d={pathA} fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* y labels */}
      <g>
        {ticks.map((t,idx)=> (
          <text key={idx} x={6} y={10 + innerH - innerH*t + 4} fontSize="9" fill="#9aa0ad">${Math.round(max*t)}</text>
        ))}
      </g>

      {/* x labels */}
      <g>
        {a.map((_,i)=> (
          <text key={i} x={sx(i)} y={h-2} fontSize="9" fill="#9aa0ad" textAnchor="middle">{i+1}</text>
        ))}
      </g>
    </svg>
  )
}

function BarChart({ a, b }){
  const max = Math.max(...a, ...b)
  const w = 320, h = 120
  const paddingLeft = 20
  const innerW = w - paddingLeft - 10
  const innerH = h - 30
  const barGroupW = innerW / a.length

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-36">
      {/* horizontal grid */}
      {[0.25,0.5,0.75,1].map((t,idx)=> (
        <line key={idx} x1={paddingLeft} x2={w-10} y1={10 + innerH - innerH*t} y2={10 + innerH - innerH*t} stroke="#eef2f6" strokeDasharray="4 4" />
      ))}

      <g transform={`translate(${paddingLeft},10)`}>
        {a.map((v,i)=>{
          const x = i*barGroupW
          const h1 = (v/max)*innerH
          const h2 = (b[i]/max)*innerH
          return (
            <g key={i}>
              <rect x={x + barGroupW*0.12} y={innerH - h1} width={barGroupW*0.28} height={h1} fill="#4f46e5" rx="3" />
              <rect x={x + barGroupW*0.5} y={innerH - h2} width={barGroupW*0.28} height={h2} fill="#facc15" rx="3" />
            </g>
          )
        })}
      </g>

      {/* x labels */}
      {a.map((_,i)=> (
        <text key={i} x={paddingLeft + i*barGroupW + barGroupW/2} y={h-6} fontSize="10" fill="#9aa0ad" textAnchor="middle">{i+1}</text>
      ))}
    </svg>
  )
}

export default function SalesOverview(){
  return (
    <div className="min-h-screen bg-slate-100">
      <SiteHeader />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-slate-900">Overview</h1>

  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main column (3/4) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top small stat cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s,idx)=> (
                <div key={idx} className="bg-white/95 rounded-xl p-4 shadow-md border border-slate-100">
                  <div className="text-sm text-slate-500">{s.title}</div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-2xl font-bold text-slate-900">{s.value}</div>
                    <div className="text-xs text-slate-400">{s.hint}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/95 rounded-xl p-5 shadow-md border border-slate-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">Sales Summary</h3>
                    <div className="text-sm text-slate-500">3K <span className="text-red-500">↓ 2.1% vs Last Week</span></div>
                  </div>
                  <div className="text-xs text-slate-400">View Report ▾</div>
                </div>
                <div className="mt-4">
                  <LineChart a={thisWeek} b={lastWeek} />
                </div>
                <div className="mt-3 flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full" />This Week</div>
                  <div className="flex items-center gap-2"><span className="w-2 h-2 bg-yellow-400 rounded-full" />Last Week</div>
                </div>
              </div>

              <div className="bg-white/95 rounded-xl p-5 shadow-md border border-slate-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">Order Volume</h3>
                    <div className="text-sm text-slate-500">5.51K <span className="text-green-500">▲ 2.1% vs Last Week</span></div>
                  </div>
                  <div className="text-xs text-slate-400">View Report ▾</div>
                </div>
                <div className="mt-4">
                  <BarChart a={thisWeek} b={lastWeek} />
                </div>
                <div className="mt-3 flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full" />This week</div>
                  <div className="flex items-center gap-2"><span className="w-2 h-2 bg-yellow-400 rounded-full" />Last Week</div>
                </div>
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-white/95 rounded-xl p-5 shadow-md border border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Announcements</h3>
                <div className="text-sm text-slate-400">This Week</div>
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="py-3 border-b border-slate-100">Feb 11 — Zalora: Seller Communication Prioritization. Hi, you've likely seen email from Zalora Seller Helpdesk...</div>
                <div className="py-3 border-b border-slate-100">Feb 11 — [IMPORTANT] Update to API endpoint limit. Dear Seller, Following up from our previous announcement...</div>
                <div className="py-3 border-b border-slate-100">Feb 07 — Covid-19 Impact on Your Operations. Dear Seller, please immediately inform your Account...</div>
                <div className="py-3">Jan 26 — [IMPORTANT] API endpoint limit, please forward.</div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="px-3 py-1.5 rounded bg-white border border-slate-200 text-slate-600">View all</button>
              </div>
            </div>
          </div>

          {/* Right column (promotions / summary) */}
          <aside className="space-y-6">
            <div className="bg-white/95 rounded-xl p-4 shadow-md border border-slate-100">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Promotions</h4>
                <span className="text-xs text-slate-400">Coming Soon</span>
              </div>
              <div className="mt-4 bg-slate-50/80 rounded-lg p-3">
                <div className="h-28 bg-white/95 rounded-md flex items-center justify-center text-slate-400 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1526178618140-5a3b3f5d7d3b?auto=format&fit=crop&w=800&q=60" alt="promo" className="h-full w-full object-cover rounded-md" />
                </div>
                <div className="mt-3">
                  <div className="font-semibold">Lifestyle: 3.3 PAYDAY 2022</div>
                  <div className="text-sm text-slate-500">15% off min spend SGD 100 — HOME10</div>
                </div>
                <div className="mt-4">
                  <button className="w-full rounded-md bg-violet-700 text-white py-2">Join the Promotion</button>
                </div>
                <div className="mt-3 text-sm text-slate-500 flex items-center justify-between">
                  <div>Approved deals <span className="ml-2 font-semibold text-slate-700">1</span></div>
                  <div>Pending <span className="ml-2 font-semibold text-slate-700">-</span></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold">Summary</h4>
              <div className="mt-3 text-sm text-slate-600 space-y-3">
                <div className="flex items-center justify-between"><div className="text-slate-500">Conversion</div><div className="font-semibold">4.2%</div></div>
                <div className="flex items-center justify-between"><div className="text-slate-500">Avg. Shipping Time</div><div className="font-semibold">2.3 days</div></div>
                <div className="flex items-center justify-between"><div className="text-slate-500">Active Listings</div><div className="font-semibold">124</div></div>
              </div>
            </div>
          </aside>
        </div>

      </main>
      <SiteFooter />
    </div>
  )
}
