const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Optional authentication middleware.
 *
 * Unlike the strict `auth` middleware, this never rejects a request.
 * - If a valid Bearer token is present  → populates req.user and calls next()
 * - If no token, or the token is bad    → sets req.user = null and calls next()
 *
 * Use this on routes that are public by default but need to know who the
 * caller is (e.g. to allow owners to view their own private content).
 */
const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    req.user = null;
    return next();
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
  } catch {
    // Token expired or tampered — treat as unauthenticated, don't block
    req.user = null;
  }

  next();
};

module.exports = optionalAuth;
