const mongoose = require("mongoose");

// Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected");
}).catch((err) => {
  console.log("Connection Error: ", err)
})

//Models
const Category = mongoose.model("category", require('./category'));
const Recipe = mongoose.model("recipe", require('./recipe'));
const User = mongoose.model("User", require('./User'));

module.exports = {
  Category,
  Recipe,
  User
}
