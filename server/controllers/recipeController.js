require('../models/database');
const category = require('../models/category');
const recipe = require('../models/recipe');

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await category.find({}).limit(limitNumber);
    const latest = await recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    const african = await recipe.find({ 'category': 'African'}).limit(limitNumber);
    const asian = await recipe.find({ 'category': 'Asian'}).limit(limitNumber);
    const middle_eastern = await recipe.find({ 'category': 'Middle Eastern'}).limit(limitNumber);
    const european = await recipe.find({ 'category': 'European'}).limit(limitNumber);
    const western = await recipe.find({ 'category': 'Western'}).limit(limitNumber);

    const food = { latest, african, asian, middle_eastern, european, western };

    res.render('index', { title: 'Cooking Blog - Home', categories, food });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error occured" });
  }
}

/**
 * GET /categories
 * Categories
 */
exports.exploreCategories = async (req, res) => {
  try {
    const limitNumber = 20;
    const categories = await category.find({}).limit(limitNumber);

    res.render('categories', { title: 'Cooking Blog - Categories', categories });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error occured" });
  }
}

/**
 * GET /recipe/:id
 * Recipe
 */
exports.exploreRecipe = async (req, res) => {
  try {
    let recipeId = req.params.id;
    const recipe = await recipe.findById(recipeId);
    res.render('recipe', { title: 'Cooking Blog - Recipes', recipe});
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error occured" });
  }
}
