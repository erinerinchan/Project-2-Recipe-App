const mongoose = require("mongoose");

// Schema for new recipes
const recipeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: "This field is required.",
  },
  name: {
    type: String,
    required: "This field is required.",
    index: true,
  },
  description: {
    type: String,
    required: "This field is required.",
    index: true,
  },
  instructions: {
    type: Array,
    required: "This field is required.",
  },
  ingredients: {
    type: Array,
    required: "This field is required.",
  },
  image: {
    type: String,
    required: "This field is required.",
  },
  categories: [
    {
      type: "ObjectId",
      ref: "category",
    },
  ],
});

module.exports = mongoose.model("recipe", recipeSchema);
