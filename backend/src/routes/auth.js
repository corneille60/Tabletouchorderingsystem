import express from 'express';
import db from '../db.js';
import { randomBytes } from 'crypto';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' });
  }

  try {
    const [rows] = await db.query('SELECT id, username, role FROM users WHERE username = ? AND password = ?', [username, password]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = rows[0];
    const sessionToken = randomBytes(32).toString('hex');
    await db.execute('UPDATE users SET session_token = ? WHERE id = ?', [sessionToken, user.id]);
    res.json({ id: user.id, username: user.username, role: user.role, token: sessionToken });
  } catch (error) {
    console.error('Login failed', error);
    res.status(500).json({ error: 'Unable to login' });
  }
});

router.post('/logout', async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'User ID required' });
  }
  try {
    await db.execute('UPDATE users SET session_token = NULL WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Logout failed', error);
    res.status(500).json({ error: 'Unable to logout' });
  }
});

export default router;
