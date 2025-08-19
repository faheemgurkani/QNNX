import User from '../models/User.js';
import Cart from '../models/Cart.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import twilio from 'twilio';
import nodemailer from 'nodemailer';
import passport from 'passport';

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    await Cart.create({ user: user._id, items: [], total: 0 });

    const token = user.getSignedJwtToken();

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = user.getSignedJwtToken();

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

    res.status(200).json({
      user,
      cart: {
        items: cart?.items || [],
        total: cart?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ success: true });
};

// Google Auth
export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

export const googleAuthCallback = passport.authenticate('google', {
  failureRedirect: '/login',
  session: false,
});

export const googleAuthCallbackHandler = async (req, res) => {
  try {
    const token = req.user.getSignedJwtToken();
    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}&userId=${req.user._id}`);
  } catch (error) {
    res.redirect(`${process.env.FRONTEND_URL}/auth/failure`);
  }
};

// Mobile OTP
export const sendMobileOTP = async (req, res) => {
  const { phone } = req.body;

  try {
    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({ phone, verificationCode: otp });
      await Cart.create({ user: user._id, items: [], total: 0 });
    } else {
      user.verificationCode = otp;
      await user.save();
    }

    await twilioClient.messages.create({
      body: `Your verification code is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    res.status(200).json({ success: true, phone });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyMobileOTP = async (req, res) => {
  const { phone, code } = req.body;

  try {
    if (!phone || !code) {
      return res.status(400).json({ message: 'Phone and code are required' });
    }

    const user = await User.findOne({ phone, verificationCode: code });
    if (!user) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    user.verificationCode = undefined;
    user.isVerified = true;
    await user.save();

    const token = user.getSignedJwtToken();

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name || `User-${user._id}`,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
