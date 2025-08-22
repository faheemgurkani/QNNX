import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/client'
import AuthLayout from '../../components/AuthLayout'

export default function RegisterBusiness(){
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    // business
    businessName: '', businessType: 'SOLE_PROPRIETOR', registrationNo: '', taxId: '',
    address: '', city: '', country: 'Pakistan',
    // owner
    firstName: '', lastName: '', email: '', phone: '',
    // verification
    website: '', yearsInBusiness: '', avgMonthlySalesPKR: ''
  })
  const set = (k,v) => setForm(prev => ({...prev, [k]: v}))
  const navigate = useNavigate()

  const next = () => setStep(s => Math.min(3, s+1))
  const back = () => setStep(s => Math.max(1, s-1))

  const submit = async ()=>{
    try {
      setError('')
      const { data } = await api.post('/onboarding/business', form)
      // optional: auto-login if backend returns token
      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('refreshToken', data.refreshToken)
        if (data.user && data.user._id) localStorage.setItem('providerId', data.user._id)
        if (data.user && data.user.name) localStorage.setItem('name', data.user.name)
        navigate('/dashboard')
      } else {
        // or route to a "submitted" page
        navigate('/dashboard')
      }
    } catch(e){
      setError(e.response?.data?.message || 'Submission failed')
    }
  }

  return (
    <AuthLayout title="Register Ongoing Business" subtitle="Complete a short onboarding to sell as a business">
      <div className="card p-6 grid gap-4">
        {step === 1 && (
          <>
            <h3 className="font-semibold text-white">Step 1 — Business details</h3>
            <input className="input" placeholder="Business name" value={form.businessName} onChange={e=>set('businessName', e.target.value)} required />
            <select className="input" value={form.businessType} onChange={e=>set('businessType', e.target.value)}>
              <option value="SOLE_PROPRIETOR">Sole proprietor</option>
              <option value="PARTNERSHIP">Partnership</option>
              <option value="PRIVATE_LIMITED">Private limited</option>
            </select>
            <input className="input" placeholder="Registration / Incorporation No." value={form.registrationNo} onChange={e=>set('registrationNo', e.target.value)} />
            <input className="input" placeholder="Tax ID (NTN)" value={form.taxId} onChange={e=>set('taxId', e.target.value)} />
            <input className="input" placeholder="Business address" value={form.address} onChange={e=>set('address', e.target.value)} />
            <div className="grid md:grid-cols-2 gap-4">
              <input className="input" placeholder="City" value={form.city} onChange={e=>set('city', e.target.value)} />
              <input className="input" placeholder="Country" value={form.country} onChange={e=>set('country', e.target.value)} />
            </div>
            <div className="flex gap-2">
              <button className="btn btn-primary" onClick={next}>Next</button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h3 className="font-semibold text-white">Step 2 — Owner / contact</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input className="input" placeholder="First name" value={form.firstName} onChange={e=>set('firstName', e.target.value)} />
              <input className="input" placeholder="Last name" value={form.lastName} onChange={e=>set('lastName', e.target.value)} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input className="input" placeholder="Email" value={form.email} onChange={e=>set('email', e.target.value)} />
              <input className="input" placeholder="Phone" value={form.phone} onChange={e=>set('phone', e.target.value)} />
            </div>
            <div className="flex gap-2">
              <button className="btn" onClick={back}>Back</button>
              <button className="btn btn-primary" onClick={next}>Next</button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h3 className="font-semibold text-white">Step 3 — Business profile</h3>
            <input className="input" placeholder="Website (optional)" value={form.website} onChange={e=>set('website', e.target.value)} />
            <div className="grid md:grid-cols-2 gap-4">
              <input className="input" placeholder="Years in business" value={form.yearsInBusiness} onChange={e=>set('yearsInBusiness', e.target.value)} />
              <input className="input" placeholder="Avg monthly sales (PKR)" value={form.avgMonthlySalesPKR} onChange={e=>set('avgMonthlySalesPKR', e.target.value)} />
            </div>
            {error && <div className="text-red-300">{error}</div>}
            <div className="flex gap-2">
              <button className="btn" onClick={back}>Back</button>
              <button className="btn btn-primary" onClick={submit}>Submit</button>
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  )
}
