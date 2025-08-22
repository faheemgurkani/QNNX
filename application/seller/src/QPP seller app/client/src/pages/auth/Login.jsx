import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../api/client'
import AuthLayout from '../../components/AuthLayout'

export default function Login(){
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await api.post('/auth/login', { identifier, password })
      localStorage.setItem('token', data.token);
      if (data.user && data.user._id) localStorage.setItem('providerId', data.user._id)
      localStorage.setItem('refreshToken', data.refreshToken)
      navigate('/dashboard')
    } catch (e) {
      setError(e.response?.data?.message || 'Login failed')
    }
  }

  return (
    <AuthLayout title="QNNEX – Log in" subtitle="Continue to QNNEX">
      <form onSubmit={onSubmit} className="grid gap-4">
        <input className="input" placeholder="Email or phone" value={identifier} onChange={e=>setIdentifier(e.target.value)} />
        <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="btn-primary w-full">Login</button>
      </form>

      <p className="text-center text-sm text-slate-400 my-4">You can log in with either your email or phone number</p>

      <p className="text-center text-sm text-slate-500 mt-5">
        New to QNNEX?{' '}
        <Link to="/register" className="text-brand-700 hover:underline">Get Started</Link>
      </p>
    </AuthLayout>
  )
}
