// routes/auth.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// POST /api/auth/register
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be >= 6 chars')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
      // check if exists
      const [rows] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
      if (rows.length) return res.status(400).json({ msg: 'Email already registered' });

      // hash password
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);

      // insert user
      const [result] = await db.query(
        'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
        [name, email, password_hash]
      );

      const userId = result.insertId;

      // create token
      const token = jwt.sign(
        { id: userId, email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      return res.status(201).json({
        token,
        user: { id: userId, name, email }
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('password').notEmpty().withMessage('Password required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      const [rows] = await db.query('SELECT id, name, email, password_hash FROM users WHERE email = ?', [email]);
      if (!rows.length) return res.status(400).json({ msg: 'Invalid credentials' });

      const user = rows[0];
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      return res.json({
        token,
        user: { id: user.id, name: user.name, email: user.email }
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

module.exports = router;
