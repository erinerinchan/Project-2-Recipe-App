const nodemailer = require("nodemailer");

const { Category, Recipe } = require("../models/database");
const uploadFileAsync = require('../_helpers/upload-file')

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
  try {
    // Limit the number of cards for 'categories of recipes' and 'latest recipes' to 5
    const limitNumber = 5;

    // Finding categories of recipes
    const categories = await Category.find({}).limit(limitNumber);

    // Finding latest recipes
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);

    //Selecting only that category, populating that category with 5 recipes belonging to that category at most
    const african = await Category.findOne({ name: "African" }).populate({
      path: "recipes",
      options: { limit: 5 },
    });
    const asian = await Category.findOne({ name: "Asian" }).populate({
      path: "recipes",
      options: { limit: 5 },
    });
    const australian_and_new_zealander = await Category.findOne({
      name: "Australian and New Zealander",
    }).populate({ path: "recipes", options: { limit: 5 } });
    const european = await Category.findOne({ name: "European" }).populate({
      path: "recipes",
      options: { limit: 5 },
    });
    const middle_eastern = await Category.findOne({
      name: "Middle Eastern",
    }).populate({ path: "recipes", options: { limit: 5 } });
    const north_american = await Category.findOne({
      name: "North American",
    }).populate({ path: "recipes", options: { limit: 5 } });
    const south_american = await Category.findOne({
      name: "South American",
    }).populate({ path: "recipes", options: { limit: 5 } });

    // Showing latest recipes and recipes sorted by categories
    const recipes = {
      latest,
      african: african?.recipes || [],
      asian: asian?.recipes || [],
      australian_and_new_zealander: australian_and_new_zealander?.recipes || [],
      european: european?.recipes || [],
      middle_eastern: middle_eastern?.recipes || [],
      north_american: north_american?.recipes || [],
      south_american: south_american?.recipes || [],
    };

    res.render("index", { title: "Cooking Blog - Home", categories, recipes });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message || "Error occured" });
  }
};

/**
 * GET /categories
 * 'Explore categories' page
 */
exports.exploreCategories = async (req, res) => {
  try {
    // Limiting the number of cards for recipes on each category to 20
    const limitNumber = 20;

    // Finding categories of recipes
    const categories = await Category.find({}).limit(limitNumber);

    res.render("categories", {
      title: "Cooking Blog - Categories",
      categories,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occured" });
  }
};

/**
 * GET /categories/:id
 * Sorting 'Explore categories' page by Id
 */
exports.exploreCategoriesById = async (req, res) => {
  try {
    // Accessing each category name
    let categoryName = req.params.categoryName;

    // Limiting the number of cards for recipes on each category to 20
    const limitNumber = 20;

    // Selecting only the category name
    const category = await Category.findOne({ name: categoryName });

    // Finding recipes that match a specific Id and populating the Id with the recipes
    const categoryById = await Recipe.find({
      categories: { $in: [category._id] },
    })
      .populate("categories")
      .limit(limitNumber);

    res.render("categories", {
      title: "Cooking Blog - Categories",
      categoryById,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occured" });
  }
};

/**
 * GET /recipe/:id
 * Individual recipe page
 */
exports.exploreRecipe = async (req, res) => {
  try {
    // Accessing each recipe via Id
    let recipeId = req.params.id;

    // Finding a specific recipe by Id
    const recipe = await Recipe.findById(recipeId);

    res.render("recipe", { title: "Cooking Blog - Recipes", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occured" });
  }
};

/**
 * POST /search
 * Search page
 */
exports.searchRecipe = async (req, res) => {
  try {
    // Obtaining the user's search input
    let searchTerm = req.query.searchTerm;

    // Finding recipe results that match the user's search input and distinguishing similar recipe results
    let recipes = await Recipe.find({
      $text: {
        $search: searchTerm,
        $diacriticSensitive: true,
      },
    });

    res.render("search", { title: "Cooking Blog - Search", recipes });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occured" });
  }
};

/**
 * GET /explore-latest
 * 'Explore Latest' page
 */
exports.exploreLatest = async (req, res) => {
  try {
    // Limiting the number of cards for latest recipes to 20
    const limitNumber = 20;

    // Finding 20 latest recipes at most sorted by Id(descending)
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);

    res.render("explore-latest", {
      title: "Cooking Blog - Explore latest",
      recipe,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occured" });
  }
};

/**
 * GET /explore-random
 * 'Explore random recipes' page
 */
exports.exploreRandom = async (req, res) => {
  try {
    // Finding the count of recipes in the database
    let count = await Recipe.find().countDocuments();

    // Generating random count of recipes
    let random = Math.floor(Math.random() * count);

    // Finding one amongst all random recipes
    let recipe = await Recipe.findOne().skip(random).exec();

    res.render("explore-random", {
      title: "Cooking Blog - Explore latest",
      recipe,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occured" });
  }
};

/**
 * GET /submit-recipe
 * 'Submit recipes' page
 */
exports.submitRecipe = async (req, res) => {
  // Generating 'error' message for submit failure
  const infoErrorsObj = req.flash("infoErrors");

  // Generating 'submit' message for submit success
  const infoSubmitObj = req.flash("infoSubmit");

  res.render("submit-recipe", {
    title: "Cooking Blog - Submit Recipes",
    infoErrorsObj,
    infoSubmitObj,
  });
};

/**
 * POST /submit-recipe
 * 'Submit recipes' page
 */
exports.submitRecipeOnPost = async (req, res) => {
  try {
    // Find Category
    const category = await Category.findOne({
      name: req.body.category,
    });

    // Recipe to save
    const recipeToSave = {
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      instructions: req.body.instructions,
      ingredients: req.body.ingredients,
      categories: [category._id],
      image: req.body.image
    }

    // Upload File First
    await uploadFileAsync(recipeToSave, req)

    // Create the actual recipe with data
    const newRecipe = await Recipe.create(recipeToSave);

    // Update category's recipe relationship
    await category.updateOne({
      $push: {
        recipes: [newRecipe._id],
      },
    });

    // Showing the 'Recipe has been added' message following submit success
    req.flash("infoSubmit", "Recipe has been added.");

    // Redirecting user to an empty submit page following submit success
    res.redirect("/submit-recipe");
  } catch (error) {
    // Showing the error message following submit failure
    console.log(error);
    // req.flash("infoErrors", error);

    // Redirecting user to an empty submit page following submit success
    // res.redirect("/submit-recipe");
  }
};

/* Delete recipes */
// async function deleteRecipe() {
//   try {
//     await Recipe.deleteOne({ name: '' });
//   } catch (error) {
//     console.log(error);
//   }
// }
// deleteRecipe();

/* Update recipes */
// async function updateRecipe() {
//   try {
//     const res = await Recipe.updateOne({ name: '' }, { name: '' });
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
  res.render("about", { title: "About" });
};

/**
 * GET /contact
 * Contact page
 */
exports.contact = async (req, res) => {
  res.render("contact", { qs: req.query });
};

/**
 * POST /contact
 * Contact page
 */
exports.contactOnPost = async (req, res) => {
  console.log(req.body);

  // Setting up Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "process.env.NODEMAILER_USER",
      pass: "process.env.NODEMAILER_PASS",
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: "process.env.NODEMAILER_USER",
    subject: `Message from ${req.body.email}: ${req.body.name}`,
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });

  res.render("contact-success", { data: req.body });
};
