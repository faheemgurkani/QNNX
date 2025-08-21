import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../api/client'
import AuthLayout from '../../components/AuthLayout'
// social buttons removed per design

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    // require either email or phone
    if (!email && !phone) {
      setError('Please provide either an email or a phone number')
      return
    }
    try {
      const { data } = await api.post('/auth/register', { name, email, phone, password })
      localStorage.setItem('token', data.token);
      if (data.user && data.user._id) localStorage.setItem('providerId', data.user._id)
      localStorage.setItem('refreshToken', data.refreshToken)
      navigate('/dashboard')
    } catch (e) {
      setError(e.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <AuthLayout title="QNNEX – Get Started" subtitle="Create your seller account in minutes">
      <form onSubmit={onSubmit} className="grid gap-4">
        <input className="input" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input" placeholder="Email (or leave blank to use phone)" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" placeholder="Phone (or leave blank to use email)" value={phone} onChange={e=>setPhone(e.target.value)} />
        <input className="input" type="password" placeholder="Password (min 6 chars)" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="btn-primary w-full">Sign up</button>
      </form>

      <p className="text-center text-sm text-slate-400 my-4">You can sign up with either email or phone</p>

      <p className="text-center text-sm text-slate-500 mt-5">
        Already have a QNNEX account?{' '}
        <Link to="/login" className="text-brand-700 hover:underline">log in</Link>
      </p>
      <p className="text-xs text-slate-400 mt-2 text-center">By proceeding, you agree to the Terms and Conditions and Privacy Policy.</p>
    </AuthLayout>
  )
}
