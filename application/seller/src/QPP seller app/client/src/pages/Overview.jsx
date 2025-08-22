import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

const demoStats = {
  avgOrderValue: '$77.21',
  totalOrders: '2,107',
  lifetimeValue: '$653'
}

const salesSeries = [5000, 8000, 6000, 12000, 9000, 14000, 11000, 15000, 13000, 17000, 16000, 19000]

const topProducts = [
  { name: 'Red Tape Sports Shoes for Men', sales: '12,420' },
  { name: 'Fastrack F51 Pro Smartwatch', sales: '5,642' },
  { name: "Leriya Fashion Men's Shirt", sales: '7,223' }
]

const latestOrders = [
  { id: '#2456JL', product: 'Nike Sportswear', date: 'Jan 12, 12:23 pm', price: '$134.00', payment: 'Transfer', status: 'Processing' },
  { id: '#5435DF', product: 'Acqua di Parma', date: 'May 01, 01:13 pm', price: '$23.00', payment: 'Credit Card', status: 'Completed' },
  { id: '#9876XC', product: 'Allen Solly', date: 'Sep 20, 09:08 am', price: '$441.00', payment: 'Transfer', status: 'Completed' }
]

function Sparkline({ series }){
  const max = Math.max(...series)
  const points = series.map((v,i)=> `${(i/(series.length-1))*100},${100- (v/max*100)}` ).join(' ')
  return (
    <svg viewBox="0 0 100 100" className="w-full h-20">
      <polyline fill="none" stroke="#4f46e5" strokeWidth="2" points={points} />
    </svg>
  )
}

export default function Overview(){
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Welcome back , Bishop !</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="text-sm text-slate-500">AVG . Order Value</div>
              <div className="text-2xl font-bold mt-2">{demoStats.avgOrderValue}</div>
              <div className="text-xs text-green-600 mt-1">+3.19% From last month</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="text-sm text-slate-500">Total Orders</div>
              <div className="text-2xl font-bold mt-2">{demoStats.totalOrders}</div>
              <div className="text-xs text-red-500 mt-1">-1.18% From last month</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="text-sm text-slate-500">Lifetime Value</div>
              <div className="text-2xl font-bold mt-2">{demoStats.lifetimeValue}</div>
              <div className="text-xs text-green-600 mt-1">+2.24% From last month</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-sm text-slate-500">Top Selling Product</div>
            <ul className="mt-3 space-y-3">
              {topProducts.map((p,i)=> (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-slate-100 rounded flex items-center justify-center">IMG</div>
                  <div className="flex-1">
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-xs text-slate-500">{p.sales} Sales</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-lg p-6 shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">Sales Overtime</h3>
                <div className="text-sm text-slate-500">Revenue · Order</div>
              </div>
            </div>
            <div className="mt-4">
              <Sparkline series={salesSeries} />
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Latest Orders</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500">
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Order Date</th>
                    <th>Price</th>
                    <th>Payment</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {latestOrders.map((o, idx)=> (
                    <tr key={idx} className="py-2">
                      <td className="py-3 font-medium">{o.id}</td>
                      <td>{o.product}</td>
                      <td>{o.date}</td>
                      <td>{o.price}</td>
                      <td>{o.payment}</td>
                      <td><span className="text-sm text-slate-600">{o.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="font-semibold">Summary</h3>
            <p className="text-sm text-slate-500 mt-2">Quick stats and recent activity for demo purposes.</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-500">Conversion</div>
                <div className="font-semibold">4.2%</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-500">Avg. Shipping Time</div>
                <div className="font-semibold">2.3 days</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-500">Active Listings</div>
                <div className="font-semibold">124</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
