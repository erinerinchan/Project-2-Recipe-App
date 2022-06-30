const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

// App routes

// Homepage
router.get("/", recipeController.homepage);

// Individual recipe page
router.get("/recipe/:id", recipeController.exploreRecipe);

// Explore categories page
router.get("/categories", recipeController.exploreCategories);

// Explore categories by Id
router.get("/categories/:categoryName", recipeController.exploreCategoriesById);

// Search page
router.get("/search", recipeController.searchRecipe);

// Latest recipes page
router.get("/explore-latest", recipeController.exploreLatest);

// Generating random recipes page
router.get("/explore-random", recipeController.exploreRandom);

// Submit recipe page
router.get("/submit-recipe", recipeController.submitRecipe);
router.post("/submit-recipe", recipeController.submitRecipeOnPost);

// About page
router.get("/about", recipeController.about);

// Contact page
router.get("/contact", recipeController.contact);
router.post("/contact", recipeController.contactOnPost);

module.exports = router;
