import express from 'express'
import BusinessOnboarding from '../models/BusinessOnboarding.js'
import User from '../models/User.js'

const router = express.Router()

router.post('/business', async (req, res) => {
  const payload = req.body || {}
  if (!payload.businessName || !payload.businessType) {
    return res.status(400).json({ message: 'Missing business details' })
  }

  // If user exists (email/phone), link; otherwise create a shell account
  let user = null
  if (payload.email) {
    user = await User.findOne({ email: payload.email.toLowerCase() })
  }
  if (!user && payload.phone) {
    user = await User.findOne({ phone: payload.phone })
  }
  if (!user) {
    user = await User.create({
      firstName: payload.firstName, lastName: payload.lastName,
      name: `${payload.firstName || ''} ${payload.lastName || ''}`.trim(),
      email: payload.email ? payload.email.toLowerCase() : undefined,
      phone: payload.phone,
      sellerType: 'BUSINESS',
      onboardingStep: 'business_submitted'
    })
  } else {
    user.sellerType = 'BUSINESS'
    user.onboardingStep = 'business_submitted'
    await user.save()
  }

  const record = await BusinessOnboarding.create({
    userId: user._id,
    businessName: payload.businessName,
    businessType: payload.businessType,
    registrationNo: payload.registrationNo,
    taxId: payload.taxId,
    address: payload.address, city: payload.city, country: payload.country,
    firstName: payload.firstName, lastName: payload.lastName,
    email: payload.email, phone: payload.phone,
    website: payload.website, yearsInBusiness: payload.yearsInBusiness, avgMonthlySalesPKR: payload.avgMonthlySalesPKR,
    status: 'submitted'
  })

  res.json({ onboardingId: record._id, userId: user._id })
})

export default router
