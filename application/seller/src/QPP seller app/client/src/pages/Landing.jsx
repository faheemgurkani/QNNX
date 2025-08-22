import Hero from '../components/Hero'
import StepsIncentives from '../components/StepsIncentives'
import Testimonials from '../components/Testimonials'
import { Link } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

const steps = [
  { title: "Create your account", desc: "Use phone or email to get started in minutes." },
  { title: "Add your business", desc: "Enter store details and add your first products." },
  { title: "Start selling", desc: "Go live and receive orders from buyers across Pakistan." }
]

const stories = [
  { name: "Ayesha — Karachi", text: "I moved my boutique online and got my first 50 orders in a week." },
  { name: "Bilal — Lahore", text: "QNNEX made catalog and orders super simple. Sales up 30%." },
  { name: "Sadaf — Islamabad", text: "Shipping + payments worked out of the box. Loved the experience." }
]

export default function Landing(){
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-brand-900 via-brand-800 to-brand-700"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_10%,rgba(255,255,255,0.07),transparent_60%)]" />
      <SiteHeader />
      <Hero />
     <StepsIncentives />
     <Testimonials />
     <SiteFooter />
     </div>
  )
}
