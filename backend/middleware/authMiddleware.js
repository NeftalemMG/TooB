import jwt from 'jsonwebtoken';
import { redis } from '../lib/redis.js';
import User from '../models/userModel.js';  


export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// };

export const adminRoute = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin only.' });
  }
};

// If you're using protectRoute as well, make sure it's defined and exported:
export const protectRoute = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ message: 'Authentication required' });
  }
};