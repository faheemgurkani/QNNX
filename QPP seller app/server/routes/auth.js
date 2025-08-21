import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ----- helpers -----
function signToken(user) {
  return jwt.sign(
    { sub: user._id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
}

function signRefresh(user) {
  return jwt.sign(
    { sub: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

function isEmailStrict(str) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(str || "").toLowerCase());
}

function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.sub;
    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

// ----- routes -----

// Registration (keeps phone optional, but validates email when present)
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body || {};
    const safeName = (name || "Seller").toString().trim();

    if (!email && !phone) {
      return res.status(400).json({ message: "Email or phone is required" });
    }
    if (email && !isEmailStrict(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const query = email ? { email: email.toLowerCase() } : { phone };
    const exists = await User.findOne(query);
    if (exists) return res.status(409).json({ message: "Account already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: safeName,
      email: email ? email.toLowerCase() : undefined,
      phone,
      passwordHash,
      onboardingStep: "started",
      isContactVerified: true
    });

    const token = signToken(user);
    const refreshToken = signRefresh(user);
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        onboardingStep: user.onboardingStep
      },
      token,
      refreshToken
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login (EMAIL ONLY: block identifiers that are not valid emails)
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body || {};
    if (!identifier || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    if (!isEmailStrict(identifier)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const email = identifier.toLowerCase();
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash || "");
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user);
    const refreshToken = signRefresh(user);
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        onboardingStep: user.onboardingStep
      },
      token,
      refreshToken
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Refresh access token
router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body || {};
    if (!refreshToken) return res.status(400).json({ message: "Missing refresh token" });
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.sub);
    if (!user) return res.status(401).json({ message: "Invalid refresh token" });
    const token = signToken(user);
    res.json({ token });
  } catch (err) {
    console.error("Refresh error:", err);
    res.status(401).json({ message: "Invalid refresh token" });
  }
});

// Current user
router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("_id name email phone onboardingStep");
    res.json({ user });
  } catch (err) {
    console.error("Me error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post('/register-local', async (req,res) => {
  const { firstName, lastName, email, phone, password } = req.body || {}
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email && !phone) return res.status(400).json({ message: 'Email or phone is required' })
  if (email && !emailRegex.test(email)) return res.status(400).json({ message: 'Invalid email format' })
  if (!password || password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' })

  const query = email ? { email: email.toLowerCase() } : { phone }
  const exists = await User.findOne(query)
  if (exists) return res.status(409).json({ message: 'Account already exists' })

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({
    firstName, lastName,
    name: `${firstName || ''} ${lastName || ''}`.trim(),  // if you keep a name field
    email: email ? email.toLowerCase() : undefined,
    phone,
    passwordHash,
    sellerType: 'LOCAL_SELLER',
    onboardingStep: 'completed'
  })

  const token = signToken(user)
  const refreshToken = signRefresh(user)
  res.json({
    user: { _id: user._id, name: user.name || `${user.firstName} ${user.lastName}`.trim(), email: user.email, phone: user.phone, sellerType: user.sellerType },
    token, refreshToken
  })
})


export default router;
