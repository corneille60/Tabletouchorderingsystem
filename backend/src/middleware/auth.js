import db from '../db.js';

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const token = authHeader.substring(7);
  try {
    const [rows] = await db.query('SELECT id, username, role FROM users WHERE session_token = ?', [token]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid or expired session' });
    }
    req.user = rows[0];
    next();
  } catch (error) {
    console.error('Auth middleware error', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

export const requireRole = (roles) => {
  const roleList = Array.isArray(roles) ? roles : [roles];
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    if (!roleList.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied for this role' });
    }
    next();
  };
};