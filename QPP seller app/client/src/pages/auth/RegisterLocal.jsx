import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/client'
import AuthLayout from '../../components/AuthLayout'

export default function RegisterLocal(){
  const [firstName, setFirst] = useState('')
  const [lastName, setLast] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e)=>{
    e.preventDefault()
    setError('')
    try {
      const { data } = await api.post('/auth/register-local', {
        firstName, lastName, email, phone, password
      })
      // auto-login like your login page does
      localStorage.setItem('token', data.token)
      if (data.user && data.user._id) localStorage.setItem('providerId', data.user._id)
      if (data.user && data.user.name) localStorage.setItem('name', data.user.name)
      localStorage.setItem('refreshToken', data.refreshToken)
      navigate('/dashboard')
    } catch (e) {
      setError(e.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <AuthLayout title="Local Seller – Create account" subtitle="Set up your personal seller account">
      <form onSubmit={submit} className="grid gap-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input className="input" placeholder="First name" value={firstName} onChange={e=>setFirst(e.target.value)} required />
          <input className="input" placeholder="Last name" value={lastName} onChange={e=>setLast(e.target.value)} required />
        </div>
        <input className="input" placeholder="Email (or leave blank if using phone)" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" placeholder="Phone (or leave blank if using email)" value={phone} onChange={e=>setPhone(e.target.value)} />
        <input className="input" type="password" placeholder="Password (min 6 chars)" value={password} onChange={e=>setPassword(e.target.value)} required />
        {error && <div className="text-red-300">{error}</div>}
        <button className="btn btn-primary">Create account</button>
      </form>
    </AuthLayout>
  )
}
