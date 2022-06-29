require('../models/database');
const fs = require('fs')
const Category = require('../models/category');
const Recipe = require('../models/recipe');

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5;

    // Categories
    const categories = await Category.find({}).limit(limitNumber);

    // Recipes
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);

    // Category Recipes | { name: '', image: '', recipes: [] }
    const african = await Category.findOne({ name: 'African' }).populate({ path: 'recipes', options: { limit: 5 } });
    const asian = await Category.findOne({ name: 'Asian' }).populate({ path: 'recipes', options: { limit: 5 } });
    const australian_and_new_zealander = await Category.findOne({ name: 'Australian and New Zealander'}).populate({ path: 'recipes', options: { limit: 5 } });
    const european = await Category.findOne({ name: 'European' }).populate({ path: 'recipes', options: { limit: 5 } });
    const middle_eastern = await Category.findOne({ name: 'Middle Eastern'}).populate({ path: 'recipes', options: { limit: 5 } });
    const north_american = await Category.findOne({ name: 'North American' }).populate({ path: 'recipes', options: { limit: 5 } });
    const south_american = await Category.findOne({ name: 'South American' }).populate({ path: 'recipes', options: { limit: 5 } });

    const recipes = {
      latest,
      african: african?.recipes || [],
      asian: asian?.recipes || [],
      australian_and_new_zealander: australian_and_new_zealander?.recipes || [],
      european: european?.recipes || [],
      middle_eastern: middle_eastern?.recipes || [],
      north_american: north_american?.recipes || [],
      south_american: south_american?.recipes || []
    };

    res.render('index', { title: 'Cooking Blog - Home', categories, recipes });
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message || "Error occured" });
  }
}

/**
 * GET /categories
 * Categories
 */
exports.exploreCategories = async (req, res) => {
  try {
    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);

    res.render('categories', { title: 'Cooking Blog - Categories', categories });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occured" });
  }
}

/**
 * GET /categories/:id
 * Categories By Id
 */
exports.exploreCategoriesById = async (req, res) => {
  try {
    let categoryName = req.params.categoryName;
    const limitNumber = 20;
    const category = await Category.findOne({ name: categoryName });
    const categoryById = await Recipe.find({ categories: { $in: [category._id] } }).populate('categories').limit(limitNumber);
    res.render('categories', { title: 'Cooking Blog - Categories', categoryById });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occured" });
  }
}

/**
 * GET /recipe/:id
 * Recipe
 */
exports.exploreRecipe = async (req, res) => {
  try {
    let recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    res.render('recipe', { title: 'Cooking Blog - Recipes', recipe});
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occured" });
  }
}

/**
 * POST /search
 * Search
 */
exports.searchRecipe = async (req, res) => {
  try {
    let searchTerm = req.query.searchTerm;
    let recipes = await Recipe.find({
      $text: {
        $search: searchTerm,
        $diacriticSensitive: true
      }
    });
    res.render('search', { title: 'Cooking Blog - Search', recipes });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occured" });
  }
}

/**
 * GET /explore-latest
 * Explore Latest
 */
exports.exploreLatest = async (req, res) => {
  try {
    const limitNumber = 20;
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render('explore-latest', { title: 'Cooking Blog - Explore latest', recipe});
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occured" });
  }
}

/**
 * GET /explore-random
 * Explore Random as JSON
 */
exports.exploreRandom = async (req, res) => {
  try {
    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).exec();
    res.render('explore-random', { title: 'Cooking Blog - Explore latest', recipe});
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occured" });
  }
}

/**
 * GET /submit-recipe
 * Submit Recipes
 */
exports.submitRecipe = async (req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipes', infoErrorsObj, infoSubmitObj});
}

/**
 * POST /submit-recipe
 * Submit Recipes
 */
exports.submitRecipeOnPost = async (req, res) => {
  try {
    let imageUploadFile;
    let uploadPath;

    if(!req.files || Object.keys(req.files).length === 0) {
      console.log('No files were uploaded.');
    } else {
      imageUploadFile = req.files.image;
      uploadPath = require('path').resolve('./') + '/public/uploads/' + imageUploadFile.newFilename;

      fs.rename(imageUploadFile.filepath, uploadPath, (err) => {
        if(err) return res.status(500).send(err);
      })
    }

    const category = await Category.findOne({
      name: req.body.category
    })

    const newRecipe = await Recipe.create({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      instructions: req.body.instructions,
      ingredients: req.body.ingredients,
      categories: [category._id],
      image: `/uploads/${imageUploadFile.newFilename}`
    });

    await category.updateOne({
      $push: {
        recipes: [newRecipe._id]
      }
    })

    req.flash('infoSubmit', 'Recipe has been added.');
    res.redirect('/submit-recipe');
  } catch (error) {
    console.log(error)
    req.flash('infoErrors', error);
    res.redirect('/submit-recipe');
  }
}

// async function deleteRecipe() {
//   try {
//     await Recipe.deleteOne({ name: 'asdf' });
//   } catch (error) {
//     console.log(error);
//   }
// }
// deleteRecipe();

// async function updateRecipe() {
//   try {
//     const res = await Recipe.updateOne({ name: 'old recipe' }, { name: 'new recipe' });
//     res.n; // Number of documents matched
//     res.nModified; // Number of documents modified
//   } catch (error) {
//     console.log(error);
//   }
// }
// updateRecipe();


/**
 * GET /about
 * About
 */
exports.about = async (req, res) => {
  res.render('about', { title: 'About'} );
}

/**
 * GET /contact
 * Contact
 */
exports.contact = async (req, res) => {
  res.render('contact', { title: 'Contact'} );
}
