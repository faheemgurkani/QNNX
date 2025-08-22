import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // existing fields:
  email: { type: String, index: true, sparse: true, lowercase: true },
  phone: { type: String, index: true, sparse: true },
  passwordHash: String,

  // new:
  firstName: String,
  lastName: String,
  sellerType: { type: String, enum: ['LOCAL_SELLER', 'BUSINESS', null], default: null },

  onboardingStep: { type: String, default: 'started' }, // you already had this
}, { timestamps: true });

export default mongoose.model('User', UserSchema);

