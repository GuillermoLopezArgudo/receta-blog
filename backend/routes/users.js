const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authenticateToken');

// Obtener información del usuario actual
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar perfil del usuario (incluye email y contraseña)
router.put('/me', authenticateToken, async (req, res) => {
  const { email, password, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (email) user.email = email;

    if (password && newPassword) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });

      user.password = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await user.save();
    res.json({ message: 'Profile updated', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar solo el correo electrónico
router.put('/me/email', authenticateToken, async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.email = email;
    await user.save();

    res.json({ message: 'Email updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/me/password', authenticateToken, async (req, res) => {
  const { password, newPassword } = req.body;

  try {
    // Verificar que ambas contraseñas están presentes
    if (!password || !newPassword) {
      return res.status(400).json({ message: 'Both current and new passwords are required' });
    }

    // Encontrar al usuario en la base de datos
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Comparar la contraseña actual proporcionada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });

    // Hashear la nueva contraseña y guardarla
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Registro
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User registered', user: savedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
