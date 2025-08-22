import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function isTokenValid(token){
  if (!token) return false
  try {
    const [, payload] = token.split('.')
    const data = JSON.parse(atob(payload))
    if (!data.exp) return false
    const now = Math.floor(Date.now() / 1000)
    return data.exp > now
  } catch {
    return false
  }
}

export default function SiteHeader(){
  const [authed, setAuthed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const ok = isTokenValid(token)
    if (!ok && token) {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('providerId')
    }
    setAuthed(ok)
  }, [location])

  useEffect(() => {
    const onStorage = () => {
      const token = localStorage.getItem('token')
      setAuthed(isTokenValid(token))
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('providerId')
    setAuthed(false)
    navigate('/')
  }

  return (
    <header className="w-full sticky top-0 z-40 backdrop-blur-sm bg-brand-900/70 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">Q</div>
          <span className="text-white/90 font-semibold tracking-wide">QNNEX</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-white/80">
          {authed ? (
            <>
              <Link to="/categories" className="hover:text-white">Categories</Link>
              <Link to="/catalog" className="hover:text-white">Catalog</Link>
              <Link to="/sales-overview" className="hover:text-white">Sales Overview</Link>
              <Link to="/orders" className="hover:text-white">Orders</Link>
              <button onClick={logout} className="px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20">Logout</button>
            </>
          ) : (
            <>
              <Link to="/support" className="hover:text-white">Support</Link>
              <Link to="/start-selling" className="hover:text-white">Become a seller</Link>
              <Link to="/login" className="px-4 py-2 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20">Log in</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
