const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const authenticateToken = require('../middleware/authenticateToken');

// Obtener todas las recetas
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener una receta por ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear una receta
router.post('/', authenticateToken, async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  const newRecipe = new Recipe({
    title,
    ingredients,
    instructions,
    author: req.user.email
  });

  try {
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar una receta
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar una receta
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recipe deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
