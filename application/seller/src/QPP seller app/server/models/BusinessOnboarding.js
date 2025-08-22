import mongoose from 'mongoose';

const BusinessOnboardingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },

  // business details
  businessName: { type: String, required: true },
  businessType: { type: String, enum: ['SOLE_PROPRIETOR', 'PARTNERSHIP', 'PRIVATE_LIMITED'], required: true },
  registrationNo: String,
  taxId: String,
  address: String,
  city: String,
  country: String,

  // owner/contact
  firstName: String,
  lastName: String,
  email: String,
  phone: String,

  // profile
  website: String,
  yearsInBusiness: String,
  avgMonthlySalesPKR: String,

  status: { type: String, enum: ['submitted', 'approved', 'rejected'], default: 'submitted' },
}, { timestamps: true });

export default mongoose.model('BusinessOnboarding', BusinessOnboardingSchema);
