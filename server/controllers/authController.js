
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json('User not found');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json('Incorrect password');
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json('Error: ' + err);
  }
};

const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  const validRoles = ['Taquilla', 'Organizador', 'Participante'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  if (!username || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new User({ username, email, password, role });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const verifyAndRenewToken = (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        const newToken = jwt.sign({ id: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        return res.json({ token: newToken }); // Devolver el nuevo token
      }
      return res.sendStatus(403);
    }
    const newToken = jwt.sign({ id: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    res.json({ token: newToken });
  });
};


module.exports = {
  login,
  register,
  verifyAndRenewToken,
};
