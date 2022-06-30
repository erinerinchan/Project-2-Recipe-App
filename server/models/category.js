const mongoose = require("mongoose");

// Schema for categories of recipes
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: "This field is required.",
    index: true,
  },
  image: {
    type: String,
    required: "This field is required.",
  },
  recipes: [
    {
      type: "ObjectId",
      ref: "recipe",
    },
  ],
});

module.exports = categorySchema
