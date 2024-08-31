// models/Recipe.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String],  // Asegúrate de que esto sea un array de strings
  instructions: String,
  author: String,
});

module.exports = mongoose.model('Recipe', recipeSchema);
