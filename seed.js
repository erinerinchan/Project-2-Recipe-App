require("dotenv").config();

const axios = require("axios");
const jsdom = require("jsdom");
const dom = new jsdom.JSDOM("");
const $ = require("jquery")(dom.window);

require("./server/models/database");
const Category = require("./server/models/category");
const Recipe = require("./server/models/recipe");

// Categories of recipes
const categories = [
  "African",
  "Asian",
  "Australian and New Zealander",
  "European",
  "Middle Eastern",
  "North American",
  "South American",
];

// Images for categories of recipes
const categoryImages = {
  African: "/img/african-cuisine.jpeg",
  Asian: "/img/asian-cuisine.jpeg",
  "Australian and New Zealander":
    "/img/australian-and-new-zealander-cuisine.jpeg",
  European: "/img/european-cuisine.jpeg",
  "Middle Eastern": "/img/middle-eastern-cuisine.jpeg",
  "North American": "/img/north-american-cuisine.jpeg",
  "South American": "/img/south-american-cuisine.jpeg",
};

// Data of recipes sorted by categories
const categoryLinks = {
  African: "https://www.allrecipes.com/recipes/226/world-cuisine/african/",
  Asian: "https://www.allrecipes.com/recipes/227/world-cuisine/asian/",
  "Australian and New Zealander":
    "https://www.allrecipes.com/recipes/228/world-cuisine/australian-and-new-zealander/",
  European: "https://www.allrecipes.com/recipes/231/world-cuisine/european/",
  "Middle Eastern":
    "https://www.allrecipes.com/recipes/235/world-cuisine/middle-eastern/",
  "North American": "https://www.allrecipes.com/recipes/236/us-recipes/",
  "South American":
    "https://www.allrecipes.com/recipes/237/world-cuisine/latin-american/",
};

const recipes = {
  African: [],
  Asian: [],
  "Australian and New Zealander": [],
  European: [],
  "Middle Eastern": [],
  "North American": [],
  "South American": [],
};

// Initializing categories
const initCategories = async () => {
  console.log(">>>>> Init Categories Start");

  const promisesA = [];
  const promisesB = [];

  categories.forEach((category) => {
    const promiseA = Category.findOne({ name: category }).then((result) => {
      if (result) {
        console.log(`Category ${category} Already Exist`);
      } else {
        const promiseB = Category.create({
          name: category,
          image: categoryImages[category],
        }).then(() => {
          console.log(`Category ${category} Created`);
        });
        promisesB.push(promiseB);
      }
    });
    promisesA.push(promiseA);
  });

  await Promise.all(promisesA);
  await Promise.all(promisesB);

  console.log("<<<<< Init Categories Completed");
};

// Obtaining data of recipes sorted by categories
const getRecipeLinks = async () => {
  console.log(">>>>> Getting Recipe Links For Category");
  const promises = [];

  categories.forEach((category) => {
    const request = axios({
      method: "GET",
      url: categoryLinks[category],
    }).then((resp) => {
      console.log(`>>> Starting ${category}`);
      const recipeLinks = $(resp.data).find(
        ".card .card__imageContainer .card__titleLink"
      );
      recipeLinks.each((i, link) => {
        recipes[category].push($(link).attr("href"));
      });
      console.log(`<<< Completed ${category}`);
    });

    promises.push(request);
  });

  await Promise.all(promises);
  console.log("<<<<< Completed Recipe Links For Category");
};

// Creating recipes
const createRecipes = async () => {
  console.log(">>>>> Creating Recipes");
  // Loop categories
  categories.forEach((category) => {
    // For every category find the appropriate category document
    Category.findOne({ name: category })
      .then((categoryResult) => {
        const categoryId = categoryResult._id;

        // Loop the recipes for the selected category
        recipes[category].forEach((link) => {
          // For every recipe link, grab data from rapid api
          axios({
            method: "POST",
            url: "https://mycookbook-io1.p.rapidapi.com/recipes/rapidapi",
            headers: {
              "content-type": "text/plain",
              "X-RapidAPI-Key":
                "process.env.API_KEY",
              "X-RapidAPI-Host": "mycookbook-io1.p.rapidapi.com",
            },
            data: link,
          })
            .then((resp) => {
              const rawData = resp.data[0];

              const dataToSave = {
                email: "admin@recipe.com",
                name: rawData.name,
                description: rawData.description,
                instructions: rawData.instructions[0].steps,
                ingredients: rawData.ingredients,
                image: rawData.images[0],
                categories: [categoryId],
              };

              Recipe.findOne({ name: rawData.name })
                .then((result) => {
                  if (result) {
                    console.log(`>>> SKIPPED ${category} ${rawData.name}`);
                  } else {
                    Recipe.create(dataToSave)
                      .then((recipeResult) => {
                        console.log(`>>> CREATED ${category} ${rawData.name}`);
                        const recipeId = recipeResult._id;

                        categoryResult
                          .updateOne({
                            $push: {
                              recipes: [recipeId],
                            },
                          })
                          .then((updateResult) => {
                            console.log(updateResult);
                          })
                          .catch((err) => {
                            console.log("Category Update Error", err);
                          });
                      })
                      .catch((err) => {
                        console.log("Recipe Creation Error", err);
                      });
                  }
                })
                .catch((err) => {
                  console.log("Recipe Search Error", err);
                });
            })
            .catch((err) => {
              console.log("Rapid API Error", err);
            });
        });
      })
      .catch((err) => {
        console.log("Category Result Error", err);
      });
  });
};

const start = async () => {
  await initCategories();
  await getRecipeLinks();
  await createRecipes();
};

start();
